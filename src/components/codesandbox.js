import React from 'react';

export const CodeSandbox = ({ id, view }) => {
  // BaoERMd
  return (
    <iframe
      src={`https://codesandbox.io/embed/${id}?fontsize=14&hidenavigation=1&theme=dark${
        view ? `&view=${view}` : ''
      }`}
      style={{
        width: '100%',
        height: '500px',
        border: 0,
        borderRadius: '4px',
        overflow: 'hidden',
        marginBottom: '3rem',
      }}
      title={`${id}`}
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-autoplay allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    ></iframe>
  );
};
