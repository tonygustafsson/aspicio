import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import pink from '@material-ui/core/colors/pink';
import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
    spacing: 4,
    palette: {
        primary: {
            main: green[500]
        },
        secondary: {
            main: pink[500]
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

export default theme;
