// @flow

import React from 'react';
import { connect } from 'react-redux';
import ServiceItem from '../components/ServiceItem';
import { sendServiceState } from '../actions';
import type { ServiceType } from '../types';

type PropType = {
    service: ServiceType,
    toggleServiceState: Function
};

type StateType = {
    modalIsOpen: boolean,
    pauseForSelectValue: number
};

class ServiceItemContainer extends React.PureComponent<PropType, StateType> {
    constructor(props: PropType, state: StateType) {
        super(props);

        this.state = {
            modalIsOpen: false,
            pauseForSelectValue: 0
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.changePauseSelectValue = this.changePauseSelectValue.bind(this);
    }

    toggleModal: () => void;
    changePauseSelectValue: () => void;

    toggleModal() {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        });
    }

    changePauseSelectValue(value: number) {
        this.setState({
            pauseForSelectValue: value
        });
    }

    render() {
        return (
            <ServiceItem
                service={this.props.service}
                modalIsOpen={this.state.modalIsOpen}
                pauseForSelectValue={this.state.pauseForSelectValue}
                toggleModal={this.toggleModal}
                changePauseSelectValue={this.changePauseSelectValue}
                toggleServiceState={this.props.toggleServiceState}
            />
        );
    }
}

const mapStateToProps = (state: StateType) => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        toggleServiceState: (serviceId, pauseForNoOfMinutes) => {
            dispatch(sendServiceState(serviceId, pauseForNoOfMinutes));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ServiceItemContainer);
