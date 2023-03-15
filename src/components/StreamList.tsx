import React, {useEffect, useState} from 'react';
import StreamItem from "./StreamItem";
import {IStream} from "../interfaces";
import {CONSTANTS} from "../config";



const StreamList = () => {

    const [streams, setStreams] = useState<IStream[]>([]);

    useEffect(() => {
        fetch(CONSTANTS.domain + CONSTANTS.streams)
            .then(response => response.json())
            .then(list => {
                if (list.error) {
                    return;
                }
                setStreams(list.response);
            })
    }, [])

    const streamList = streams.map(function (stream, index) {
        return (
          <StreamItem key={index} name={stream.name} messages={stream.messages} />
        );
    })

    return (
        <div>
            {streamList}
        </div>
    );
};

export default StreamList;
