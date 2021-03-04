import { Activity } from './../models/activity';
import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url:string) => axios.get<T>(url).then(responseBody),
    post: <T> (url:string, body:{}) => axios.post<T>(url,body).then(responseBody),
    put: <T> (url:string, body:{}) =>  axios.put<T>(url,body).then(responseBody),
    delete: <T> (url:string) =>  axios.delete<T>(url).then(responseBody),
}

const Activities = {
    list: () => requests.get<Activity[]>('/Activities'),
    details:(id:string) => requests.get<Activity>(`/Activities/${id}`),
    create:(activity:Activity) =>requests.post('/Activities',activity),
    update:(activity:Activity) =>requests.put('/Activities',activity),
    delete:(id:string) => requests.delete(`/Activities/${id}`)
}

const Agent = {
    Activities
}

export default Agent;