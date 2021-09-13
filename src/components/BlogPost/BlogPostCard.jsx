import React from 'react';
import Img from 'gatsby-image';
import * as containerStyles from './BlogPostCard.module.css';
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
          style={{
            height: homepage ? '20rem' : '100%',
            maxHeight: homepage ? '20rem' : '12rem',
          }}
          className={`w-full shadow-none rounded-none`}
          fluid={img}
        />
        <section className={containerStyles.BlogPostBody + ' px-6 py-4 h-full'}>
          <motion.h2
            layoutId="layoutTitle"
            className="font-bold text-base md:text-xl"
          >
            {title}
          </motion.h2>
          <small className="text-sm block my-2">
            {date || 'No date found'}
          </small>
          <p className="text-sm md:text-base">{excerpt}</p>
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
