import {Event} from '@/core/api/Event.js'
import {EventConstants} from '@/core/api/EventConstants.js'
import {IEvent} from '@/core/api/IEvent.js'
import {IEventBus} from '@/core/api/IEventBus.js'
import {ConnectableObservable, firstValueFrom, Observable, Subject, Subscription, throwError, Unsubscribable} from 'rxjs'
import {filter, multicast} from 'rxjs/operators'
import {v4 as uuidv4} from 'uuid'

export class EventBusOrchestrator {

    private requestRepliesObservable: ConnectableObservable<IEvent> | null = null
    private requestRepliesSubject: Subject<IEvent> | null = null
    private requestRepliesSubscription: Subscription | null = null

    constructor(private eventBus: IEventBus) {
    }

    /**
     * Sends an {@link IEvent} expecting a response
     * All response correlation will be handled internally
     * @param event to send as the request
     * @return a Promise that will resolve when the response is received
     */
    public request(event: IEvent): Promise<IEvent>{
        return firstValueFrom(this.requestStream(event, false))
    }

    /**
     * Sends an {@link IEvent} expecting multiple responses
     * All response correlation will be handled internally
     * @param event to send as the request
     * @param sendControlEvents if true then control events will be sent to the server when changes to the returned to Observable are requested
     * @return an {@link Observable<IEvent} that will provide the response stream
     * NOTE: the naming here is similar to RSocket https://www.baeldung.com/rsocket#3-requeststream
     */
    public requestStream(event: IEvent, sendControlEvents: boolean): Observable<IEvent>{
        if(this.eventBus.isActive()){
            return new Observable<IEvent>((subscriber) => {

                if (this.requestRepliesObservable == null) {
                    this.requestRepliesSubject = new Subject<IEvent>()
                    this.requestRepliesObservable = this.eventBus.observe(this.replyToCri as string)
                                                        .pipe(multicast(this.requestRepliesSubject)) as ConnectableObservable<IEvent>
                    this.requestRepliesSubscription = this.requestRepliesObservable.connect()
                }

                let serverSignaledCompletion = false
                const correlationId = uuidv4()
                const defaultMessagesSubscription: Unsubscribable
                          = this.requestRepliesObservable
                                .pipe(filter((value: IEvent): boolean => {
                                    return value.headers.get(EventConstants.CORRELATION_ID_HEADER) === correlationId
                                })).subscribe({
                                                  next(value: IEvent): void {

                                                      if (value.hasHeader(EventConstants.CONTROL_HEADER)) {

                                                          if (value.headers.get(EventConstants.CONTROL_HEADER) === 'complete') {
                                                              serverSignaledCompletion = true
                                                              subscriber.complete()
                                                          } else {
                                                              throw new Error('Control Header ' + value.headers.get(EventConstants.CONTROL_HEADER) + ' is not supported')
                                                          }

                                                      } else if (value.hasHeader(EventConstants.ERROR_HEADER)) {

                                                          // TODO: add custom error type that contains error detail as well if provided by server, this would be the event body
                                                          serverSignaledCompletion = true
                                                          subscriber.error(new Error(value.getHeader(EventConstants.ERROR_HEADER)))

                                                      } else {

                                                          subscriber.next(value)

                                                      }
                                                  },
                                                  error(err: any): void {
                                                      subscriber.error(err)
                                                  },
                                                  complete(): void {
                                                      subscriber.complete()
                                                  }
                                              })

                subscriber.add(defaultMessagesSubscription)

                event.setHeader(EventConstants.REPLY_TO_HEADER, this.replyToCri as string)
                event.setHeader(EventConstants.CORRELATION_ID_HEADER, correlationId)

                this.eventBus.send(event)

                return () => {
                    if (sendControlEvents && !serverSignaledCompletion) {
                        // create control event to cancel long-running request
                        const controlEvent: Event = new Event(event.cri)
                        controlEvent.setHeader(EventConstants.CONTROL_HEADER, EventConstants.CONTROL_VALUE_CANCEL)
                        controlEvent.setHeader(EventConstants.CORRELATION_ID_HEADER, correlationId)
                        this.eventBus.send(controlEvent)
                    }
                }
            })
        }else{
            return throwError(() => this.createSendUnavailableError())
        }
    }

    /**
     * Creates the proper error to return if this.stompConnectionManager?.rxStomp is not available on a send request
     */
    private createSendUnavailableError(): Error {
        let ret: string = 'You must call connect on the event bus before sending any request'
        return new Error(ret)
    }

}
