import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.string,
  filter: PropTypes.instanceOf(RegExp),
  onChange: PropTypes.func,
};

const defaultProps = {
  className: undefined,
  value: undefined,
  icon: undefined,
  filter: undefined,
  onChange: () => {},
};

const Input = forwardRef(({ icon, className, filter, onChange, ...inputProps }: any, ref: any) => {
  const handleChange = (event: any) => {
    if (!filter || filter.test(event.target.value)) {
      onChange(event.target.value, event);
    }
  };

  return (
    <div className={`relative inline-block h-[32px] w-full ${className}`}>
      {icon && icon}
      <input
        className={`h-full w-full py-0 px-[7px] rounded-[3px] border border-solid border-[#dfe1e6] text-[#172b4d] bg-[#F4F5F7] transition-colors font-normal text-[15px] hover:bg-[#ebecf0] input-alt`}
        {...inputProps}
        onChange={handleChange}
        ref={ref}
        style={{ paddingLeft: `${icon ? '32px' : ''}` }}
      />
    </div>
  );
});

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
