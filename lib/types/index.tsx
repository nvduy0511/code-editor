export interface IRank {
    userName: string;
    status: boolean;
    language: string;
    testCasePass: number;
    time: string;
}

export interface IHistory {
    timeSubmit: string;
    language: string;
    testCasePass: number;
    status: boolean;
}
