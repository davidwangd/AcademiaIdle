import {Paper} from './paper';

export interface IUser {
    costStatus: number[];
    time: number;
    level: number;
    actionStatus: number[];
    currentAction: number;
    paperStatus: Paper[];
};
