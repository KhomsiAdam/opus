import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import Modal from './Modal';
import Button from './Button';

const propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'danger']),
  title: PropTypes.string,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  renderLink: PropTypes.func.isRequired,
};

const defaultProps = {
  className: undefined,
  variant: 'primary',
  title: 'Warning',
  message: 'Are you sure you want to continue with this action?',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
};

const ConfirmModal = ({ className, variant, title, message, confirmText, cancelText, onConfirm, renderLink }: any) => {
  const [isWorking, setWorking] = useState(false);

  const handleConfirm = (modal: any) => {
    setWorking(true);
    onConfirm({
      close: () => {
        modal.close();
        setWorking(false);
      },
    });
  };

  return (
    <Modal
      className={className}
      testid="modal:confirm"
      withCloseIcon={false}
      renderLink={renderLink}
      renderContent={(modal: any) => (
        <Fragment>
          <div className='pb-[25px] font-medium text-[22px] leading-normal'>{title}</div>
          {message && <p className='pb-[25px] whitespace-pre-wrap text-[15px]'>{message}</p>}
          <div className='flex pt-[6px]'>
            <Button variant={variant} isWorking={isWorking} onClick={() => handleConfirm(modal)}>
              {confirmText}
            </Button>
            <Button hollow="true" onClick={modal.close}>
              {cancelText}
            </Button>
          </div>
        </Fragment>
      )}
    />
  );
};

ConfirmModal.propTypes = propTypes;
ConfirmModal.defaultProps = defaultProps;

export default ConfirmModal;
