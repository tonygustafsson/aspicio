import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import pink from '@material-ui/core/colors/pink';
import grey from '@material-ui/core/colors/grey';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: green[300],
            main: green[500],
            dark: green[700]
        },
        secondary: {
            light: pink[300],
            main: pink[500],
            dark: pink[700]
        }
    },
    typography: {
        useNextVariants: true
    },
    overrides: {
        MuiPaper: {
            root: {
                width: '90%',
                margin: '20px 5%'
            }
        },
        MuiGridListTile: {
            root: {
                width: '20%',
                padding: '10px',
                margin: '10px',
                height: '350px',
                border: `1px ${grey[300]} solid`
            }
        },
        MuiTypography: {
            root: {
                padding: '0.5em 1em'
            }
        }
    }
});

function withRoot(Component) {
    function WithRoot(props) {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...props} />
            </MuiThemeProvider>
        );
    }

    return WithRoot;
}

export default withRoot;
