/**
 * Constants used within {@link IEvent}'s to control the flow of events
 * Header that start with __ will always be persisted between messages
 */
export enum EventConstants {
    CONTENT_TYPE_HEADER           = 'content-type',
    CONTENT_LENGTH_HEADER         = 'content-length',
    REPLY_TO_HEADER               = 'reply-to',

    /**
     * This is the replyToId that will be supplied by the client, which will be used when sending replies to the client.
     */
    REPLY_TO_ID_HEADER            = 'reply-to-id',

    /**
     * Header provided by the sever on connection to represent the user's session id
     */
    SESSION_HEADER                = 'session',

    /**
     * Header provided by the server on connection to provide the {@link ConnectionInfo} as a JSON string
     */
    CONNECTED_INFO_HEADER         = 'connected-info',

    /**
     * Header provided by the client on connection request to represent that the server
     * should not keep the session alive after any network disconnection.
     */
    DISABLE_STICKY_SESSION_HEADER = "disable-sticky-session",

    /**
     * Correlates a response with a given request
     * Headers that start with __ will always be persisted between messages
     */
    CORRELATION_ID_HEADER         = '__correlation-id',

    /**
     * Denotes that something caused an error. Will contain a brief message about the error
     */
    ERROR_HEADER                  = 'error',

    /**
     * Denotes the completion of an event stream. The value typically will contain the reason for completion.
     */
    COMPLETE_HEADER               = 'complete',

    /**
     * Denotes the event is a control plane event. These are used for internal coordination.
     */
    CONTROL_HEADER                = 'control',

    /**
     * Stream is complete, no further values will be sent.
     */
    CONTROL_VALUE_COMPLETE        = 'complete',

    CONTROL_VALUE_CANCEL          = 'cancel',

    CONTROL_VALUE_SUSPEND         = 'suspend',

    CONTROL_VALUE_RESUME          = 'resume',

    SERVICE_DESTINATION_PREFIX    = 'srv://',
    SERVICE_DESTINATION_SCHEME    = "srv",
    STREAM_DESTINATION_PREFIX     = 'stream://',
    STREAM_DESTINATION_SCHEME     = "stream",

    CONTENT_JSON                  = 'application/json',
    CONTENT_TEXT                  = 'text/plain',

    /**
     * The traceparent HTTP header field identifies the incoming request in a tracing system. It has four fields:
     *
     *     version
     *     trace-id
     *     parent-id
     *     trace-flags
     * @see https://www.w3.org/TR/trace-context/#traceparent-header
     */
    TRACEPARENT_HEADER            = 'traceparent',

    /**
     * The main purpose of the tracestate header is to provide additional vendor-specific trace identification information across different distributed tracing systems and is a companion header for the traceparent field. It also conveys information about the request’s position in multiple distributed tracing graphs.
     * @see https://www.w3.org/TR/trace-context/#tracestate-header
     */
    TRACESTATE_HEADER             = 'tracestate'
}
