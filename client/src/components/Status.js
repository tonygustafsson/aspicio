import React from 'react';

const Status = (items, hasError, isLoading) => {
    if (hasError) {
        return <p>Sorry! There was an error loading the items.</p>;
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>My statuses</h1>

            {items.map(item => (
                <div key={item.id}>
                    <p>{item.name}</p>
                </div>
            ))}
        </div>
    );
};

export default Status;
