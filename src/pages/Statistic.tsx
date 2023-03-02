import React from 'react';
import TopBar from "../components/TopBar";
import LeftBar from "../components/LeftBar";
import Main from "../components/Main";

const Statistic = () => {
    return (
        <div>
            <TopBar/>
            <main>
                <LeftBar/>
                <Main/>
            </main>
        </div>
    );
};

export default Statistic;