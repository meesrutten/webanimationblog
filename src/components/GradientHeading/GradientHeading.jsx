import React from 'react';
import containerStyles from './GradientHeading.module.css';
import { motion } from 'framer-motion';
import { textVariants } from '../layout.js';
const GradientHeading = props => {
  const { headingLevel = 1, children } = props;
  const GradientHeading = 'h' + headingLevel;

  return (
    <motion.h1
      initial="exit"
      animate="enter"
      exit="exit"
      variants={textVariants}
      className={`${containerStyles.GradientHeading} ${containerStyles['GradientHeading']} -ml-2 mb-8`}
    >
      {children}
    </motion.h1>
  );
};

export default GradientHeading;
