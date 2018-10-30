import React from 'react';

const Status = ({ items, hasError, isLoading }) => {
    if (hasError) {
        return <p>Sorry! There was an error loading the items.</p>;
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!items.onlineServices) {
        return <p>No online services.</p>;
    }

    return (
        <div>
            <h1>My statuses</h1>

            {items.onlineServices.map(item => (
                <div key={item.id}>
                    <p>
                        {item.name} Up: {item.time}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Status;
