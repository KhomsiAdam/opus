import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { times, range } from 'lodash';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { formatDate, formatDateTimeForAPI } from '@/shared/helpers/dateTime';

const propTypes = {
  withTime: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  setDropdownOpen: PropTypes.func.isRequired,
};

const defaultProps = {
  withTime: true,
  value: undefined,
};

const DatePickerDateSection = ({ withTime, value, onChange, setDropdownOpen }: any) => {
  const [selectedMonth, setSelectedMonth] = useState(moment(value).startOf('month'));

  const handleYearChange = (year: any) => {
    setSelectedMonth(moment(selectedMonth).set({ year: Number(year) }));
  };

  const handleMonthChange = (addOrSubtract: any) => {
    // @ts-ignore
    setSelectedMonth(moment(selectedMonth)[addOrSubtract](1, 'month'));
  };

  const handleDayChange = (newDate: any) => {
    const existingHour = value ? moment(value).hour() : '00';
    const existingMinute = value ? moment(value).minute() : '00';

    const newDateWithExistingTime = newDate.set({
      hour: existingHour,
      minute: existingMinute,
    });
    onChange(formatDateTimeForAPI(newDateWithExistingTime));

    if (!withTime) {
      setDropdownOpen(false);
    }
  };

  return (
    <div className="relative p-[20px]">
      <div className="inline-block pl-[7px] font-bold text-[16px]">{formatDate(selectedMonth, 'MMM YYYY')}</div>

      <select
        className="ml-[5px] w-[60px] h-[22px] text-[13px]"
        onChange={(event: any) => handleYearChange(event.target.value)}
      >
        {generateYearOptions().map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div className="absolute top-[12px] right-[19px]">
        <FaArrowLeft
          className="pt-[7px] px-[5px] pb-[4px] text-[22px] text-[#8993a4] cursor-pointer select-none hover:text-[#172b4d]"
          onClick={() => handleMonthChange('subtract')}
        />
        <FaArrowRight
          className="pt-[7px] px-[5px] pb-[4px] text-[22px] text-[#8993a4] cursor-pointer select-none hover:text-[#172b4d]"
          onClick={() => handleMonthChange('add')}
        />
      </div>

      <div className="flex flex-wrap pt-[15px] text-center">
        {generateWeekDayNames().map((name) => (
          <div className="w-[14.28%] h-[30px] leading-8 text-[13px] text-[#8993a4]" key={name}>
            {name}
          </div>
        ))}
        {generateFillerDaysBeforeMonthStart(selectedMonth).map((i) => (
          <div className={`w-[14.28%] h-[30px] leading-8 rounded-[3px] text-[15px] hover-style`} key={`before-${i}`} />
        ))}
        {generateMonthDays(selectedMonth).map((date) => (
          <div
            className="w-[14.28%] h-[30px] leading-8 rounded-[3px] text-[15px] selected-style font-bold"
            // @ts-ignore
            key={date}
            isToday={moment().isSame(date, 'day')}
            isSelected={moment(value).isSame(date, 'day')}
            onClick={() => handleDayChange(date)}
          >
            {formatDate(date, 'D')}
          </div>
        ))}
        {generateFillerDaysAfterMonthEnd(selectedMonth).map((i) => (
          <div className="w-[14.28%] h-[30px] leading-8 rounded-[3px] text-[15px] hover-style" key={`after-${i}`} />
        ))}
      </div>
    </div>
  );
};

const currentYear = moment().year();

const generateYearOptions = () => [
  { label: 'Year', value: '' },
  ...times(50, (i) => ({ label: `${i + currentYear - 10}`, value: `${i + currentYear - 10}` })),
];

const generateWeekDayNames = () => moment.weekdaysMin(true);

const generateFillerDaysBeforeMonthStart = (selectedMonth: any) => {
  const count = selectedMonth.diff(moment(selectedMonth).startOf('week'), 'days');
  return range(count);
};

const generateMonthDays = (selectedMonth: any) =>
  times(selectedMonth.daysInMonth()).map((i) => moment(selectedMonth).add(i, 'days'));

const generateFillerDaysAfterMonthEnd = (selectedMonth: any) => {
  const selectedMonthEnd = moment(selectedMonth).endOf('month');
  const weekEnd = moment(selectedMonthEnd).endOf('week');
  const count = weekEnd.diff(selectedMonthEnd, 'days');
  return range(count);
};

DatePickerDateSection.propTypes = propTypes;
DatePickerDateSection.defaultProps = defaultProps;

export default DatePickerDateSection;
