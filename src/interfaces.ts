import {ReactElement, ReactHTML} from "react";

export interface IMessage {
    subject: string;
    data: string;
    header: { 'Nats-Msg-Id': string; };
}

export interface IStream {
    name: string;
    messages: number;
}

export interface IItem {
    text: string;
    count: number | string;
    sub_text: string;
}

export interface IGraphic {
    bytes: number;
    consumers: number;
    messages: number;
    streams: number;
    time: number;
}

export interface IData {
    type: string;
    message: IGraphic;
}

export interface IConfig {
    name: string;
    subjects: string[];
    retention: string;
    max_consumers: number;
    max_msgs: number;
    max_bytes: number;
    discard: string;
    max_age: number;
    max_msgs_per_subject: number;
    max_msg_size: number;
    storage: string;
    num_replicas: number;
    duplicate_window: number;
    allow_direct: boolean;
    mirror_direct: boolean;
}

export interface IState {
    messages: number;
    bytes: number;
    first_seq: number;
    first_ts: string;
    last_seq: number;
    last_ts: string;
    consumer_count: number;
    deleted: null;
    num_deleted: number;
    num_subjects: number;
    subjects: null;
}

export interface IStreamInfo {
    config: IConfig;
    created: string;
    state: IState;
}

export interface IReadSendMessage {
    dropdown: boolean;
    type: string;
    btnContent?: string | ReactElement;
    subjects?: string[];
    messageData?: string;
    readSendMessage?: (options: IReadOptions) => void;
    setData: (value: string) => void;
    isDisable?: boolean;
}

export interface IReadOptions {
    subject: string;
    message?: string;
}

export interface IArrow {
    width: number;
    isShow: boolean;
    show?: () => void;
}
