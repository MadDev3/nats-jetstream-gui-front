import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";

const LeftBar = () => {
    const [currentLocation, setCurrentLocation] = useState('/');

    const location = useLocation();
    useEffect(() => {
        setCurrentLocation(location.pathname)
    }, [location])
    return (
        <div className='left_bar'>
            <Link to={'/'}>
                <div className={currentLocation === '/' ? 'icon active-icon' : 'icon'}>
                    <svg className="svg" viewBox="0 0 400 400">
                        <path
                            d="M200 100l100 100 0 100 -200 0 0 -100 100 -100zm25 125l0 38 37 0 0 -47 -62 -63 -62 63 0 47 37 0 0 -38 50 0z"/>
                    </svg>
                </div>
            </Link>
            <Link to={'/streams'}>
                <div className={currentLocation === '/streams' ? 'icon active-icon' : 'icon'}>
                    <svg className="svg" viewBox="0 0 400 400">
                        <path
                            d="M278 122l0 156 -156 0 0 -156 156 0 0 0zm12 -22l-180 0c-6,0 -10,4 -10,10l0 180c0,4 4,10 10,10l180 0c4,0 10,-6 10,-10l0 -180c0,-6 -6,-10 -10,-10zm-101 44l67 0 0 23 -67 0 0 -23zm0 45l67 0 0 22 -67 0 0 -22 0 0zm0 44l67 0 0 23 -67 0 0 -23zm-45 -89l23 0 0 23 -23 0 0 -23zm0 45l23 0 0 22 -23 0 0 -22zm0 44l23 0 0 23 -23 0 0 -23z"/>
                    </svg>
                </div>
            </Link>
        </div>
    );
};

export default LeftBar;