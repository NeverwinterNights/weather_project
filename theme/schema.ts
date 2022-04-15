type Object = Record<string, any>;

export enum ThemeTypes {
  light = 'Light',
  seaWave = 'Sea Wave',
}

export interface ITheme {
  name: ThemeTypes;
  colors: {
    button: Object;
    body: Object;
  };
}

export interface IThemeSchema {
  data: {
    [key in ThemeTypes]: ITheme;
  };
}

const schema: IThemeSchema = {
  data: {
    [ThemeTypes.light]: {
      name: ThemeTypes.light,
      colors: {
        button: {
          text: '#000000',
          background: '#FFFFFF',
        },
        body: {
          background: 'red',
        },
      },
    },
    [ThemeTypes.seaWave]: {
      name: ThemeTypes.seaWave,
      colors: {
        button: {
          text: '#4E939B',
          background: '#41D7EA',
        },
        body: {
          background: '#4E939B',
        },
      },
    },
  },
};

export default schema;
