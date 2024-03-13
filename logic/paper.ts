export class Paper {
    id: string;
    title: string;
    major: string;
    subject: string;
    time: number;
    rep_ratio: number;
    constructor(id: string, title: string, major: string, subject: string, time: number, rep_ratio: number) {
        this.id = id;
        this.title = title;
        this.major = major;
        this.subject = subject;
        this.time = time;
        this.rep_ratio = rep_ratio;
    }
}