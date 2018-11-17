import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import grey from '@material-ui/core/colors/grey';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: pink[300],
            main: pink[500],
            dark: pink[700]
        },
        secondary: {
            light: grey[300],
            main: grey[500],
            dark: grey[700]
        }
    },
    typography: {
        useNextVariants: true
    },
    overrides: {
        MuiPaper: {
            root: {
                width: '80%',
                margin: '20px 10%'
            }
        },
        MuiGridListTile: {
            root: {
                width: '20%',
                padding: '10px',
                height: '400px'
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
