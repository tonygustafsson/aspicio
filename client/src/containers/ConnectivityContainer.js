// @flow

import { connect } from 'react-redux';
import Connectivity from '../components/Connectivity';
import type { ServicesType } from '../types';

type StateType = {
    isAuthenticated: boolean,
    isOnline: boolean,
    status: ServicesType
};

const mapStateToProps = (state: StateType) => {
    return {
        isAuthenticated: state.isAuthenticated,
        isOnline: state.isOnline,
        services: state && state.status ? state.status : []
    };
};

const mapDispatchToProps = (dispatch: function) => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Connectivity);
