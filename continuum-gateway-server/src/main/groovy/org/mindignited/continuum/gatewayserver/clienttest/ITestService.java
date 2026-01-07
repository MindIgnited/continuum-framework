package org.mindignited.continuum.gatewayserver.clienttest;

import org.mindignited.continuum.api.annotations.Publish;
import org.mindignited.continuum.api.annotations.Version;

import java.util.UUID;

/**
 * Created by Navíd Mitchell 🤪 on 7/12/23.
 */
@Publish
@Version("1.0.0")
public interface ITestService {

    String testMethodWithString(String value);

    UUID getTestUUID();

}
