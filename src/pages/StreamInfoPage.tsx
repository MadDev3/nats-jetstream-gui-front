import React, {useEffect, useState} from 'react';
import TopBar from "../components/TopBar";
import LeftBar from "../components/LeftBar";
import {useParams} from "react-router-dom";
import {IMessage, IReadOptions, IStreamInfo} from "../interfaces";
import ReadSendMessage from "../components/ReadSendMessage";
import {CONSTANTS} from "../config";
import ConsumerItem from "../components/ConsumerItem";
import Preloader from "../components/Preloader";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

interface IConsumerInfo {
    name: string;
    info: any;
}

const StreamInfoPage = () => {

    const params = useParams();

    const [subjects, setSubjects] = useState<string[]>(['subj']);
    const [message, setMessage] = useState<IMessage>();
    const [messageContent, setMessageContent] = useState('');
    const [data, setData] = useState('');
    const [stream, setStream] = useState<IStreamInfo>();
    const [consumers, setConsumers] = useState<IConsumerInfo[]>([]);
    const [preloader, setPreloader] = useState<any>('Send');
    const [isDisable, setIsDisable] = useState(false);
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');

    function showSpoiler(index: number) {
        let spoilersArr = [...spoilersShow];
        spoilersArr[index] = !spoilersArr[index];
        setSpoilersShow(spoilersArr);
    }

    const deleteConsumer = (name: string) => {
        let searchConsumer = consumers.find(consumer => consumer.name === name);
        if (!searchConsumer) {
            return;
        }
        let index = consumers.indexOf(searchConsumer)
        if (index === -1) {
            return
        }
        let arr = [...consumers];
        arr.splice(index, 1);
        setConsumers(arr);
    }

    const readMessage = (options: IReadOptions) => {
        fetch(`${CONSTANTS.domain + CONSTANTS.read}?subject=${options.subject}`)
            .then(response => response.json())
            .then(message => {
                console.log(message)
                if (message.error) {
                    setMessageContent('Error: ' + message.error);
                    return;
                }
                setMessageContent(message.response.data)
                setMessage(message.response);
            });
    }

    const sendMessage = (options: IReadOptions) => {
        setPreloader(<Preloader />);
        setIsDisable(true);
        let form = new FormData();
        form.append('subject', options.subject);
        form.append('data', data);
        fetch(`${CONSTANTS.domain + CONSTANTS.send}`, {
            method: 'POST',
            body: form
        })
            .then(response => response.json())
            .then(message => {
                if (message.error) {
                    setShow(true);
                    setError(message.error)
                }
                setIsDisable(false);
                setPreloader('Send');
            });
    }

    const consumersList = consumers.map(function (consumerName, index) {
        return (
            <ConsumerItem
                deleteConsumer={deleteConsumer}
                streamName={params.streamName}
                key={index}
                consumerName={consumerName.name}
                consumerInfo={consumerName.info}
            />
        )
    })

    const setDataMessage = (value: string) => {
        setData(value);
    }

    const spoilers = [
        {title: 'Information', content: <pre>{JSON.stringify(stream, null, 2)}</pre>},
        {title: 'Read message', content: <ReadSendMessage
                setData={setDataMessage}
                readSendMessage={readMessage}
                messageData={messageContent}
                subjects={subjects}
                dropdown={true}
                type={'Read'}
                btnContent={'Read'}
            />},
        {title: 'Send message', content: <ReadSendMessage
                setData={setDataMessage}
                readSendMessage={sendMessage}
                messageData={data}
                dropdown={false}
                type={'Send'}
                btnContent={preloader}
                isDisable={isDisable}
            />},
        {title: 'Consumers', content: consumersList},
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
        fetch(`${CONSTANTS.domain + CONSTANTS.consumers}?stream=${params.streamName}`)
            .then(response => response.json())
            .then(consumers => {
                if (consumers.error) {
                    return
                }
                let consumersInfo: IConsumerInfo[] = [];
                consumers.response.forEach(function (consumer: any, i: number) {
                    let consumerInfo = {
                        name: consumer.name,
                        info: consumer
                    }
                    consumersInfo.push(consumerInfo);
                });
                setConsumers([...consumersInfo]);
            })
    }, [params.streamName])

    return (
        <div>
            <TopBar/>
            <main>
                <LeftBar/>
                <div className='main'>
                    {show &&
                        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                            <Alert.Heading>You got an error!</Alert.Heading>
                            <p>{error}</p>
                        </Alert>
                    }
                    <div className="spoiler-group">
                    {spoilerList}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StreamInfoPage;
