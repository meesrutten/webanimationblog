import React from 'react';
import * as containerStyles from './HeaderImage.module.css';
import Img from 'gatsby-image';

const HeaderImage = ({ fluid }) => {
  return <Img fluid={fluid} className={containerStyles.HeaderImage} />;
};

export default HeaderImage;
