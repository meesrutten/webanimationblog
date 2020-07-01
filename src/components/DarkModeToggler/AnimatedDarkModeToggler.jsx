import React from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../ThemeContext';
import containerStyles from './AnimatedDarkModeToggler.module.css';

const Circle = props => {
  return (
    <motion.circle
      r="17.5px"
      initial={false}
      fill={'var(--color-darkModeToggle)'}
      {...props}
    />
  );
};

const AnimatedDarkModeToggler = props => {
  const { colorMode, setColorMode } = React.useContext(ThemeContext);
  const animateValue = colorMode === 'dark' ? 'dark' : 'light';

  if (!colorMode) {
    return null;
  }

  return (
    <label
      className={containerStyles.AnimatedDarkModeToggler}
      htmlFor={'toggleDarkMode'}
    >
      <input
        id={'toggleDarkMode'}
        type="checkbox"
        aria-label={'Toggle dark mode'}
        checked={colorMode === 'dark'}
        onChange={ev => {
          setColorMode(ev.target.checked ? 'dark' : 'light');
        }}
      />
      <motion.svg
        width="50px"
        height="50px"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        variants={{
          dark: { rotate: 0 },
          light: { rotate: colorMode === 'light' && 180 },
        }}
        initial={false}
        animate={animateValue}
        style={{
          originX: '50%',
          originY: '50%',
          translateY: '0%',
        }}
        transition={{
          ease: 'easeOut',
          duration: 0.5,
          type: 'spring',
          stiffness: 50,
        }}
      >
        <Circle
          cx="200.5"
          cy="292.5px"
          variants={{
            dark: { cy: '220.5px', scale: 0, opacity: 0 },
            light: { cy: '292.5px', scale: 1, opacity: 1 },
          }}
          animate={animateValue}
          transition={{
            duration: 0.2,
            delay: colorMode === 'light' && 0.1,
            type: 'spring',
            stiffness: 100,
          }}
        />
        <Circle
          cx="114.5px"
          cy="251.5"
          variants={{
            dark: { cx: '150px', scale: 0, opacity: 0 },
            light: { cx: '114.5px', scale: 1, opacity: 1 },
          }}
          animate={animateValue}
          transition={{
            duration: 0.2,
            delay: colorMode === 'light' && 0.1,
            type: 'spring',
            stiffness: 100,
          }}
        />
        <Circle
          cx="114.5px"
          cy="169.5px"
          variants={{
            dark: { cx: '150px', scale: 0, opacity: 0 },
            light: { cx: '114.5px', scale: 1, opacity: 1 },
          }}
          animate={animateValue}
          transition={{
            duration: 0.2,
            delay: colorMode === 'light' && 0.2,
            type: 'spring',
            stiffness: 100,
          }}
        />

        <Circle
          cx="200.5"
          cy="111.5px"
          variants={{
            dark: { cy: '160px', scale: 0, opacity: 0 },
            light: { cy: '111.5px', scale: 1, opacity: 1 },
          }}
          transition={{
            duration: 0,
            delay: colorMode === 'light' && 0.3,
            type: 'spring',
            stiffness: 100,
          }}
          animate={animateValue}
        />
        <Circle
          cx="285.5px"
          cy="169.5"
          variants={{
            dark: { cx: '230px', scale: 0, opacity: 0 },
            light: { cx: '285.5px', scale: 1, opacity: 1 },
          }}
          animate={animateValue}
          transition={{
            duration: 0.2,
            delay: colorMode === 'light' && 0.4,
            type: 'spring',
            stiffness: 100,
          }}
        />
        <Circle
          cx="285.5px"
          cy="251.5"
          variants={{
            dark: { cx: '240px', scale: 0, opacity: 0 },
            light: { cx: '285.5px', scale: 1, opacity: 1 },
          }}
          animate={animateValue}
          transition={{
            duration: 0.2,
            delay: colorMode === 'light' && 0.5,
            type: 'spring',
            stiffness: 100,
          }}
        />
        <Circle
          cx="200"
          cy="200"
          r="58px"
          variants={{
            dark: { r: '90px', fill: '#ffffff' },
            light: { r: '58px', fill: '#333333' },
          }}
          animate={colorMode}
          initial={false}
          transition={{ duration: 0.6 }}
        />
        <Circle
          cx="250"
          cy="150"
          r="0px"
          variants={{
            dark: {
              r: '90px',
              cx: 250,
              opacity: 1,
              transition: {
                duration: 0.2,
                type: 'spring',
                stiffness: 50,
                delay: 0.2,
              },
              fill: '#111',
            },
            light: {
              r: '40px',
              cx: 450,
              opacity: 0,
              transition: { duration: 0.1 },
              fill: '#111',
            },
          }}
          animate={animateValue}
          initial={false}
        />
      </motion.svg>
    </label>
  );
};

export default AnimatedDarkModeToggler;
