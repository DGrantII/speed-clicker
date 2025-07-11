import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';

const Root = () => {
    return (
        <>
            <Navigation />
            <div className="row justify-content-center">
                <Outlet />
            </div>
        </>
    )
}

export default Root;
