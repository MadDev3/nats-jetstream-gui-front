import React from 'react';
import {useNavigate} from "react-router-dom";
import {IStream} from "../interfaces";

const StreamItem = (props: IStream) => {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(`/stream_info/${props.name}`)} className='stream'>
            <div className="stream__name">{props.name}</div>
            <div className="stream__messages">{props.messages}</div>
        </button>
    );
};

export default StreamItem;