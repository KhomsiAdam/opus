import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { KeyCodes } from '@/App/constants/keyCodes';
import { isFocusedElementEditable } from '@/shared/helpers/browser';

const propTypes = {
  setFormOpen: PropTypes.func.isRequired,
};

const ProTip = ({ setFormOpen }: any) => {
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (!isFocusedElementEditable() && event.keyCode === KeyCodes.M) {
        event.preventDefault();
        setFormOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setFormOpen]);

  return (
    <div className="flex items-center pt-[8px] text-[#5E6C84] text-[13px]">
      <strong className="pr-[4px]">Pro tip:</strong>press
      <span className="relative top-[1px] inline-block my-0 py-0 px-[4px] mx-[4px] rounded-[2px] text-[#172b4d] bg-[#dfe1e6] font-bold text-[12px]">
        M
      </span>
      to comment
    </div>
  );
};

ProTip.propTypes = propTypes;

export default ProTip;
