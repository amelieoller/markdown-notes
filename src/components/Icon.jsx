import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({
  color, size, icon, className, onClick,
}) => {
  const styles = {
    svg: {
      display: 'inline-block',
      verticalAlign: 'middle',
    },
    path: {
      fill: color,
    },
  };

  return (
    <svg
      className={className}
      style={styles.svg}
      width={`${size}px`}
      height={`${size}px`}
      onClick={onClick}
      viewBox="0 0 1024 1024"
    >
      <path style={styles.path} d={icon} />
    </svg>
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
};

Icon.defaultProps = {
  size: 16,
  color: '#263238',
  className: '',
};

export default Icon;
