import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

const appBarStyle = hasErrors => {
    return {
        backgroundColor: hasErrors ? red[700] : green[700]
    };
};

const Header = ({ isAuthenticated, hasErrors }) => {
    if (!isAuthenticated) {
        return <div />;
    }

    return (
        <Grid item xs={12}>
            <AppBar style={appBarStyle(hasErrors)} position="static">
                <Toolbar>
                    <IconButton color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        Aspicio
                    </Typography>
                </Toolbar>
            </AppBar>
        </Grid>
    );
};

export default Header;
