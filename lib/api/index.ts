import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import queryString from 'query-string';
import { resCode } from '../types';
const axiosClient = axios.create({
    baseURL: 'http://localhost:3001/',
    headers: {
        'content-type': 'application/json',
    },

    paramsSerializer: (params) => queryString.stringify(params),
});

axios.interceptors.response.use(
    function (response) {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    function (error) {
        return Promise.reject(error);
    },
);

type reqCode = {
    code: string | undefined;
    language: string;
    input: string;
};

export const apis = {
    getQuestion: (id: any) => {
        const url = `/Exercise/getExercise?id=${id}`;
        return axiosClient.get<string, AxiosResponse<{ type: string }>>(url);
    },
    getTestCase: (id: any) => {
        const url = `/Exercise/getTestCase?id=${id}`;
        return axiosClient.get<string, AxiosResponse<number[]>>(url);
    },
    runCode: (data: reqCode) => {
        const url = `api/compile-code`;
        return axiosClient.post<string, AxiosResponse<resCode>, reqCode>(url, data);
    },
    runCodes: (runCodeRequest: reqCode) => {
        const url = `/Exercise/runCodes`;
        return axiosClient.post<string, AxiosResponse<number[]>, reqCode>(url, runCodeRequest);
    },
    submitCode: (runCodeRequest: reqCode) => {
        const url = `/Exercise/submitCode`;
        return axiosClient.post<reqCode, AxiosResponse<number[]>, reqCode>(url, runCodeRequest);
    },
    getHistory: (id: any) => {
        const url = `/Exercise/getHistory?id=${id}`;
        return axiosClient.post(url, { id });
    },
    getRank: (id: any) => {
        const url = `/Exercise/getRank?id=${id}`;
        return axiosClient.post(url, { id });
    },
};
