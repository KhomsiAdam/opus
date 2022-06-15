import React, { Fragment, useRef } from 'react';

import Textarea from './Textarea';
import Button from './Button';

const BodyForm = ({ value, onChange, isWorking, onSubmit, onCancel }: any) => {
  const $textareaRef = useRef<any>(null);

  const handleSubmit = () => {
    if ($textareaRef.current.value.trim()) {
      onSubmit();
    }
  };

  return (
    <Fragment>
      <Textarea autoFocus placeholder="Add a comment..." value={value} onChange={onChange} ref={$textareaRef} />
      <div className='flex pt-[10px]'>
        <Button className="btn-primary" isWorking={isWorking} onClick={handleSubmit}>
          Save
        </Button>
        <Button className="ml-[10px] btn-danger" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Fragment>
  );
};

export default BodyForm;
