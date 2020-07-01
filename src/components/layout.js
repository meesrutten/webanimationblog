import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Seo from '../components/seo';
import Nav from '../components/Nav/Nav';
import './layout.css';
import { motion } from 'framer-motion';

export const staggerTransition = {
  staggerChildren: 0.75,
  duration: 0.85,
  delayChildren: 0.5,
};

export const textVariants = {
  exit: {
    y: 20,
    opacity: 0,
    transition: staggerTransition,
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: staggerTransition,
  },
};

export const fade = {
  exit: { opacity: 0 },
  enter: { opacity: 1 },
};

const Layout = ({ children, showProgressBar, location }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <motion.div initial="exit" animate="enter" exit="exit" variants={fade}>
      <Seo {...data.site.siteMetadata} />
      <Nav location={location} showProgressBar={showProgressBar} />
      <motion.main
        initial="exit"
        animate="enter"
        exit="exit"
        variants={textVariants}
      >
        {children}
      </motion.main>
    </motion.div>
  );
};

export default Layout;
