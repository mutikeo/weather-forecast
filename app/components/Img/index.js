/**
 *
 * Img.js
 *
 * Renders an image, enforcing the usage of the alt="" tag
 */

import React from 'react';
import PropTypes from 'prop-types';

function Img(props) {
  return (
    <img
      width={props.width}
      height={props.height}
      className={props.className}
      src={props.src}
      alt={props.alt}
    />
  );
}

const { oneOfType, string, object } = PropTypes;

Img.propTypes = {
  src: oneOfType([string, object]).isRequired,
  alt: string.isRequired,
  className: string,
  width: string,
  height: string,
};

Img.defaultProps = {
  width: 'auto',
  height: 'auto',
};

export default Img;
