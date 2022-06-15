import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {FaCalendar} from 'react-icons/fa'
import { formatDate, formatDateTime } from '@/shared/helpers/dateTime';
import useOnOutsideClick from '@/shared/hooks/useOnOutsideClick';
import Input from './InputAlt';

import DateSection from './DateSection';
import TimeSection from './TimeSection';

const propTypes = {
  className: PropTypes.string,
  withTime: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

const defaultProps = {
  className: undefined,
  withTime: true,
  value: undefined,
};

const DatePicker = ({ className, withTime, value, onChange, ...inputProps }: any) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const $containerRef = useRef<any>(null);

  useOnOutsideClick($containerRef, isDropdownOpen, () => setDropdownOpen(false));

  return (
    <div className='relative' ref={$containerRef}>
      <Input
        icon={<FaCalendar />}
        {...inputProps}
        className={className}
        autoComplete="off"
        value={getFormattedInputValue(value, withTime)}
        onClick={() => setDropdownOpen(true)}
      />
      {isDropdownOpen && (
        <div className={`z-[101] absolute top-[130%] right-0 w-[270px] rounded-[3px] bg-white box-shadow-dropdown ${withTime && 'w-[360px] pr-[90px]'}`}>
          <DateSection withTime={withTime} value={value} onChange={onChange} setDropdownOpen={setDropdownOpen} />
          {withTime && <TimeSection value={value} onChange={onChange} setDropdownOpen={setDropdownOpen} />}
        </div>
      )}
    </div>
  );
};

const getFormattedInputValue = (value: any, withTime: any) => {
  if (!value) return '';
  return withTime ? formatDateTime(value) : formatDate(value);
};

DatePicker.propTypes = propTypes;
DatePicker.defaultProps = defaultProps;

export default DatePicker;
