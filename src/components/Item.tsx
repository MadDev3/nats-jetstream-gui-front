import React from 'react';
import {IItem} from "../interfaces";

const Item = (props: IItem) => {
    return (
        <div className='item'>
            <div className="item__top">{props.text}</div>
            <div className="item__content">
                <div className="item__count">{props.count}</div>
                <div className="item__text">{props.sub_text}</div>
            </div>
        </div>
    );
};

export default Item;