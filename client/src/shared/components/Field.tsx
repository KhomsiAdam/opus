import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

import Input from './InputAlt';
import Select from './Select';
import Textarea from './Textarea';
import TextEditor from './TextEditor';
import DatePicker from './DatePicker';

const propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  tip: PropTypes.string,
  error: PropTypes.string,
  name: PropTypes.string,
};

const defaultProps = {
  className: undefined,
  label: undefined,
  tip: undefined,
  error: undefined,
  name: undefined,
};

const generateField = (FormComponent: any) => {
  const FieldComponent = ({ className, label, tip, error, name, ...otherProps }: any) => {
    const fieldId = uniqueId('form-field-');

    return (
      <div className={`mt-[20px] ${className}`} data-testid={name ? `form-field:${name}` : 'form-field'}>
        {label && <label className='block pb-[5px] text-[#5E6C84] font-medium text-[13px]' htmlFor={fieldId}>{label}</label>}
        <FormComponent
        id={fieldId}
        // invalid={`${error && !!error.toString()}`}
        name={name} {...otherProps} />
        {tip && <div className='pt-[6px] text-[#5E6C84] text-[12.5px]'>{tip}</div>}
        {error && <div className='mt-[6px] leading-none text-[#E13C3C] font-medium text-[12.5px]'>{error}</div>}
      </div>
    );
  };

  FieldComponent.propTypes = propTypes;
  FieldComponent.defaultProps = defaultProps;

  return FieldComponent;
};

export default {
  Input: generateField(Input),
  Select: generateField(Select),
  Textarea: generateField(Textarea),
  TextEditor: generateField(TextEditor),
  DatePicker: generateField(DatePicker),
};
