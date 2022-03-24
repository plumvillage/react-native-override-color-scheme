export interface Theme {
  colors: {
    text: string;
    background: string;
  };
  isDark: boolean;
}

const themes: {
  light: Theme;
  dark: Theme;
} = {
  light: {
    colors: {
      text: '#000',
      background: '#fff',
    },
    isDark: false,
  },
  dark: {
    colors: {
      text: '#fff',
      background: '#000',
    },
    isDark: true,
  },
};

export default themes;
