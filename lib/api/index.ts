import axios, { AxiosResponse } from 'axios';
import queryString from 'query-string';
import { resCode } from '../types';
const axiosClient = axios.create({
    baseURL: process.env.BASE_URL_API,
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
    runCode: (data: reqCode) => {
        const url = `/`;
        return axiosClient.post<string, AxiosResponse<resCode>>(url, data);
    },
};
