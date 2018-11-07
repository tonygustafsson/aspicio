import React from 'react';
import ServiceItem from '../components/ServiceItem';

class ServiceItemContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        });
    }

    render() {
        return (
            <ServiceItem
                service={this.props.service}
                modalIsOpen={this.state.modalIsOpen}
                toggleModal={this.toggleModal}
            />
        );
    }
}

export default ServiceItemContainer;
