---
outline: deep
---

# Configuration

Continuum is designed to work with sensible defaults, so minimal configuration is required. This guide covers the available configuration options and when you might need to customize them.

## Required Configuration

For most applications, you only need to enable Continuum with annotations:

```java
@SpringBootApplication
@EnableContinuum        // Required: Enables Continuum
@EnableContinuumGateway // Optional: Only needed if you have frontend clients
public class MyApplication {
    // ...
}
```

No additional configuration is needed to get started.

## Optional Configuration Properties

You can configure Continuum through Spring Boot's `application.yml` or `application.properties` files. All configuration properties are under the `continuum` prefix.

### Basic Properties

```yaml
continuum:
  # Debug mode - provides additional logging and information
  debug: false
  
  # Disable clustering (useful for single-node deployments or testing)
  disableClustering: false
  
  # Work directory for Ignite (used for clustering and data storage)
  igniteWorkDirectory: ./ignite-work
```

### Network Configuration

```yaml
continuum:
  # Event bus cluster port (for multi-node deployments)
  eventBusClusterPort: 58504
  
  # Gateway port (default: 58503)
  gateway:
    port: 58503
```

### Performance Tuning

```yaml
continuum:
  # Maximum off-heap memory (for Ignite data regions)
  maxOffHeapMemory: 2GB
  
  # Maximum number of CPU cores to use
  maxNumberOfCoresToUse: 4
  
  # Maximum event payload size
  maxEventPayloadSize: 1MB
```

### Session Management

```yaml
continuum:
  # Session timeout (default: 30 minutes)
  sessionTimeout: 30m
```

## Gateway Configuration

If you're using `@EnableContinuumGateway`, you can configure the Gateway:

```yaml
continuum:
  gateway:
    # Port for Gateway WebSocket connections (default: 58503)
    port: 58503
    
    # Host to bind to (default: 0.0.0.0 for all interfaces)
    host: 0.0.0.0
```

### Separate Gateway Server

If you're running a separate Gateway server (for Node.js/Bun backends), configure it similarly:

```yaml
# Gateway server application.yml
continuum:
  gateway:
    port: 58503
```

## Environment-Specific Configuration

You can use Spring Boot's profile-based configuration for different environments:

### Development (`application-dev.yml`)

```yaml
continuum:
  debug: true
  disableClustering: true  # Single node for development
  igniteWorkDirectory: ./ignite-work-dev
```

### Production (`application-prod.yml`)

```yaml
continuum:
  debug: false
  disableClustering: false  # Enable clustering for production
  maxOffHeapMemory: 4GB
  maxNumberOfCoresToUse: 8
  sessionTimeout: 60m
  igniteWorkDirectory: /var/lib/continuum/ignite-work
```

### Testing (`application-test.yml`)

```yaml
continuum:
  debug: false
  disableClustering: true  # No clustering needed for tests
  igniteWorkDirectory: ./ignite-work-test
```

## Clustering Configuration

For multi-service deployments, Continuum uses Apache Ignite for clustering:

```yaml
continuum:
  # Disable clustering (single node)
  disableClustering: false
  
  # Event bus cluster port
  eventBusClusterPort: 58504
  
  # Ignite work directory (shared or local)
  igniteWorkDirectory: ./ignite-work
```

When clustering is enabled, services automatically discover each other and can communicate directly.

## Security Configuration

Security configuration depends on your authentication/authorization setup. Continuum supports:

- **Authentication Headers**: Pass credentials via connection headers (see [Clients](./clients) guide)
- **Participant Context**: Security context is automatically propagated through `Participant` parameters

For custom security setups, you may need to configure:
- Connection header validation
- Participant context injection
- Authorization rules

See the [Advanced Topics](./advanced) section for more on security configuration.

## Transport Configuration

Currently, Continuum uses STOMP over WebSockets with JSON serialization. This is not configurable in the current implementation, but the architecture supports pluggable transports for future extensions.

## Default Values

| Property | Default | Description |
|----------|---------|-------------|
| `continuum.debug` | `false` | Enable debug logging |
| `continuum.disableClustering` | `false` | Disable clustering (single node) |
| `continuum.eventBusClusterPort` | `58504` | Event bus cluster port |
| `continuum.gateway.port` | `58503` | Gateway WebSocket port |
| `continuum.sessionTimeout` | `30m` | Session timeout duration |
| `continuum.igniteWorkDirectory` | `./ignite-work` | Ignite work directory |

## Configuration Examples

### Minimal Configuration (Default)

No configuration file needed—just use the annotations:

```java
@SpringBootApplication
@EnableContinuum
@EnableContinuumGateway
public class MyApplication {
    // Works with all defaults
}
```

### Single Node (Development)

```yaml
# application.yml
continuum:
  disableClustering: true
  debug: true
```

### Production Multi-Node

```yaml
# application-prod.yml
continuum:
  disableClustering: false
  eventBusClusterPort: 58504
  maxOffHeapMemory: 4GB
  maxNumberOfCoresToUse: 8
  sessionTimeout: 60m
  igniteWorkDirectory: /var/lib/continuum/ignite-work
```

### Custom Gateway Port

```yaml
# application.yml
continuum:
  gateway:
    port: 8080  # Use port 8080 instead of default 58503
```

## Troubleshooting Configuration

### Check Current Configuration

You can verify your configuration by enabling debug mode:

```yaml
continuum:
  debug: true
```

This will log detailed information about Continuum's startup and configuration.

### Common Issues

**Port Already in Use:**
- Change the Gateway port: `continuum.gateway.port: 58504`
- Or stop the process using the port

**Clustering Issues:**
- For single-node deployments, set `disableClustering: true`
- For multi-node, ensure nodes can communicate on the cluster port

**Memory Issues:**
- Adjust `maxOffHeapMemory` if you see memory errors
- Tune `maxNumberOfCoresToUse` based on your server resources

## Summary

Continuum requires minimal configuration:
- Most applications work with defaults
- Use `application.yml` for custom configuration
- Configure per-environment using Spring profiles
- Enable debug mode for troubleshooting

## What's Next?

- Learn about [Advanced Topics](./advanced) for complex configurations
- Check out [Best Practices](./best-practices) for configuration recommendations
- See the [Reference](./reference/continuum-config) section for detailed property documentation
