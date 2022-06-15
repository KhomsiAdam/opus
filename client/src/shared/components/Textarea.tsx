import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import TextareaAutoSize from 'react-textarea-autosize';

const propTypes = {
  className: PropTypes.string,
  invalid: PropTypes.bool,
  minRows: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const defaultProps = {
  className: undefined,
  invalid: false,
  minRows: 2,
  value: undefined,
  onChange: () => {},
};

const Textarea = forwardRef(({ className, invalid, onChange, ...textareaProps }: any, ref: any) => (
  <div className="inline-block w-full">
    <TextareaAutoSize
      className={`${className} overflow-y-hidden w-full pt-[8px] px-[12px] pb-[9px] text-[#172b4d] bg-[#F4F5F7] font-normal text-[15px] rounded-[3px] border border-solid border-[#dfe1e6] focus:bg-white focus:border focus:border-solid focus:border-[#4c9aff] textarea-shadow ${
        invalid &&
        'focus:border focus:border-solid focus:border-[overflow-y-hidden w-full pt-[8px] px-[12px] pb-[9px] text-[#172b4d] bg-[#F4F5F7] font-normal text-[15px] rounded-[3px] border border-solid border-[#dfe1e6]'
      }`}
      {...textareaProps}
      onChange={(event: any) => onChange(event.target.value, event)}
      ref={ref || undefined}
    />
  </div>
));

Textarea.propTypes = propTypes;
Textarea.defaultProps = defaultProps;

export default Textarea;
