import {createTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const THEME = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#fff',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
    }
});

export default THEME