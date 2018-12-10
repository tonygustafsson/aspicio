import React from 'react';
import withRoot from '../withRoot';

const offlineModalStyle = {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(255, 255, 255, 0.75)'
};

const textOfflineStyle = {
    position: 'absolute',
    top: 'calc(50% - 1em)',
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    textTransform: 'uppercase',
    fontSize: '5vw',
    textShadow: '0 0 20px rgba(0, 0, 0, 0.75)'
};

const Connectivity = ({ isAuthenticated, isOnline, services }) => {
    if (!isAuthenticated) {
        return (
            <div style={offlineModalStyle}>
                <strong style={textOfflineStyle}>Not authenticated.</strong>
            </div>
        );
    }

    if (!isOnline) {
        return (
            <div style={offlineModalStyle}>
                <strong style={textOfflineStyle}>Client is offline.</strong>
            </div>
        );
    }

    if ((!services.offline || services.offline.length < 1) && (!services.online || services.online.length < 1)) {
        return (
            <div style={offlineModalStyle}>
                <strong style={textOfflineStyle}>Server is silent. Waiting...</strong>
            </div>
        );
    }

    return <div />;
};

export default withRoot(Connectivity);
