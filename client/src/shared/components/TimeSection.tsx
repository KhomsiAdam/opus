import React, { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { range } from 'lodash';

import { formatDate, formatDateTimeForAPI } from '@/shared/helpers/dateTime';

const propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  setDropdownOpen: PropTypes.func.isRequired,
};

const defaultProps = {
  value: undefined,
};

const DatePickerTimeSection = ({ value, onChange, setDropdownOpen }: any) => {
  const $sectionRef = useRef<any>();

  useLayoutEffect(() => {
    scrollToSelectedTime($sectionRef.current, value);
  }, [value]);

  const handleTimeChange = (newTime: any) => {
    const [newHour, newMinute] = newTime.split(':');

    const existingDateWithNewTime = moment(value).set({
      hour: Number(newHour),
      minute: Number(newMinute),
    });
    onChange(formatDateTimeForAPI(existingDateWithNewTime));
    setDropdownOpen(false);
  };

  return (
    <div className='absolute top-0 right-0 h-full w-[90px] py-[5px] px-0 border-l border-solid border-[#C1C7D0] scrollableY' ref={$sectionRef}>
      {generateTimes().map((time) => (
        <div className='pt-[5px] pr-0 pb-[5px] pl-[20px] text-[14px] hover-style selected-style'
          key={time}
          data-time={time}
          // isSelected={time === formatTime(value)}
          onClick={() => handleTimeChange(time)}
        >
          {time}
        </div>
      ))}
    </div>
  );
};

const formatTime = (value: any) => formatDate(value, 'HH:mm');

const scrollToSelectedTime = ($scrollCont: any, value: any) => {
  if (!$scrollCont) return;

  const $selectedTime = $scrollCont.querySelector(`[data-time="${formatTime(value)}"]`);
  if (!$selectedTime) return;

  $scrollCont.scrollTop = $selectedTime.offsetTop - 80;
};

const generateTimes = () =>
  range(48).map((i) => {
    const hour = `${Math.floor(i / 2)}`;
    const paddedHour = hour.length < 2 ? `0${hour}` : hour;
    const minute = i % 2 === 0 ? '00' : '30';
    return `${paddedHour}:${minute}`;
  });

DatePickerTimeSection.propTypes = propTypes;
DatePickerTimeSection.defaultProps = defaultProps;

export default DatePickerTimeSection;
