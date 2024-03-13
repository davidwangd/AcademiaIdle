import { Action } from './action';
import { User } from './user'; 
export class Level {
    id: number;
    title: string;
    actions: Action[];         // 可以选择的行动。

    actionTopo: [number, number, number][]; // 行动的依赖关系。

    constructor(id: number, title: string, actions: Action[], timeLimit: number, actionTopo: [number, number, number][]) {
        this.id = id;
        this.title = title;
        this.actions = actions;
        this.actionTopo = actionTopo;
    }

    findActionWithId(id: number) : Action {
        for (let action of this.actions) {
            if (action.id == id) return action;
        }
        throw new Error("No such action");
    }

    getAvailableAction(user: User) : Action[] {
        var ret: Action[] = [];
        var failed: number[] = [];
        for (let condition of this.actionTopo)
            if (user.actionStatus[condition[0]] < condition[2])
                failed.push(condition[1]);   
        for (let action of this.actions)
            if (failed.indexOf(action.id) == -1)
                ret.push(action);    
        return ret;
    }

    getActableAction(user: User) : Action[] {
        let ret = this.getActableAction(user);
        return ret.filter((action) => {
            let [can, _] = action.canAction(user);
            return can;
        });
    }
}