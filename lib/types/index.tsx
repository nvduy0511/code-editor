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

export type resCode = {
    success: string;
    timestamp: string;
    output: string;
    language: string;
    version: string;
    error: string;
};
