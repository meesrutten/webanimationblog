import React from 'react';
import * as containerStyles from './BlogLayout.module.css';

const BlogLayout = props => {
  const { children } = props;
  return (
    <div
      className={`${containerStyles.BlogLayout} BlogLayout container mx-auto max-w-3xl py-8 lg:py-24 px-8`}
    >
      {children}
    </div>
  );
};

export default BlogLayout;
