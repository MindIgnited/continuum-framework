---
outline: deep
---

# RPC Communication Patterns

Continuum supports different RPC communication patterns depending on your use case. This guide covers the main patterns: request-response and streaming responses.

## Request-Response Pattern

The request-response pattern is the most common RPC pattern. You send a request and wait for a response.

### When to Use

- Retrieving data
- Performing operations that return results
- Standard CRUD operations
- Any operation where you need the result

### Service Interface

Define your service interface with methods that return values:

```java
@Publish
public interface StoreService {
    Product getProduct(Long productId);
}
```

### Client Usage

Create a typed service proxy class and use it:

```typescript
import { IServiceProxy, Continuum } from '@kinotic/continuum-client'

interface IStoreService {
    getProduct(productId: number): Promise<Product>
}

class StoreService implements IStoreService {
    protected serviceProxy: IServiceProxy
    
    constructor() {
        this.serviceProxy = Continuum.serviceProxy(
            'com.example.StoreService'
        )
    }
    
    async getProduct(productId: number): Promise<Product> {
        return this.serviceProxy.invoke('getProduct', [productId])
    }
}

const STORE_SERVICE = new StoreService()

// Use the service
const product = await STORE_SERVICE.getProduct(productId)
```

## Streaming Responses

Streaming responses allow the server to send multiple values over time, perfect for real-time data or large datasets.

### When to Use

- Real-time data feeds
- Large datasets that should be processed incrementally
- Server-push updates
- Event streams

### Service Interface

Use reactive types (`Flux` from Project Reactor) for streaming:

```java
import reactor.core.publisher.Flux;

@Publish
public interface DataService {
    Flux<DataPoint> streamData(String source);
}
```

### Client Usage

Create a typed service proxy class for streaming methods:

```typescript
import { IServiceProxy, Continuum } from '@kinotic/continuum-client'
import { Observable } from 'rxjs'

interface IDataService {
    streamData(source: string): Observable<DataPoint>
}

class DataService implements IDataService {
    protected serviceProxy: IServiceProxy
    
    constructor() {
        this.serviceProxy = Continuum.serviceProxy(
            'com.example.DataService'
        )
    }
    
    streamData(source: string): Observable<DataPoint> {
        return this.serviceProxy.invoke('streamData', [source])
    }
}

const DATA_SERVICE = new DataService()

// Use the streaming service
DATA_SERVICE.streamData('sensor-1').subscribe({
    next: (dataPoint) => console.log('Received:', dataPoint),
    error: (err) => console.error('Stream error:', err),
    complete: () => console.log('Stream completed')
})
```

## Summary

Continuum supports two main RPC patterns:

- **Request-Response**: Return values for standard operations where you need the result. This is the default pattern for most scenarios.
- **Streaming**: `Flux` or `Observable` for real-time data feeds where the server pushes multiple values over time.

Choose the pattern that matches your use case, with request-response being the default choice for most scenarios.

## What's Next?

- Explore [advanced topics](./advanced) for more complex patterns
