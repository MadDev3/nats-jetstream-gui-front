import React from 'react';
import {IArrow} from "../interfaces";

const Arrow = (props: IArrow) => {
    return (
        <div onClick={props.show} className={props.isShow ? 'arrow arrow-show' : 'arrow'} style={{width: `${props.width}px`, height: `${props.width}px`}}>
            <svg className="svg" viewBox="0 0 400 400">
                <path
                    d="M235.15 263.97c3.05,3.05 3.05,7.99 0,11.03 -3.05,3.05 -7.99,3.05 -11.03,0l-75.01 -75 75.01 -75.01c3.04,-3.04 7.98,-3.04 11.03,0 3.05,3.05 3.05,7.99 0,11.04l-63.97 63.97 63.97 63.97z"/>
            </svg>
        </div>
    );
};

export default Arrow;
