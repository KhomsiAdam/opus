import React, { Fragment, useState, useRef, useEffect, useCallback } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import useOnOutsideClick from '@/shared/hooks/useOnOutsideClick';
import useOnEscapeKeyDown from '@/shared/hooks/useOnEscapeKeyDown';

const defaultProps = {
  className: undefined,
  testid: 'modal',
  variant: 'center',
  width: 600,
  withCloseIcon: true,
  isOpen: undefined,
  onClose: () => {},
  renderLink: () => {},
};

const Modal = ({
  className,
  testid,
  variant,
  width,
  withCloseIcon,
  isOpen: propsIsOpen,
  onClose: tellParentToClose,
  renderLink,
  renderContent,
}: any) => {
  const [stateIsOpen, setStateOpen] = useState(false);
  const isControlled = typeof propsIsOpen === 'boolean';
  const isOpen = isControlled ? propsIsOpen : stateIsOpen;

  const $modalRef = useRef<any>(null);
  const $clickableOverlayRef = useRef<any>(null);

  const closeModal = useCallback(() => {
    if (!isControlled) {
      setStateOpen(false);
    } else {
      tellParentToClose();
    }
  }, [isControlled, tellParentToClose]);

  useOnOutsideClick($modalRef, isOpen, closeModal, $clickableOverlayRef);
  useOnEscapeKeyDown(isOpen, closeModal);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isOpen]);

  return (
    <>
      {!isControlled && renderLink({ open: () => setStateOpen(true) })}

      {isOpen && (
        <div
          className={`${
            variant === 'center'
              ? 'grid justify-center items-center fixed top-0 left-0 h-full w-full z-[1000] scrollableY min-h-full bg-[rgba(9,30,66,0.54)]'
              : 'fixed top-0 left-0 h-full w-full z-[1000] scrollableY min-h-full bg-[rgba(9,30,66,0.54)]'
          }`}
        >
          <div className={`${variant === 'center' ? 'w-full p-[50px]' : ''}`} ref={$clickableOverlayRef}>
            <div
              className={`inline-block relative bg-white ${className}
              ${
                variant === 'center'
                  ? `max-w-[${width}px] align-middle rounded-[3px] box-shadow-medium`
                  : 'min-h-screen max-w-[${width}px] box-shadow-aside'
              }`}
              data-testid={testid}
              ref={$modalRef}
            >
              {withCloseIcon && (
                <AiOutlineClose
                  className="absolute text-[25px] text-[#5E6C84] transition-all select-none cursor-pointer right-[13px] top-[10px]"
                  type="close"
                  onClick={closeModal}
                />
              )}
              {renderContent({ close: closeModal })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Modal.defaultProps = defaultProps;

export default Modal;
