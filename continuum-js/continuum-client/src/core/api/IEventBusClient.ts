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

import {ConnectionInfo, ServerInfo} from '@/api/ConnectionInfo'
import {ContinuumError} from '@/api/errors/ContinuumError'
import {ConnectedInfo} from '@/api/security/ConnectedInfo'
import {IEvent} from '@/core/api/IEvent.js'
import {IEventBus} from '@/core/api/IEventBus.js'
import {Observable} from 'rxjs'

/**
 * Part of the low level portion of continuum representing a connection to a continuum server
 * This is similar to a Stomp Client but with more required information and no control plane semantics.
 *
 * Created by Navid Mitchell on 2019-01-04.
 */
export interface IEventBusClient extends IEventBus {

    /**
     * Any errors emitted by this observable will be fatal and the connection will be closed.
     * You will need to resolve the problem and reconnect.
     */
    fatalErrors: Observable<ContinuumError>

    /**
     * The {@link ServerInfo} used when connecting, if connected or null
     */
    serverInfo: ServerInfo | null

    /**
     * Requests a connection to the given Stomp url
     * @param connectionInfo provides the information needed to connect to the continuum server
     * @return Promise containing the result of the initial connection attempt
     */
    connect(connectionInfo: ConnectionInfo): Promise<ConnectedInfo>

    /**
     * Disconnects the client from the server
     * This will clear any subscriptions and close the connection
     * @param force if true then the connection will be closed immediately without sending a disconnect frame
     *        When this mode is used, the actual Websocket may linger for a while
     *        and the broker may not realize that the connection is no longer in use.
     *
     * @return Promise containing the result of the disconnect attempt
     */
    disconnect(force?: boolean): Promise<void>

    /**
     * Determines if the connection is connected.
     * This means that there is an open connection to the Continuum server
     * @return true if the connection is active false if not
     */
    isConnected(): boolean

    /**
     * Determines if the connection is active.
     * This means {@link IEventBus#connect()} was called and was successful. The underlying connection may not be established yet.
     * If this is true and {@link IEventBus#isConnected} is false messages sent will be queued
     * @return true if the connection is active false if not
     */
    isActive(): boolean

    /**
     * Creates a subscription for all {@link IEvent}'s for the given destination
     * @param cri to subscribe to
     */
    observe(cri: string): Observable<IEvent>

    /**
     * Send a single {@link IEvent} to the connected server
     * @param event to send
     */
    send(event: IEvent): void

}

