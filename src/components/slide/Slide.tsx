import React from 'react';

import { useSelector } from 'react-redux';
import { animated, useTransition } from 'react-spring';

import { AppRootStateType } from '../../state/store';
import { Overlay } from '../overlay/Overlay';

import style from './Slide.module.scss';
import { SlideMenu } from './slideMenu/SlideMenu';
import { SlidePropsType } from './types';

export const Slide = React.memo(({ open, setThemeMenuActive }: SlidePropsType) => {
  const slideOpen = useSelector<AppRootStateType, boolean>(
    state => state.appReducer.slideOpen,
  );

  const transitions = useTransition(slideOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: slideOpen,
    config: { mass: 1, tension: 280, friction: 40 },
  });

  return transitions(
    (styles, item) =>
      item && (
        <animated.div style={styles} className={style.main}>
          <Overlay setThemeMenuActive={setThemeMenuActive} />
          <SlideMenu setThemeMenuActive={setThemeMenuActive} open={open} />
        </animated.div>
      ),
  );
});
