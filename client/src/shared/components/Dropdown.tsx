import React, { useState, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { uniq } from 'lodash';

import { KeyCodes } from '@/App/constants/keyCodes';

import { AiOutlineClose } from 'react-icons/ai';

const propTypes = {
  dropdownWidth: PropTypes.number,
  value: PropTypes.any,
  isValueEmpty: PropTypes.bool.isRequired,
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired,
  $inputRef: PropTypes.object.isRequired,
  deactivateDropdown: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onCreate: PropTypes.func,
  isMulti: PropTypes.bool.isRequired,
  withClearValue: PropTypes.bool.isRequired,
  propsRenderOption: PropTypes.func,
};

const defaultProps = {
  dropdownWidth: undefined,
  value: undefined,
  onCreate: undefined,
  propsRenderOption: undefined,
};

const SelectDropdown = ({
  dropdownWidth,
  value,
  isValueEmpty,
  searchValue,
  setSearchValue,
  $inputRef,
  deactivateDropdown,
  options,
  onChange,
  onCreate,
  isMulti,
  withClearValue,
  propsRenderOption,
}: any) => {
  const [isCreatingOption, setCreatingOption] = useState(false);

  const $optionsRef = useRef<any>(null);

  useLayoutEffect(() => {
    const setFirstOptionAsActive = () => {
      const $active = getActiveOptionNode();
      if ($active) $active.classList.remove(activeOptionClass);

      if ($optionsRef.current.firstElementChild) {
        $optionsRef.current.firstElementChild.classList.add(activeOptionClass);
      }
    };
    setFirstOptionAsActive();
  });

  const selectOptionValue = (optionValue: any) => {
    deactivateDropdown();
    if (isMulti) {
      onChange(uniq([...value, optionValue]));
    } else {
      onChange(optionValue);
    }
  };

  const createOption = (newOptionLabel: any) => {
    setCreatingOption(true);
    onCreate(newOptionLabel, (createdOptionValue: any) => {
      setCreatingOption(false);
      selectOptionValue(createdOptionValue);
    });
  };

  const clearOptionValues = () => {
    $inputRef.current.value = '';
    $inputRef.current.focus();
    onChange(isMulti ? [] : null);
  };

  const handleInputKeyDown = (event: any) => {
    if (event.keyCode === KeyCodes.ESCAPE) {
      handleInputEscapeKeyDown(event);
    } else if (event.keyCode === KeyCodes.ENTER) {
      handleInputEnterKeyDown(event);
    } else if (event.keyCode === KeyCodes.ARROW_DOWN || event.keyCode === KeyCodes.ARROW_UP) {
      handleInputArrowUpOrDownKeyDown(event);
    }
  };

  const handleInputEscapeKeyDown = (event: any) => {
    event.nativeEvent.stopImmediatePropagation();
    deactivateDropdown();
  };

  const handleInputEnterKeyDown = (event: any) => {
    event.preventDefault();

    const $active = getActiveOptionNode();
    if (!$active) return;

    const optionValueToSelect = $active.getAttribute('data-select-option-value');
    const optionLabelToCreate = $active.getAttribute('data-create-option-label');

    if (optionValueToSelect) {
      selectOptionValue(optionValueToSelect);
    } else if (optionLabelToCreate) {
      createOption(optionLabelToCreate);
    }
  };

  const handleInputArrowUpOrDownKeyDown = (event: any) => {
    const $active = getActiveOptionNode();
    if (!$active) return;

    const $options = $optionsRef.current;
    const $optionsHeight = $options.getBoundingClientRect().height;
    const $activeHeight = $active.getBoundingClientRect().height;

    if (event.keyCode === KeyCodes.ARROW_DOWN) {
      if ($options.lastElementChild === $active) {
        $active.classList.remove(activeOptionClass);
        $options.firstElementChild.classList.add(activeOptionClass);
        $options.scrollTop = 0;
      } else {
        $active.classList.remove(activeOptionClass);
        $active.nextElementSibling.classList.add(activeOptionClass);
        if ($active.offsetTop > $options.scrollTop + $optionsHeight / 1.4) {
          $options.scrollTop += $activeHeight;
        }
      }
    } else if (event.keyCode === KeyCodes.ARROW_UP) {
      if ($options.firstElementChild === $active) {
        $active.classList.remove(activeOptionClass);
        $options.lastElementChild.classList.add(activeOptionClass);
        $options.scrollTop = $options.scrollHeight;
      } else {
        $active.classList.remove(activeOptionClass);
        $active.previousElementSibling.classList.add(activeOptionClass);
        if ($active.offsetTop < $options.scrollTop + $optionsHeight / 2.4) {
          $options.scrollTop -= $activeHeight;
        }
      }
    }
  };

  const handleOptionMouseEnter = (event: any) => {
    const $active = getActiveOptionNode();
    if ($active) $active.classList.remove(activeOptionClass);
    event.currentTarget.classList.add(activeOptionClass);
  };

  const getActiveOptionNode = () => $optionsRef.current.querySelector(`.${activeOptionClass}`);

  const optionsFilteredBySearchValue = options.filter((option: any) =>
    option.label.toString().toLowerCase().includes(searchValue.toLowerCase()),
  );

  const removeSelectedOptionsMulti = (opts: any) => opts.filter((option: any) => !value.includes(option.value));
  const removeSelectedOptionsSingle = (opts: any) => opts.filter((option: any) => value !== option.value);

  const filteredOptions = isMulti
    ? removeSelectedOptionsMulti(optionsFilteredBySearchValue)
    : removeSelectedOptionsSingle(optionsFilteredBySearchValue);

  const isSearchValueInOptions = options.map((option: any) => option.label).includes(searchValue);
  const isOptionCreatable = onCreate && searchValue && !isSearchValueInOptions;

  return (
    <div className={`absolute z-[101] top-full left-0 rounded-b-[4px] w-[343px] bg-white box-shadow-dropdown`}>
      <input
        className="pt-[10px] px-[14px] p-[8px] w-full border-none text-[#172b4d] bg-none focus:outline-none"
        type="text"
        placeholder="Search"
        ref={$inputRef}
        autoFocus
        onKeyDown={handleInputKeyDown}
        onChange={(event: any) => setSearchValue(event.target.value)}
      />

      {!isValueEmpty && withClearValue && <AiOutlineClose className="absolute top-[4px] right-[7px] p-[5px] text-[16px] text-[#5E6C84] cursor-pointer select-none" onClick={clearOptionValues} />}

      <div className="max-h-[200px] scrollableY options-scrollbar" ref={$optionsRef}>
        {filteredOptions.map((option: any) => (
          <div
            className="py-[8px] px-[14px] word-break cursor-pointer"
            key={option.value}
            data-select-option-value={option.value}
            data-testid={`select-option:${option.label}`}
            onMouseEnter={handleOptionMouseEnter}
            onClick={() => selectOptionValue(option.value)}
          >
            {propsRenderOption ? propsRenderOption(option) : option.label}
          </div>
        ))}

        {isOptionCreatable && (
          <div
            className="py-[8px] px-[14px] word-break cursor-pointer"
            data-create-option-label={searchValue}
            onMouseEnter={handleOptionMouseEnter}
            onClick={() => createOption(searchValue)}
          >
            {isCreatingOption ? `Creating "${searchValue}"...` : `Create "${searchValue}"`}
          </div>
        )}
      </div>

      {filteredOptions.length === 0 && <div className='pt-[5px] px-[15px] pb-[15px] text-[#8993a4]'>No results</div>}
    </div>
  );
};

const activeOptionClass = 'jira-select-option-is-active';

SelectDropdown.propTypes = propTypes;
SelectDropdown.defaultProps = defaultProps;

export default SelectDropdown;
