import * as axios from 'axios';

export class BaseApi {
    constructor() {
        axios.defaults.baseURL = 'https://recruitmentbackendfiap.herokuapp.com';
        // axios.defaults.baseURL = 'http://localhost:3000/';
    }
}