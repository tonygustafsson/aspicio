import React from 'react';
import moment from 'moment';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

let locale = require('moment/locale/sv');
moment.locale('sv', locale);

const Services = ({ heading, services, isLoading }) => {
    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!services || services.length < 1) {
        return <div />;
    }

    return (
        <div className="container pt-5 pb-5">
            <div className="row">
                {services.map(service => (
                    <Card className="col-3" key={service.id}>
                        <CardImg top width="100%" src="img/server.png" />
                        <CardBody>
                            <CardTitle>{service.name + ' (' + service.requestTime + 'ms)'}</CardTitle>
                            <CardSubtitle>{moment(service.time).format('LLLL')}</CardSubtitle>
                            <CardText>Yada yada yada yada.</CardText>
                            <Button>More info</Button>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Services;
