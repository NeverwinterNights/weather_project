import themes, { ThemeTypes } from '../../theme/schema';

import useLocalStorage from './useLocalStorage.hook';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useTheme = theme => {
  const [currentTheme, setCurrentTheme] = useLocalStorage(
    'current-theme',
    theme || themes.data[ThemeTypes.light],
  );
  return [currentTheme, setCurrentTheme];
};

export default useTheme;
