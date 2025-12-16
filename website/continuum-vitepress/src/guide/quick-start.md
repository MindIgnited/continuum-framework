---
outline: deep
---

# Quick Start

This guide will get you up and running with Continuum quickly. Continuum supports different deployment patterns, so choose the path that matches what you're building. Each path includes step-by-step instructions to get you from zero to a working Continuum application.

## Choose Your Path

What do you want to build? Click on a path below to expand the step-by-step instructions.

<details>
<summary><strong>Path 1: Java backend with a web frontend</strong></summary>

Building a full-stack application with Java services and a TypeScript/JavaScript frontend

### Prerequisites

This is the most common pattern for full-stack applications. You'll create Java services that can be called from a TypeScript/JavaScript frontend.

### Prerequisites

- Java 17 or higher
- A Spring Boot application (or create a new one)
- Node.js and npm/pnpm/yarn (for the frontend)

### Step 1: Add Dependencies

Add Continuum dependencies to your `build.gradle` (or equivalent Maven dependencies):

```gradle
dependencies {
    implementation "org.kinotic:continuum-core:${continuumVersion}"
    implementation "org.kinotic:continuum-core-vertx:${continuumVersion}"
    implementation "org.kinotic:continuum-gateway:${continuumVersion}"
    // ... your other dependencies
}
```

Replace `${continuumVersion}` with the latest Continuum version.

### Step 2: Enable Continuum and Gateway

In your main Spring Boot application class, add the `@EnableContinuum` and `@EnableContinuumGateway` annotations:

```java
import org.kinotic.continuum.api.annotations.EnableContinuum;
import org.kinotic.continuum.gateway.api.annotations.EnableContinuumGateway;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableContinuum
@EnableContinuumGateway
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

The `@EnableContinuum` annotation enables Continuum in your application. The `@EnableContinuumGateway` annotation embeds the Gateway in your server, allowing frontend clients to connect.

### Step 3: Create Your First Service

Create a service interface and add the `@Publish` annotation:

```java
import org.kinotic.continuum.api.annotations.Publish;
import java.util.List;

@Publish
public interface HelloService {
    String sayHello(String name);
    List<String> getGreetings();
}
```

That's it! The `@Publish` annotation tells Continuum to make this service available remotely. The service will be automatically discovered and registered.

### Step 4: Implement the Service

Implement your service interface as a standard Spring component:

```java
import org.springframework.stereotype.Component;
import java.util.Arrays;
import java.util.List;

@Component
public class DefaultHelloService implements HelloService {
    
    @Override
    public String sayHello(String name) {
        return "Hello, " + name + "!";
    }
    
    @Override
    public List<String> getGreetings() {
        return Arrays.asList("Hello", "Hi", "Hey");
    }
}
```

Standard Spring dependency injection works as normal. The framework handles all the complexity of making this service available remotely.

### Step 5: Frontend Setup

Install the Continuum client library in your frontend project:

```bash
npm install @kinotic/continuum-client
# or
pnpm add @kinotic/continuum-client
# or
yarn add @kinotic/continuum-client
```

### Step 6: Connect and Call Your Service

In your frontend code, connect to Continuum and create a service proxy:

```typescript
import { Continuum, IServiceProxy } from '@kinotic/continuum-client'

// Connect to the backend
const connectionInfo = {
    host: 'localhost',
    port: 58503  // Default Continuum Gateway port
}

const connectedInfo = await Continuum.connect(connectionInfo)

// Create a service proxy
const helloService: IServiceProxy = Continuum.serviceProxy(
    'com.yourpackage.HelloService'  // Full class name of your service interface
)

// Call your service methods
const greeting = await helloService.invoke('sayHello', ['World'])
console.log(greeting)  // "Hello, World!"

const greetings = await helloService.invoke('getGreetings', [])
console.log(greetings)  // ["Hello", "Hi", "Hey"]
```

### Step 7: Run and Test

1. Start your Spring Boot application
2. The Gateway will start on port 58503 (default)
3. In your frontend, connect and call your service

You now have a working Continuum application!

### What's Next?

- Learn more about [creating services](./java-services)
- Explore [client usage patterns](./clients)
- See [RPC communication patterns](./rpc-patterns)

</details>

<details>
<summary><strong>Path 2: Node.js or Bun backend with a web frontend</strong></summary>

Building with a Node.js/Bun backend and TypeScript/JavaScript frontend

This path is for developers building with Node.js or Bun backends. Since Continuum's core implementation is in Java, you'll need a separate Gateway server for non-Java backends.

### Prerequisites

- Java 17 or higher (for the Gateway server)
- Node.js 18+ or Bun
- A Node.js/Bun project (or create a new one)

### Step 1: Set Up the Gateway Server

Create a separate Spring Boot application for the Gateway:

```java
import org.kinotic.continuum.api.annotations.EnableContinuum;
import org.kinotic.continuum.gateway.api.annotations.EnableContinuumGateway;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableContinuum
@EnableContinuumGateway
public class GatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
    }
}
```

Add the Gateway dependency:

```gradle
dependencies {
    implementation "org.kinotic:continuum-gateway:${continuumVersion}"
}
```

The Gateway acts as a router, allowing your Node.js/Bun services and frontend clients to communicate through Continuum.

### Step 2: Node.js/Bun Backend Setup

In your Node.js/Bun project, install the Continuum client:

```bash
npm install @kinotic/continuum-client
```

### Step 3: Create and Publish Services

Create your service in Node.js/Bun. (Note: Full Node.js/Bun server support documentation is coming. For now, you can connect Node.js/Bun services through the Gateway.)

### Step 4: Frontend Setup

Follow the same frontend setup as Path 1 (Steps 5-6), connecting to the Gateway server.

### Step 5: Run and Test

1. Start the Gateway server (Java application)
2. Start your Node.js/Bun backend
3. Start your frontend
4. Connect and test

### What's Next?

- Learn more about [Gateway configuration](./configuration)
- Explore [client usage patterns](./clients)
- Check back for upcoming Node.js/Bun server documentation

</details>

---

## Need Help?

If you run into issues:

- Check the [Configuration](./configuration) guide for setup details
- Review the [Best Practices](./best-practices) guide
- Look at the [CoolCommerce example](https://github.com/Kinotic-Foundation/continuum-examples/tree/main/CoolCommerce) for a complete working application
