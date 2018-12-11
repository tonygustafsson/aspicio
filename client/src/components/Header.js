import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import FullSceenIcon from '@material-ui/icons/Fullscreen';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

const appBarStyle = hasErrors => {
    return {
        backgroundColor: hasErrors ? red[700] : green[700]
    };
};

const fullSceenIconStyle = {
    position: 'absolute',
    right: '20px'
};

const goFullScreen = () => {
    var elem = document.documentElement;

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
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

                    <IconButton style={fullSceenIconStyle} color="inherit" aria-label="Menu">
                        <FullSceenIcon onClick={e => goFullScreen()} />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Grid>
    );
};

export default Header;
