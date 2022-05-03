import React, { CSSProperties } from 'react';

import { useDispatch } from 'react-redux';

import { changeFavoritesAC, changeSlideOpenAC } from '../../state/appReducer';

type OverlayPropsType = {
  setThemeMenuActive: (value: boolean) => void;
};

export const Overlay = React.memo(({ setThemeMenuActive }: OverlayPropsType) => {
  // const [activeCover, setCoverActive] = useState<boolean>(true);
  const dispatch = useDispatch();

  // const slideOpen = useSelector<AppRootStateType, boolean>(
  //   state => state.appReducer.slideOpen,
  // );

  // const favorite = useSelector<AppRootStateType, boolean>(
  //   state => state.appReducer.favorite,
  // );

  const activeStyle: CSSProperties = {
    position: 'absolute',
    top: '-93px',
    left: '11px',
    width: '100%',
    height: '100vw',
    backgroundColor: 'black',
    opacity: '0.3',
  };
  // const defaultStyle: CSSProperties = {
  //   display: 'none',
  // };
  const setCoverActiveHandler = (): void => {
    // setCoverActive(false);
    setThemeMenuActive(false);
    dispatch(changeFavoritesAC(false));
    dispatch(changeSlideOpenAC(false));
  };

  // useEffect(() => {
  //   setCoverActive(slideOpen);
  // }, [slideOpen]);

  // const transitions = useTransition(slideOpen, {
  //   from: { opacity: 0 },
  //   enter: { opacity: 1 },
  //   leave: { opacity: 0 },
  //   reverse: slideOpen,
  //   config: config.molasses,
  // });

  return (
    <div
      tabIndex={0}
      aria-label=" "
      onKeyPress={setCoverActiveHandler}
      role="button"
      onClick={setCoverActiveHandler}
      style={activeStyle}
    />
  );
});
