import React from 'react';

export const CodeSandbox = ({ id }) => {
  // BaoERMd
  return (
    <iframe
      src={`https://codesandbox.io/embed/${id}?fontsize=14&hidenavigation=1&theme=dark`}
      style={{
        width: '100%',
        height: '500px',
        border: 0,
        borderRadius: '4px',
        overflow: 'hidden',
      }}
      title={`${id}`}
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-autoplay allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    ></iframe>
  );
};