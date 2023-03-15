import React, {useEffect, useState} from 'react';
import TopBar from "../components/TopBar";
import LeftBar from "../components/LeftBar";
import {useParams} from "react-router-dom";
import {IMessage, IReadOptions, IStreamInfo} from "../interfaces";
import ReadSendMessage from "../components/ReadSendMessage";
import {CONSTANTS} from "../config";

const StreamInfoPage = () => {

    const [subjects, setSubjects] = useState<string[]>(['subj']);
    const [message, setMessage] = useState<IMessage>();
    const [stream, setStream] = useState<IStreamInfo>(
        {
            "config": {
                "name":"ins-ca",
                "subjects":["ins-ca.\u003e"],
                "retention":"workqueue",
                "max_consumers":-1,
                "max_msgs":-1,
                "max_bytes":-1,
                "discard":"old",
                "max_age":0,
                "max_msgs_per_subject":-1,
                "max_msg_size":1048576,
                "storage":"file",
                "num_replicas":1,
                "duplicate_window":120000000000,
                "allow_direct":false,
                "mirror_direct":false
            },
            "created":"2023-02-21T14:49:35.423283761Z",
            "state": {
                "messages":0,
                "bytes":0,
                "first_seq":1,
                "first_ts":"1970-01-01T00:00:00Z",
                "last_seq":0,
                "last_ts":"0001-01-01T00:00:00Z",
                "consumer_count":1,
                "deleted":null,
                "num_deleted":0,
                "num_subjects":0,
                "subjects":null
            }
        }
    );

    function showSpoiler(index: number) {
        let spoilersArr = [...spoilersShow];
        spoilersArr[index] = !spoilersArr[index];
        setSpoilersShow(spoilersArr);
    }

    const readMessage = (options: IReadOptions) => {
        fetch(`${CONSTANTS.domain + CONSTANTS.read}?subject=${options.subject}`)
            .then(response => response.json())
            .then(message => {
                if (message.error) {
                    return;
                }
                setMessage(message.response);
            });
    }

    const sendMessage = (options: IReadOptions) => {
        fetch(`${CONSTANTS.domain + CONSTANTS.read}?subject=${options.subject}&message=${options.message}`)
            .then(response => response.json())
            .then(message => {
                console.log(message);
            });
    }

    const spoilers = [
        {title: 'Information', content: <pre>{JSON.stringify(stream, null, 2)}</pre>},
        {title: 'Read message', content: <ReadSendMessage readSendMessage={readMessage} messageData={message?.data} subjects={subjects} dropdown={true} type={'Read'} />},
        {title: 'Send message', content: <ReadSendMessage dropdown={false} type={'Send'} />},
    ]
    const [spoilersShow, setSpoilersShow] = useState([false, false, false]);
    const spoilerList = spoilers.map(function (spoiler, index) {
        return (
            <div key={index}>
                <button onClick={() => showSpoiler(index)} className={index === 0 ? 'spoiler' : 'spoiler spoiler-border'}>
                    <span>{spoiler.title}</span>
                    <div className={spoilersShow[index] ? 'arrow arrow-show' : 'arrow'}>
                        <svg className="svg" viewBox="0 0 400 400">
                            <path
                                d="M235.15 263.97c3.05,3.05 3.05,7.99 0,11.03 -3.05,3.05 -7.99,3.05 -11.03,0l-75.01 -75 75.01 -75.01c3.04,-3.04 7.98,-3.04 11.03,0 3.05,3.05 3.05,7.99 0,11.04l-63.97 63.97 63.97 63.97z"/>
                        </svg>
                    </div>
                </button>
                {spoilersShow[index] &&
                    <div className="spoiler__content">{spoiler.content}</div>
                }
            </div>
        );
    })

    const params = useParams();

    useEffect(() => {
        fetch(`${CONSTANTS.domain + CONSTANTS.streamInfo}?stream=${params.streamName}`)
            .then(response => response.json())
            .then(stream => {
                if (stream.error) {
                    return;
                }
                let subjects = stream.response.config.subjects;
                setSubjects(subjects);
                setStream(stream.response);
            });
    }, [params.streamName])

    return (
        <div>
            <TopBar/>
            <main>
                <LeftBar/>
                <div className='main'>
                    <div className="spoiler-group">
                    {spoilerList}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StreamInfoPage;
