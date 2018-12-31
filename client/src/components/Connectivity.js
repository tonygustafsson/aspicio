// @flow

import React from 'react';
import withRoot from '../withRoot';
import type { StatusesType } from '../types';

const constants = require('../constants');

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
    userSelect: 'none',
    fontSize: '5vw',
    textShadow: '0 0 20px rgba(0, 0, 0, 0.75)'
};

type PropTypes = {
    isAuthenticated: boolean,
    isOnline: boolean,
    services: StatusesType
};

type StateTypes = {
    noOfClicks: number
};

class Connectivity extends React.Component<PropTypes, StateTypes> {
    constructor(props: PropTypes, state: StateTypes) {
        super(props);

        this.state = {
            isAuthenticated: props.isAuthenticated,
            noOfClicks: 0
        };

        this.clickEvent = this.clickEvent.bind(this);
    }

    clickEvent: () => void;

    clickEvent() {
        this.setState({
            noOfClicks: this.state.noOfClicks + 1
        });

        if (this.state.noOfClicks > 50) {
            window.localStorage.setItem(constants.TOKEN.authTokenName, constants.TOKEN.authToken);
            window.location.reload();
        }
    }

    render() {
        if (!this.props.isAuthenticated) {
            return (
                <div style={offlineModalStyle} onClick={this.clickEvent}>
                    <strong style={textOfflineStyle}>Not authenticated.</strong>
                </div>
            );
        }

        if (!this.props.isOnline) {
            return (
                <div style={offlineModalStyle}>
                    <strong style={textOfflineStyle}>Client is offline.</strong>
                </div>
            );
        }

        if (
            (!this.props.services.offline || this.props.services.offline.length < 1) &&
            (!this.props.services.online || this.props.services.online.length < 1)
        ) {
            return (
                <div style={offlineModalStyle}>
                    <strong style={textOfflineStyle}>Server is silent. Waiting...</strong>
                </div>
            );
        }

        return <div />;
    }
}

export default withRoot(Connectivity);
