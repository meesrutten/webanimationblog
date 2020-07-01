import React from 'react';
import containerStyles from './Arrow.module.css';

export const Arrow = props => {
  const { extraId, color, rotation } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="43"
      height="20"
      viewBox="0 0 43 20"
      className={`${containerStyles.Arrow} transform rotate-180`}
    >
      <g transform="translate(-2125 461)">
        <use
          className="fill-current"
          transform="translate(2125 -460)"
          xlinkHref={'#pointingArrow' + extraId}
        ></use>
      </g>
      <defs>
        <path
          id={'pointingArrow' + extraId}
          d="M41.5 9l.707.707.707-.707-.707-.707L41.5 9zM0 10h41.5V8H0v2zm42.207-1.707l-9-9L31.793.707l9 9 1.414-1.414zm-1.414 0l-9 9 1.414 1.414 9-9-1.414-1.414z"
        ></path>
      </defs>
    </svg>
  );
};
