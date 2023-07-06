import React, {useEffect, useState} from 'react';
import {CONSTANTS} from "../config";
import Arrow from "./Arrow";
import Accordion from 'react-bootstrap/Accordion';

interface IConsumer {
    consumerName: string;
    streamName: string | undefined;
    consumerInfo: string;
    deleteConsumer: (name: string) => void;
}

const ConsumerItem = (props: IConsumer) => {

    const [isShow, setIsShow] = useState(false);

    const setShow = () => {
      setIsShow(!isShow);
    }

    const deleteConsumer = () => {
        fetch(`${CONSTANTS.domain + CONSTANTS.deleteConsumers}?stream=${props.streamName}&consumer=${props.consumerName}`)
            .then(response => response.json())
            .then(response => {
                if (response.error) {
                    return;
                }
                props.deleteConsumer(props.consumerName);
            })
    }

    return (
        <div>
            <div className='consumer'>
                <div>{props.consumerName}</div>
                <div className={'d-flex align-items-center'}>
                    <Arrow isShow={isShow} show={setShow} width={50} />
                    <div className='cross' onClick={() => deleteConsumer()}>
                        <svg fill="#FF4F4F"
                             className="bi bi-trash" viewBox="0 0 16 16">
                            <path
                                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path
                                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </div>
                </div>
            </div>
            {isShow && <div className={'consumer-info'}><pre>{JSON.stringify(props.consumerInfo, null, 2)}</pre></div> }
        </div>
    );
};

export default ConsumerItem;
