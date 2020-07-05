import React from 'react';

export const CodepenEmbed = ({ id }) => {
  // BaoERMd
  return (
    <iframe
      height="265"
      style={{ width: '100%' }}
      scrolling="no"
      loading="lazy"
      title={id}
      src={`https://codepen.io/meesrutten/embed/preview/${id}?height=265&theme-id=dark&default-tab=html,result`}
      frameBorder="no"
      allowFullScreen={true}
    >
      <a href={`https://codepen.io/meesrutten/pen/${id}`}>See the Pen </a> by
      Mees (<a href="https://codepen.io/meesrutten">@meesrutten</a>) on{' '}
      <a href="https://codepen.io">CodePen</a>.
    </iframe>
  );
};
