import React from 'react';
import TopBar from "../components/TopBar";
import LeftBar from "../components/LeftBar";
import StreamList from "../components/StreamList";

const Streams = () => {

    return (
        <div>
            <TopBar/>
            <main>
                <LeftBar/>
                <div className='main'>
                    <StreamList />
                </div>
            </main>
        </div>
    );
};

export default Streams;