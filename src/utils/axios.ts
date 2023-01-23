import axios from 'axios';

export const getBaseUrl = (): string => window.env.BACKEND_API ?? 'backend';

export const api = axios.create({
    baseURL: getBaseUrl(),
    timeout: 30000, // 30 sec
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});
