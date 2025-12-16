---
outline: deep
---

# Using Services (Clients)

Once you have Continuum services running, you can call them from client applications. This guide covers using Continuum services from TypeScript/JavaScript clients, which is the most common pattern for frontend applications.

## TypeScript/JavaScript Client

The Continuum TypeScript client allows you to connect to Continuum services and make type-safe RPC calls from browsers, Node.js, or Bun applications.

### Installation

Install the Continuum client library:

```bash
npm install @kinotic/continuum-client
# or
pnpm add @kinotic/continuum-client
# or
yarn add @kinotic/continuum-client
```

### Connecting to Continuum

Before you can call services, you need to establish a connection to the Continuum server:

```typescript
import { Continuum, ConnectionInfo, ConnectedInfo } from '@kinotic/continuum-client'

// Configure the connection
const connectionInfo: ConnectionInfo = {
    host: 'localhost',
    port: 58503,  // Default Continuum Gateway port
    useSSL: false  // Set to true for HTTPS/WSS
}

// Connect
const connectedInfo: ConnectedInfo = await Continuum.connect(connectionInfo)
```

The `connect` method returns a `ConnectedInfo` object that you can use to manage the connection lifecycle.

### Authentication

You can pass authentication credentials in the connection headers:

```typescript
const connectionInfo: ConnectionInfo = {
    host: 'localhost',
    port: 58503,
    connectHeaders: {
        login: 'username',
        passcode: 'password'
    }
}

try {
    const connectedInfo = await Continuum.connect(connectionInfo)
    // Connected successfully
} catch (error) {
    // Handle authentication failure
    console.error('Authentication failed:', error)
}
```

### Creating a Service Proxy Class

Create a typed service proxy class to call your services. The service name must match the fully qualified class name of your `@Publish` annotated interface:

While you can use `IServiceProxy` directly, creating a typed service class provides better type safety and developer experience:

```typescript
import { IServiceProxy, Continuum } from '@kinotic/continuum-client'

// Define domain types
interface Category {
    id: number
    name: string
}

interface Product {
    id: number
    name: string
    price: number
}

interface CheckoutInfo {
    items: Array<{ productId: number; quantity: number }>
    customerInfo: any
}

// Define your service interface
interface IStoreService {
    getAllCategories(): Promise<Category[]>
    getProduct(productId: number): Promise<Product>
    checkout(checkoutInfo: CheckoutInfo): Promise<string>
}

// Create a typed service class
class StoreService implements IStoreService {
    protected serviceProxy: IServiceProxy
    
    constructor() {
        this.serviceProxy = Continuum.serviceProxy(
            'com.coolcompany.ecommerce-main.api.StoreService'
        )
    }
    
    async getAllCategories(): Promise<Category[]> {
        return this.serviceProxy.invoke('getAllCategories')
    }
    
    async getProduct(productId: number): Promise<Product> {
        return this.serviceProxy.invoke('getProduct', [productId])
    }
    
    async checkout(checkoutInfo: CheckoutInfo): Promise<string> {
        return this.serviceProxy.invoke('checkout', [checkoutInfo])
    }
}

// Export a singleton instance
export const STORE_SERVICE: IStoreService = new StoreService()
```

### Using Your Service Proxy

Once you've created your service proxy class, you can use it to call your service methods:

```typescript
import { Continuum } from '@kinotic/continuum-client'
import { STORE_SERVICE } from './services/storeService'

// First, connect to Continuum
await Continuum.connect({
    host: 'localhost',
    port: 58503
})

// Then use your service
try {
    const categories = await STORE_SERVICE.getAllCategories()
    const product = await STORE_SERVICE.getProduct(productId)
    const orderId = await STORE_SERVICE.checkout(checkoutInfo)
} catch (error) {
    console.error('Service call failed:', error)
    // Handle the error appropriately
}
```

### Error Handling

Always handle errors when calling service methods:

```typescript
try {
    const product = await STORE_SERVICE.getProduct(productId)
    // Use the product
} catch (error) {
    console.error('Failed to get product:', error)
    // Handle the error (show message to user, retry, etc.)
}
```

### Connection Lifecycle

The connection remains active until you disconnect or it's closed:

```typescript
// The connection stays open for the lifetime of the application
// or until explicitly closed

// To disconnect (if needed)
// connectedInfo.disconnect()
```

In most applications, you'll establish the connection once when the application starts (or when the user logs in) and keep it open for the application's lifetime.

## Java Client

Continuum also supports Java clients for calling services from Java applications. The patterns are similar to server-side service usage—you inject service proxies and call them like local beans.

For detailed Java client documentation, see the [Advanced Topics](./advanced) section or the API reference.

## Summary

Using Continuum services from clients is straightforward:

1. **Install the client library** (`@kinotic/continuum-client`)
2. **Connect** to the Continuum server using `Continuum.connect()`
3. **Create a typed service proxy class** that wraps `Continuum.serviceProxy()`
4. **Call methods** on your service proxy class
5. **Handle errors** appropriately

The client handles all the networking, serialization, and protocol details automatically.

## What's Next?

- Learn about [RPC communication patterns](./rpc-patterns)
- Explore [events and streaming](./events-streaming) for real-time communication
- Check out [best practices](./best-practices) for client usage
