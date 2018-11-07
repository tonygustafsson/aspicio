import React from 'react';
import moment from 'moment';
import ServiceItemContainer from '../containers/ServiceItemContainer';

let locale = require('moment/locale/sv');
moment.updateLocale('sv', locale);

const Services = ({ services, isLoading }) => {
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
                    <ServiceItemContainer key={service.id} service={service} modalIsOpen={false} />
                ))}
            </div>
        </div>
    );
};

export default Services;
