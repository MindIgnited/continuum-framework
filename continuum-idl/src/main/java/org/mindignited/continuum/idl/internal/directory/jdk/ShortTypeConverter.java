package org.mindignited.continuum.idl.internal.directory.jdk;

import org.mindignited.continuum.idl.api.schema.C3Type;
import org.mindignited.continuum.idl.api.schema.ShortC3Type;
import org.mindignited.continuum.idl.internal.directory.ConversionContext;
import org.mindignited.continuum.idl.internal.directory.SpecificTypeConverter;
import org.springframework.core.ResolvableType;
import org.springframework.stereotype.Component;

/**
 * Created by Navíd Mitchell 🤪 on 4/13/23.
 */
@Component
public class ShortTypeConverter implements SpecificTypeConverter {

    private static final Class<?>[] supports = {short.class, Short.class};

    @Override
    public Class<?>[] supports() {
        return supports;
    }

    @Override
    public C3Type convert(ResolvableType resolvableType,
                          ConversionContext conversionContext) {
        return new ShortC3Type();
    }

}
