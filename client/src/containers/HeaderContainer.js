// @flow

import { connect } from 'react-redux';
import Header from '../components/Header';

const mapStateToProps = state => {
    return {
        isAuthenticated: state.isAuthenticated,
        hasErrors: state.data && state.data.status && state.data.status.offline && state.data.status.offline.length > 0
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
