import React from 'react';
import moment from 'moment';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle
} from 'reactstrap';

let locale = require('moment/locale/sv');
moment.updateLocale('sv', locale);

const ServiceItem = ({ service, modalIsOpen, toggleModal }) => {
    return (
        <div className="col-3">
            <Card>
                <CardImg top width="100%" src="img/server.png" />
                <CardBody>
                    <CardTitle>{service.name + ' (' + service.requestTime + 'ms)'}</CardTitle>
                    <CardSubtitle>{moment(service.time).format('LLLL')}</CardSubtitle>
                    <CardText>Yada yada yada yada.</CardText>
                    <Button onClick={toggleModal}>More info</Button>
                </CardBody>
            </Card>

            <Modal isOpen={modalIsOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>{service.name}</ModalHeader>
                <ModalBody>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p>
                        URL: <a href="{ßervice.url}">{service.url}</a>
                        <br />
                        Request time: {service.requestTime} ms
                        <br />
                        {service.error && <span>Last error: {service.error}</span>}
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={toggleModal}>
                        Pause service
                    </Button>{' '}
                    <Button color="secondary" onClick={toggleModal}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default ServiceItem;
