import React from 'react';
import Navigation from './config/Navigation';
import {AuthProvider} from './context/AuthContext';

export default () => {

    return (
        <AuthProvider>
            <Navigation/>
        </AuthProvider>
    );
};


