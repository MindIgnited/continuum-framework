package org.mindignited.continuum.internal.core.api.support;

import org.mindignited.continuum.api.annotations.Proxy;
import org.mindignited.continuum.api.annotations.Version;
import reactor.core.publisher.Mono;

/**
 * Created by Navíd Mitchell 🤪 on 5/12/22.
 */
@Proxy(namespace = "com.namespace",
       name = "NonExistentService")
@Version("1.1.0")
public interface NonExistentServiceProxy {

    Mono<Void> probablyNotHome();

}
