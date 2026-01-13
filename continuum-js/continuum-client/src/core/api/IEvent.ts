import {Optional} from 'typescript-optional'

/**
 * Part of the low level portion of continuum representing data to be processed
 *
 * This is similar to a Stomp Frame but with more required information and no control plane semantics.
 *
 *
 * Created by Navid Mitchell on 2019-01-04.
 */
export interface IEvent {

    /**
     * The cri that specifies where the event should be routed
     */
    cri: string

    /**
     * Any headers defined for this event.
     * This will usually contain all the fields above as well since they are typically wrappers around expected header values.
     */
    headers: Map<string, string>

    /**
     * The event payload. The payload depends on the type the payload is encoded into a media format which is specified by the contentType attribute (e.g. application/json).
     */
    data: Optional<Uint8Array>

    /**
     * @return the data property as a UTF-8 encoded string
     */
    getDataString(): string

    /**
     * Gets the value for the header with the given key
     * @param key to get the header value for
     * @return the header value or undefined if there is no header for the key
     */
    getHeader(key: string): string | undefined

    /**
     * Tests if a header for the given key exists
     * @param key to check if exists as a header
     * @return true if the header for the key exists false if not
     */
    hasHeader(key: string): boolean

    /**
     * Removes the header from the headers map
     * @param key to remove
     * @return true if an element in the headers map object existed and has been removed, or false if the element does not exist
     */
    removeHeader(key: string): boolean

    /**
     * Sets the data property from the given string value
     * @param data
     */
    setDataString(data: string): void

    /**
     * Sets the header into the headers map
     * @param key the key to use
     * @param value the value to use
     */
    setHeader(key: string, value: string): void

}
