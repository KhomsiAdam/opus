import React, { useState, useRef, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';

import InputAlt from './InputAlt';

const InputDebounced = ({ onChange, value: propsValue, className, ...inputProps }: any) => {
  const [value, setValue] = useState(propsValue);
  const isControlled = propsValue !== undefined;

  const handleChange = useCallback(
    debounce((newValue) => onChange(newValue), 500),
    [],
  );

  const valueRef = useRef(value);
  valueRef.current = value;

  useEffect(() => {
    if (propsValue !== valueRef.current) {
      setValue(propsValue);
    }
  }, [propsValue]);

  return (
    <InputAlt
      {...inputProps}
      className={className}
      value={isControlled ? value : undefined}
      onChange={(newValue: any) => {
        setValue(newValue);
        handleChange(newValue);
      }}
    />
  );
};

export default InputDebounced;
