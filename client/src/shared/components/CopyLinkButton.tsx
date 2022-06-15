import React, { useState } from 'react';
import { AiOutlineLink } from 'react-icons/ai';
import { copyToClipboard } from '@/shared/helpers/browser';
import Button from './Button';

const CopyLinkButton = ({ ...buttonProps }) => {
  const [isLinkCopied, setLinkCopied] = useState(false);

  const handleLinkCopy = () => {
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
    copyToClipboard(window.location.href);
  };

  return (
    <Button className='flex items-center' icon={<AiOutlineLink />} onClick={handleLinkCopy} {...buttonProps}>
      {isLinkCopied ? 'Link Copied' : 'Copy link'}
    </Button>
  );
};

export default CopyLinkButton;
