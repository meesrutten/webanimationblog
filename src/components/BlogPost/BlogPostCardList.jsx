import React from 'react';
import BlogPostCard from './BlogPostCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'gatsby';
import * as containerStyles from './BlogPostCardList.module.css';

const variants = {
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
    },
  }),
  hidden: {
    opacity: 0,
    y: 20,
  },
};

export const BlogPostCardList = props => {
  const { homepage } = props;
  let { posts } = props;

  return (
    <React.Fragment>
      {homepage ? (
        <AnimatePresence>
          <motion.div
            key={posts[0].node.id}
            custom={0}
            initial="hidden"
            animate="visible"
            variants={variants}
            positionTransition={true}
            exit={{ opacity: 0 }}
            className={containerStyles.BlogPostCardList + ' w-full'}
          >
            <Link
              key={posts[0].node.fields.slug}
              to={posts[0].node.fields.slug}
              aria-label={`Go to the blog post about ${posts[0].node.frontmatter.title}`}
              title={`Go to the blog post about ${posts[0].node.frontmatter.title}`}
              className="block"
            >
              <BlogPostCard
                title={posts[0].node.frontmatter.title}
                excerpt={posts[0].node.excerpt}
                img={
                  posts[0].node.frontmatter.featuredImage.childImageSharp.fluid
                }
                date={posts[0].node.frontmatter.datePublished}
                homepage={true}
              />
            </Link>
          </motion.div>
        </AnimatePresence>
      ) : null}
      <ul className="grid md:grid-flow-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
        <AnimatePresence>
          {posts.map(({ node: post }, i) => {
            if (homepage && i === 0) return;
            return (
              <motion.li
                key={post.id}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={variants}
                positionTransition={true}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                <Link
                  key={post.fields.slug}
                  to={post.fields.slug}
                  aria-label={`Go to the blog post about ${post.frontmatter.title}`}
                  title={`Go to the blog post about ${post.frontmatter.title}`}
                  className="card-link block h-full"
                >
                  <BlogPostCard
                    title={post.frontmatter.title}
                    excerpt={post.excerpt}
                    img={post.frontmatter.featuredImage.childImageSharp.fluid}
                    date={post.frontmatter.datePublished}
                  />
                </Link>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </React.Fragment>
  );
};

function everyItemIsTheSame(prevProps, nextProps) {
  const hasSameAmountOfItems = prevProps.posts.length && nextProps.posts.length;
  const hasSameItems = prevProps.posts.every((post, i) => {
    return post.node.id === nextProps.posts[i].node.id;
  });

  const isSame = hasSameAmountOfItems && hasSameItems;

  return isSame;
}
