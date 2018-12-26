// @flow

import { connect } from 'react-redux';
import Connectivity from '../components/Connectivity';
import type { StatusesType } from '../types';

type StateType = {
    isAuthenticated: boolean,
    isOnline: boolean,
    services: StatusesType
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.isAuthenticated,
        isOnline: state.isOnline,
        services: state.data && state.data.status ? state.data.status : []
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Connectivity);
