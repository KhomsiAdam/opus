import React, { Fragment, useState, useRef, useLayoutEffect } from 'react';

import useOnOutsideClick from '@/shared/hooks/useOnOutsideClick';

const defaultProps = {
  className: undefined,
  placement: 'bottom',
  offset: {
    top: 0,
    left: 0,
  },
};

const Tooltip = ({ placement, offset, width, renderLink, renderContent }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const $linkRef = useRef();
  const $tooltipRef = useRef<any>(null);

  const openTooltip = () => setIsOpen(true);
  const closeTooltip = () => setIsOpen(false);

  useOnOutsideClick([$tooltipRef, $linkRef], isOpen, closeTooltip);

  useLayoutEffect(() => {
    const setTooltipPosition = () => {
      const { top, left } = calcPosition(offset, placement, $tooltipRef, $linkRef);
      $tooltipRef.current.style.top = `${top}px`;
      $tooltipRef.current.style.left = `${left}px`;
    };

    if (isOpen) {
      setTooltipPosition();
      window.addEventListener('resize', setTooltipPosition);
      window.addEventListener('scroll', setTooltipPosition);
    }

    return () => {
      window.removeEventListener('resize', setTooltipPosition);
      window.removeEventListener('scroll', setTooltipPosition);
    };
  }, [isOpen, offset, placement]);

  return (
    <>
      {renderLink({ ref: $linkRef, onClick: isOpen ? closeTooltip : openTooltip })}

      {isOpen && (
        <div className={`tooltip fixed z-[1001] w-[${width}] rounded-[3px] bg-white`} ref={$tooltipRef}>
          {renderContent({ close: closeTooltip })}
        </div>
      )}
    </>
  );
};

const calcPosition = (offset: any, placement: any, $tooltipRef: any, $linkRef: any) => {
  const margin = 10;
  const finalOffset = { ...defaultProps.offset, ...offset };

  const tooltipRect = $tooltipRef.current.getBoundingClientRect();
  const linkRect = $linkRef.current.getBoundingClientRect();

  const linkCenterY = linkRect.top + linkRect.height / 2;
  const linkCenterX = linkRect.left + linkRect.width / 2;

  const placements: any = {
    top: {
      top: linkRect.top - margin - tooltipRect.height,
      left: linkCenterX - tooltipRect.width / 2,
    },
    right: {
      top: linkCenterY - tooltipRect.height / 2,
      left: linkRect.right + margin,
    },
    bottom: {
      top: linkRect.bottom + margin,
      left: linkCenterX - tooltipRect.width / 2,
    },
    left: {
      top: linkCenterY - tooltipRect.height / 2,
      left: linkRect.left - margin - tooltipRect.width,
    },
  };
  return {
    top: placements[placement].top + finalOffset.top,
    left: placements[placement].left + finalOffset.left,
  };
};

export default Tooltip;
