import React from 'react';
import './BlogContentLayout.css';

const BlogContentLayout = props => {
  const { children } = props;

  return (
    <article className="BlogContentLayout container flex flex-col justify-center mx-auto">
      {children}
    </article>
  );
};

export default BlogContentLayout;
