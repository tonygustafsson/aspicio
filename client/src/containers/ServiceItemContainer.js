// @flow

import React from 'react';
import ServiceItem from '../components/ServiceItem';
import type { ServiceType } from '../types';

type PropType = {
    service: ServiceType
};

type StateType = {
    modalIsOpen: boolean
};

class ServiceItemContainer extends React.Component<PropType, StateType> {
    constructor(props: PropType, state: StateType) {
        super(props);

        this.state = {
            modalIsOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal: () => void;

    toggleModal() {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        });
    }

    render() {
        return <ServiceItem service={this.props.service} modalIsOpen={this.state.modalIsOpen} toggleModal={this.toggleModal} />;
    }
}

export default ServiceItemContainer;
