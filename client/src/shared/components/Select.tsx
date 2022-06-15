import React, { useState, useRef } from 'react';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { FaChevronDown } from 'react-icons/fa';
import useOnOutsideClick from '@/shared/hooks/useOnOutsideClick';
import { KeyCodes } from '@/App/constants/keyCodes';

import Dropdown from './Dropdown';

const defaultProps = {
  className: undefined,
  variant: 'normal',
  dropdownWidth: undefined,
  name: undefined,
  value: undefined,
  defaultValue: undefined,
  placeholder: 'Select',
  invalid: false,
  onCreate: undefined,
  isMulti: false,
  withClearValue: true,
  renderValue: undefined,
  renderOption: undefined,
};

const Select = ({
  className,
  variant,
  dropdownWidth,
  name,
  value: propsValue,
  defaultValue,
  placeholder,
  invalid,
  options,
  onChange,
  onCreate,
  isMulti,
  withClearValue,
  renderValue: propsRenderValue,
  renderOption: propsRenderOption,
}: any) => {
  const [stateValue, setStateValue] = useState(defaultValue || (isMulti ? [] : null));
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const isControlled = propsValue !== undefined;
  const value = isControlled ? propsValue : stateValue;

  const $selectRef = useRef<any>(null);
  const $inputRef = useRef<any>(null);

  const activateDropdown = () => {
    if (isDropdownOpen) {
      $inputRef.current.focus();
    } else {
      setDropdownOpen(true);
    }
  };

  const deactivateDropdown = () => {
    setDropdownOpen(false);
    setSearchValue('');
    $selectRef.current.focus();
  };

  useOnOutsideClick($selectRef, isDropdownOpen, deactivateDropdown);

  const preserveValueType = (newValue: any) => {
    const areOptionValuesNumbers = options.some((option: any) => typeof option.value === 'number');

    if (areOptionValuesNumbers) {
      if (isMulti) {
        return newValue.map(Number);
      }
      if (newValue) {
        return Number(newValue);
      }
    }
    return newValue;
  };

  const handleChange = (newValue: any) => {
    if (!isControlled) {
      setStateValue(preserveValueType(newValue));
    }
    onChange(preserveValueType(newValue));
  };

  const removeOptionValue = (optionValue: any) => {
    handleChange(value.filter((val: any) => val !== optionValue));
  };

  const handleFocusedSelectKeydown = (event: any) => {
    if (isDropdownOpen) return;

    if (event.keyCode === KeyCodes.ENTER) {
      event.preventDefault();
    }
    if (event.keyCode !== KeyCodes.ESCAPE && event.keyCode !== KeyCodes.TAB && !event.shiftKey) {
      setDropdownOpen(true);
    }
  };

  const getOption = (optionValue: any) => options.find((option: any) => option.value === optionValue);
  const getOptionLabel = (optionValue: any) => (getOption(optionValue) || { label: '' }).label;

  const isValueEmpty = isMulti ? !value.length : !getOption(value);

  return (
    <div
      className={`relative rounded-[4px] cursor-pointer text-[14px] focus:outline-none ${variant === 'empty' && 'inline-block'} ${ variant === 'normal' && 'w-full border border-solid transition-colors border-[#dfe1e6] bg-[#F4F5F7] hover:bg-[#ebecf0] focus:border focus:border-solid focus:border-[#4c9aff] focus:bg-white focus-shadow' } ${invalid && 'focus:shadow-none focus:border focus:border-solid focus:border-[#E13C3C]'} `}
      ref={$selectRef}
      tabIndex={0}
      onKeyDown={handleFocusedSelectKeydown}
    >
      <div
        className={`flex items-center w-full ${
          variant === 'normal' && 'min-h-[32px] p-[5px]'
        }`}
        data-testid={name ? `select:${name}` : 'select'}
        onClick={activateDropdown}
      >
        {isValueEmpty && <div className="text-[#8993a4]">{placeholder}</div>}

        {!isValueEmpty && !isMulti && propsRenderValue ? propsRenderValue({ value }) : getOptionLabel(value)}

        {!isValueEmpty && isMulti && (
          <div className={`flex items-center flex-wrap ${variant === 'normal' && 'pt-[5px]'}`}>
            {value.map((optionValue: any) =>
              propsRenderValue ? (
                propsRenderValue({
                  value: optionValue,
                  removeOptionValue: () => removeOptionValue(optionValue),
                })
              ) : (
                <div
                  className="mt-0 mr-[5px] mb-[5px] ml-0 tag"
                  key={optionValue}
                  onClick={() => removeOptionValue(optionValue)}
                >
                  {getOptionLabel(optionValue)}
                  <AiOutlineClose className="ml-[4px]" />
                </div>
              ),
            )}
            <div className="flex mb-[3px] py-[3px] px-0 text-[12.5px] link">
              <AiOutlinePlus className="mr-[3px] align-middle text-[14px]" />
              Add more
            </div>
          </div>
        )}

        {(!isMulti || isValueEmpty) && variant !== 'empty' && (
          <FaChevronDown color="#5E6C84" fontSize={18} className="ml-auto" />
        )}
      </div>

      {isDropdownOpen && (
        <Dropdown
          dropdownWidth={dropdownWidth}
          value={value}
          isValueEmpty={isValueEmpty}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          // $selectRef={$selectRef}
          $inputRef={$inputRef}
          deactivateDropdown={deactivateDropdown}
          options={options}
          onChange={handleChange}
          onCreate={onCreate}
          isMulti={isMulti}
          withClearValue={withClearValue}
          propsRenderOption={propsRenderOption}
        />
      )}
    </div>
  );
};

Select.defaultProps = defaultProps;

export default Select;
