import React from 'react';
import { connect } from 'react-redux';
import { itemsFetchData } from '../actions';

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    dispatch(itemsFetchData());

    return {};
};

const Component = () => {
    return <div />;
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);
