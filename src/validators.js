import React from 'react';

export const required = (value, props) => {
    if (!value.toString().trim().length) {
        return `${props.name} is required!`;
    }
};
