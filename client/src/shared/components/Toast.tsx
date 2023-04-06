import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import pubsub from 'sweet-pubsub';
import { uniqueId } from 'lodash';
import { AiFillCloseCircle } from 'react-icons/ai';

const Toast = () => {
  const [toasts, setToasts] = useState<any>([]);

  useEffect(() => {
    const addToast = ({ type = 'success', title, message, duration = 5 }: any) => {
      const id = uniqueId('toast-');

      setToasts((currentToasts: any) => [...currentToasts, { id, type, title, message }]);

      if (duration) {
        setTimeout(() => removeToast(id), duration * 1000);
      }
    };

    pubsub.on('toast', addToast);

    return () => {
      pubsub.off('toast', addToast);
      clearTimeout();
    };
  }, []);

  const removeToast = (id: any) => {
    setToasts((currentToasts: any) => currentToasts.filter((toast: any) => toast.id !== id));
  };

  return (
    <div className="z-[1001] fixed right-[30px] top-[50px]">
      <TransitionGroup>
        {toasts.map((toast: any) => (
          <CSSTransition key={toast.id} classNames="jira-toast" timeout={200}>
            <div
              className="relative mb-[5px] w-[300px] py-[15px] px-[20px] rounded-[3px] text-white bg-primary-500 cursor-pointer transition-all translateZ"
              key={toast.id}
              onClick={() => removeToast(toast.id)}
            >
              <AiFillCloseCircle className='absolute top-[13px] right-[14px] cursor-pointer' color='#fff' size={22} />
              {toast.title && <div className='pr-[22px] text-[15px] font-medium'>{toast.title}</div>}
              {toast.message && <div className='pt-[8px] pr-[10px] pb-0 pl-0 whitespace-pre-wrap text-[14px] font-medium'>{toast.message}</div>}
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default Toast;
