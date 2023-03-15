import React, {useEffect, useState} from 'react';
import Item from "./Item";
import {Line} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {IData, IGraphic, IItem} from "../interfaces";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const Main = () => {

    const [graphic, setGraphic] = useState<IGraphic[]>([]);

    let sock: any = null;
    let wsuri = "ws://localhost:8080/ws/";

    useEffect(() => {
        sock = new WebSocket(wsuri);

        sock.onopen = function() {
            console.log("connected to " + wsuri);
        }

        sock.onclose = function(e: any) {
            console.log("connection closed (" + e.code + ")");
        }

        sock.onmessage = function(e: any) {
            const dataMessage: IData = JSON.parse(e.data);
            if (dataMessage.type === 'statistic') {
                let graphics = graphic;
                graphics.push(dataMessage.message)
                setGraphic(graphics);
                let itemsData = [...items];
                itemsData[0].count = dataMessage.message.consumers;
                itemsData[1].count = dataMessage.message.streams;
                itemsData[2].count = dataMessage.message.messages;
                let bt: number | string = dataMessage.message.bytes;
                if (bt > 1024) {
                    bt = Math.round(bt / 1024) + ' kb';
                    if (parseInt(bt) > 1024) {
                        bt = Math.round(parseInt(bt) / 1024) + ' mb';
                    }
                }
                itemsData[3].count = bt;
                setItems(itemsData);
            }
        }
    }, [])

    window.onload = function() {
        console.log("onload");
    }

    const ITEMS = [
        {text: 'Consumers', count: '?', sub_text: 'total consumers'},
        {text: 'Streams', count: '?', sub_text: 'total streams'},
        {text: 'Messages', count: '?', sub_text: 'total messages'},
        {text: 'Bytes', count: '?', sub_text: 'total bytes'},
    ];

    const [items, setItems] = useState<IItem[]>(ITEMS);

    const itemsBlock = items.map(function (item, index) {
        return (
          <Item
              text={item.text}
              count={item.count}
              sub_text={item.sub_text}
              key={index.toString()}
          />
        );
    });

    const labels = graphic.map(function (message, index) {
        let date = new Date(message.time * 1000);
        let hours: number | string = date.getHours();
        if (hours < 10) {
            hours = '0' + hours;
        }
        let minutes: number | string = date.getMinutes();
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        let seconds: number | string = date.getSeconds();
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        return hours + ':' + minutes + ':' + seconds;
    })

    const data = {
        labels,
        datasets: [
            {
                label: 'bytes',
                data: graphic.map(function(message)  {
                    return message.bytes;
                }),
                borderColor: 'rgb(173,97,245)',
                backgroundColor: 'rgba(147,53,235,0.5)',
            },
            {
                label: 'streams',
                data: graphic.map(function(message)  {
                    return message.streams;
                }),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'messages',
                data: graphic.map(function(message)  {
                    return message.messages;
                }),
                borderColor: 'rgb(53,235,77)',
                backgroundColor: 'rgba(53,235,111,0.5)',
            },
            {
                label: 'consumers',
                data: graphic.map(function(message)  {
                    return message.consumers;
                }),
                borderColor: 'rgb(235,211,53)',
                backgroundColor: 'rgba(235,150,53,0.5)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <div className='main'>
            <div className="grid">
                {itemsBlock}
            </div>
            <div className="new_messages">
                <div className="new_messages__title">New messages </div>
                <div className="new_messages__content">
                    <Line options={options} data={data} />
                </div>
            </div>
        </div>
    );
};

export default Main;
