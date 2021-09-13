import { Link } from 'gatsby';
import React from 'react';
import * as containerStyles from './Nav.module.css';
import Progress from '../Progress/Progress';
import AnimatedDarkModeToggler from '../DarkModeToggler/AnimatedDarkModeToggler';
import { Arrow } from '../Arrow/Arrow';
import { AnimatePresence, motion } from 'framer-motion';

export const QuartOut = {
  duration: 0.8,
  ease: [0.17, 0.84, 0.44, 1],
};

const Nav = props => {
  const { showProgressBar, location } = props;

  return (
    <nav
      className={
        containerStyles.Nav + ' border-bottom-blue-500 border-opacity-75'
      }
    >
      <AnimatePresence>
        {location.pathname.includes('blog') && (
          <motion.div
            key="arrow-link"
            initial={{ opacity: 0, x: '1rem' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-1rem' }}
            transition={QuartOut}
          >
            <Link
              className="inline-block py-4"
              to={'/'}
              partiallyActive={false}
              title="Go back to home page"
            >
              <span className="hidden">Back to home</span>
              <Arrow rotation="180" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* <ul className="px-8">
        {links.map(({ link, name, partiallyActive }) => (
          <li className="inline-block" key={`${name} - ${link}`}>
            <Link
              className="inline-block py-4"
              activeClassName="active"
              to={link}
              partiallyActive={partiallyActive}
            >
              {name}
            </Link>
          </li>
        ))}

        <li className="inline-block">
        </li>
      </ul> */}
      <motion.p
        style={{ position: 'absolute' }}
        key="title"
        initial={{
          left: location.pathname.includes('blog') ? '2rem' : '50%',
          x: location.pathname.includes('blog') ? '0%' : '-50%',
        }}
        animate={{
          left: location.pathname.includes('blog') ? '50%' : '2rem',
          x: location.pathname.includes('blog') ? '-50%' : '0%',
        }}
        exit={{
          left: location.pathname.includes('blog') ? '50%' : '2rem',
          x: location.pathname.includes('blog') ? '-50%' : '0%',
        }}
        transition={QuartOut}
      >
        webanimation.blog
      </motion.p>
      <AnimatedDarkModeToggler />
      {showProgressBar && <Progress />}
    </nav>
  );
};

export default Nav;
