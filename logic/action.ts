import { MONEY, RESEARCH_POINT, SAN } from './common';
import { IUser } from './user';

export class Action  {
    id: number;
    title: string;
    isInstance: boolean;
    maxLevel: number;
    timeLimit: number;
    modifier: ((origin:number, level:number)=>number | number)[];
    sideEffect: ((user: IUser) => IUser)[];
    sanEffect: ((san:number) => number) | null; 
    
    constructor(id: number, title: string, isInstance: boolean, maxLevel: number, timeLimit: number, modifier: ((origin:number, level:number)=>number | number)[], sideEffect: ((user: IUser) => IUser)[], sanEffect: ((san:number) => number) | null) {
        this.id = id;
        this.title = title;
        this.isInstance = isInstance;
        this.maxLevel = maxLevel;
        this.timeLimit = timeLimit
        this.modifier = modifier;
        this.sideEffect = sideEffect;
        this.sanEffect = sanEffect;
    }

    canAction(user: IUser) : [boolean, number] {
        let array:number[] = [RESEARCH_POINT, MONEY, SAN];
        for (let i of array) {
            const modifier = this.modifier[i];
            if (modifier instanceof Number) {
                let modi = modifier as unknown as number;
                if (user.costStatus[i] + modi < 0) return [false, i];
            } else {
                let modi = modifier as unknown as (origin:number, level:number)=>number;
                if (modi(user.costStatus[i], user.actionStatus[this.id]) < 0) return [false, i];
            }
        }
        return [true, 0];
    }

    takeAction(user: IUser) : IUser {
        let ret = user;
        for (let i of [RESEARCH_POINT, MONEY, SAN]){
            let modifier = this.modifier[i];
            if (modifier instanceof Number) {
                let modi = modifier as unknown as number;
                ret.costStatus[i] += modi;
            } else {
                let modi = modifier as unknown as (origin:number, level:number)=>number;
                ret.costStatus[i] += modi(ret.costStatus[i], ret.actionStatus[this.id]);
            }
        }
        if (this.sideEffect) {
            for (let effect of this.sideEffect) {
                ret = effect(ret);
            }
        }
        return ret;
    }
}