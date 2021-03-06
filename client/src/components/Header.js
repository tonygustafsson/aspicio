// @flow

import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import LanguageIcon from '@material-ui/icons/Language';
import FullSceenIcon from '@material-ui/icons/Fullscreen';
import VisibiltyIcon from '@material-ui/icons/Visibility';

const green = 'rgb(30, 74, 32)';
const red = 'rgb(128, 18, 18)';

const appBarStyle = hasErrors => {
    return {
        backgroundColor: hasErrors ? red : green,
        color: '#fff',
        margin: 0
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

const logoIconStyle = {
    verticalAlign: 'bottom',
    marginRight: 10,
    width: 32,
    height: 32
};

const goFullScreen = (): void => {
    const elem: any = document.documentElement;

    if (elem === null) return;

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    }
};

const goToGithub = () => {
    window.location.href = 'https://github.com/tonygustafsson/aspicio';
};

const ArePropsEqual = (prevProps, nextProps): boolean => {
    return prevProps.hasErrors === nextProps.hasErrors;
};

type PropTypes = {
    isAuthenticated: boolean,
    hasErrors: boolean
};

const Header = ({ isAuthenticated, hasErrors }: PropTypes) => {
    if (!isAuthenticated) {
        return <div />;
    }

    return (
        <Grid item xs={12}>
            <AppBar style={appBarStyle(hasErrors)} position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        <VisibiltyIcon style={logoIconStyle} />
                        Aspicio
                    </Typography>

                    <IconButton
                        title="Read more about Aspicio on GitHub"
                        style={infoIconStyle}
                        color="inherit"
                        aria-label="Menu"
                        onClick={e => goToGithub()}
                    >
                        <LanguageIcon />
                    </IconButton>

                    <IconButton
                        title="Go fullscreen"
                        style={fullSceenIconStyle}
                        color="inherit"
                        aria-label="Menu"
                        onClick={e => goFullScreen()}
                    >
                        <FullSceenIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Grid>
    );
};

export default React.memo<PropTypes>(Header, ArePropsEqual);
