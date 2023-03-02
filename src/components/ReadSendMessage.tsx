import React, {useState} from 'react';
import {Dropdown} from "react-bootstrap";
import {IReadSendMessage} from "../interfaces";

const ReadSendMessage = (props: IReadSendMessage) => {

    const [subject, setSubject] = useState('');

    const subjectList = props.subjects?.map(function (name, index) {
        return (
            <Dropdown.Item key={index} onClick={() => setSubject(name)}>{name}</Dropdown.Item>
        );
    });

    return (
        <div className='read_message'>
            <label htmlFor='subject'>Subject:</label>
            <div className="read_inputs">
                {props.dropdown &&
                    <Dropdown>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">

                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {subjectList}
                        </Dropdown.Menu>
                    </Dropdown>
                }
                <input
                    onChange={(e) => setSubject(e.target.value)}
                    value={subject}
                    className="read_input"
                    placeholder='Enter subject...'
                    id='subject'
                />
                <input
                    onClick={() => props.readSendMessage?.({'subject': subject})}
                    className="read_btn"
                    type={"button"}
                    value={props.type}
                />
            </div>
            <label htmlFor='message'>Message (in base64):</label>
            <textarea value={props.messageData} readOnly={props.type === 'Read'} className='read_text' rows={4} id='message'>

            </textarea>
        </div>
    );
};

export default ReadSendMessage;