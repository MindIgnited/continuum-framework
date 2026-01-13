/*
 *
 * Copyright 2008-2021 Kinotic and the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {ServerInfo} from '@/api/ConnectionInfo'
import {ContinuumError} from '@/api/errors/ContinuumError'
import {IEvent} from '@/core/api/IEvent.js'
import {IEventBus} from '@/core/api/IEventBus.js'
import {Observable} from 'rxjs'

/**
 * Part of the low level portion of continuum representing an event bus server.
 *
 * Created by Navid Mitchell on 2019-01-04.
 */
export interface IEventBusServer extends IEventBus{

    /**
     * Any errors emitted by this observable will be fatal and the connection will be closed.
     * You will need to resolve the problem and reconnect.
     */
    fatalErrors: Observable<ContinuumError>

    /**
     * Determines if the connection is active.
     * This means {@link IEventBus#listen()} was called and was successful. There may or may not be active connections.
     * @return true if the server is listening false if not
     */
    isActive(): boolean

    /**
     * Starts a local event bus server to listen for incoming connections
     * NOTE: Not all implementations will support this
     * @param serverInfo to listen on
     */
    listen(serverInfo: ServerInfo): Promise<void>

    /**
     * Stops the local event bus server from listening for incoming connections
     */
    stopListening(): Promise<void>

    /**
     * Creates a subscription for all {@link IEvent}'s for the given destination
     * @param cri to subscribe to
     */
    observe(cri: string): Observable<IEvent>

    /**
     * Send a single {@link IEvent}
     * @param event to send
     */
    send(event: IEvent): void

}

