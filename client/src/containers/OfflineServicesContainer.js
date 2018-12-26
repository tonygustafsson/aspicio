// @flow

import { connect } from 'react-redux';
import Services from '../components/Services';
import type { StatusesType } from '../types';

type StateType = {
    isAuthenticated: boolean,
    status: StatusesType
};

const mapStateToProps = (state: StateType) => {
    return {
        isAuthenticated: state.isAuthenticated,
        services: state && state.status && state.status.offline ? state.status.offline : [],
        heading: 'Offline services'
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Services);
