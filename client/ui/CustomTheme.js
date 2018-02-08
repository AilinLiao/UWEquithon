import { createMuiTheme } from 'material-ui/styles';

export const theme = createMuiTheme({
    palette: {
        primary: {
            50: '#ebf0fd',
            100: '#cedafa',
            200: '#adc1f6',
            300: '#8ca8f2',
            400: '#7395f0',
            500: '#5a82ed', // Remember to update the MuiButton override if this changes.
            600: '#527aeb',
            700: '#486fe8',
            800: '#3f65e5',
            900: '#2e52e0',
            A100: '#ffffff',
            A200: '#eff2ff',
            A400: '#bcc8ff',
            A700: '#a2b3ff',
            'contrastDefaultColor': 'dark',
        },
        secondary: {
            50: '#eeeeee',
            100: '#d6d6d6',
            200: '#bababa',
            300: '#9e9e9e',
            400: '#8a8a8a',
            500: '#757575',
            600: '#6d6d6d',
            700: '#626262',
            800: '#585858',
            900: '#454545',
            A100: '#e2e9fc',
            A200: '#dbe4fb',
            A400: '#d5dffa',
            A700: '#d0dbf9',
            'contrastDefaultColor': 'light',
        },
    },
});
