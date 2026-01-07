package org.mindignited.continuum.idl.internal.api.converter;

import org.mindignited.continuum.idl.api.converter.IdlConverter;
import org.mindignited.continuum.idl.api.converter.IdlConverterFactory;
import org.mindignited.continuum.idl.api.converter.IdlConverterStrategy;
import org.springframework.stereotype.Component;

/**
 * Created by Navíd Mitchell 🤪 on 4/26/23.
 */
@Component
public class DefaultIdlConverterFactory implements IdlConverterFactory {

    @Override
    public <R, S> IdlConverter<R, S> createConverter(IdlConverterStrategy<R, S> strategy) {
        return new DefaultIdlConverter<>(strategy);
    }

}
