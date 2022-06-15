import React, { forwardRef } from 'react';

import StyledSpinner from './StyledSpinner';

const defaultProps = {
  className: undefined,
  children: undefined,
  variant: 'secondary',
  icon: undefined,
  iconSize: 18,
  disabled: false,
  isWorking: false,
  onClick: () => {},
};

const Button = forwardRef(
  ({ className, children, variant, icon, iconSize, disabled, isWorking, onClick, ...buttonProps }: any, ref: any) => {
    const handleClick = () => {
      if (!disabled && !isWorking) {
        onClick();
      }
    };

    return (
      <button
        className={`${className} inline-flex items-center justify-center h-[32px] align-middle leading-none whitespace-nowrap rounded-[3px] transition-all appearance-none p-[9px] text-[14.5px] button`}
        {...buttonProps}
        onClick={handleClick}
        // variant={variant}
        // disabled={disabled || isWorking}
        // isWorking={isWorking}
        // iconOnly={!children}
        ref={ref}
      >
        {isWorking && <StyledSpinner className='relative top-[1px]' size={26} color={getIconColor(variant)} />}

        {/* {!isWorking && icon && typeof icon === 'string' ? (
          // <Icon type={icon} size={iconSize} color={getIconColor(variant)} />
          // <span>icon</span>
          <AiOutlineLink />
        ) : (
          icon
        )} */}
        {icon}
        {children && <div className={`${isWorking || icon ? 'pl-[7px]' : 'pl-0'}`}>{children}</div>}
      </button>
    );
  },
);

const getIconColor = (variant: any) => (['secondary', 'empty'].includes(variant) ? '#212121' : '#fff');

Button.defaultProps = defaultProps;

export default Button;
