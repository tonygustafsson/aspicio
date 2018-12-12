import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import LanguageIcon from '@material-ui/icons/Language';
import FullSceenIcon from '@material-ui/icons/Fullscreen';

const green = 'rgb(30, 74, 32)';
const red = 'rgb(128, 18, 18)';

const appBarStyle = hasErrors => {
    return {
        backgroundColor: hasErrors ? red : green
    };
};

const fullSceenIconStyle = {
    position: 'absolute',
    right: '20px'
};

const infoIconStyle = {
    position: 'absolute',
    right: '70px'
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

const goToGithub = () => {
    window.location.href = 'https://github.com/tonygustafsson/aspicio';
};

const Header = ({ isAuthenticated, hasErrors }) => {
    if (!isAuthenticated) {
        return <div />;
    }

    return (
        <Grid item xs={12}>
            <AppBar style={appBarStyle(hasErrors)} position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        Aspicio
                    </Typography>

                    <IconButton
                        title="Read more about Aspicio on GitHub"
                        style={infoIconStyle}
                        color="inherit"
                        aria-label="Menu"
                    >
                        <LanguageIcon onClick={e => goToGithub()} />
                    </IconButton>

                    <IconButton title="Go fullscreen" style={fullSceenIconStyle} color="inherit" aria-label="Menu">
                        <FullSceenIcon onClick={e => goFullScreen()} />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Grid>
    );
};

export default Header;
