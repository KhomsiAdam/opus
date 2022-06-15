import React, { Fragment } from 'react';

const Breadcrumbs = ({ items }: any) => (
  <div className='text-[15px] text-[#5E6C84]'>
    {items.map((item: any, index: any) => (
      <Fragment key={item}>
        {index !== 0 && <span className='relative top-[2px] my-0 mx-[10px] text-[18px]'>/</span>}
        {item}
      </Fragment>
    ))}
  </div>
);

export default Breadcrumbs;
