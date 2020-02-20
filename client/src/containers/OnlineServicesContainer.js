// @flow

import { connect } from 'react-redux';
import Services from '../components/Services';
import type { ServicesType } from '../types';

type StateType = {
    isAuthenticated: boolean,
    status: ServicesType
};

const mapStateToProps = (state: StateType) => {
    return {
        isAuthenticated: state.isAuthenticated,
        services: state && state.status && state.status.online ? state.status.online : [],
        heading: 'Online services',
        type: 'online'
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Services);
