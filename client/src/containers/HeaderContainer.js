// @flow

import { connect } from 'react-redux';
import Header from '../components/Header';
import type { StatusesType } from '../types';

type StateType = {
    isAuthenticated: boolean,
    status: StatusesType
};

const mapStateToProps = (state: StateType) => {
    return {
        isAuthenticated: state.isAuthenticated,
        hasErrors: state && state.status && state.status.offline && state.status.offline.length > 0
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
