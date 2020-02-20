// @flow

import { connect } from 'react-redux';
import Errors from '../components/Errors';
import type { ErrorType } from '../types';

type StateType = {
    isAuthenticated: boolean,
    errors: Array<ErrorType>
};

const mapStateToProps = (state: StateType) => {
    return {
        isAuthenticated: state.isAuthenticated,
        errors: state.errors
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Errors);
