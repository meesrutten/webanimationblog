import React from 'react';
import Img from 'gatsby-image';
import containerStyles from './BlogPostCard.module.css';
import { motion } from 'framer-motion';

const BlogPostCard = React.memo(
  props => {
    const { title, img, excerpt, date, homepage = false } = props;

    return (
      <motion.article
        className={
          containerStyles.BlogPostCard +
          ' max-w-sm w-full rounded rounded-lg overflow-hidden shadow-xl flex flex-col h-full'
        }
      >
        <Img
          alt={title}
          className={`w-full shadow-none rounded-none${
            homepage ? ' h-56' : ''
          }`}
          fluid={img}
        />
        <section className={containerStyles.BlogPostBody + ' px-6 py-4'}>
          <motion.h2 layoutId="layoutTitle" className="font-bold text-xl">
            {title}
          </motion.h2>
          <p className="text-gray-600 mb-2">{date || 'Aug 18'}</p>

          <p className="text-base">{excerpt}</p>
        </section>
      </motion.article>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.id === nextProps.id) {
      return true;
    }

    return false;
  }
);

export default BlogPostCard;
