import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
};

const defaultProps = {
  className: undefined,
  size: 28,
};

const Logo = ({ className, size }: any) => (
  <span className={className}>
    <img
      src="https://firebasestorage.googleapis.com/v0/b/opus-8e9be.appspot.com/o/opus_icon.svg?alt=media&token=f62f0a20-72e7-4f28-a995-1e8d02a4affe"
      width={size}
      alt="Opus Logo"
    />
  </span>
);


export default Logo;
