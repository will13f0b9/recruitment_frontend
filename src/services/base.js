import * as axios from 'axios';

export class BaseApi {
    constructor() {
        this.client = axios.create({
            baseURL: 'https://recruitmentbackendfiap.herokuapp.com'
        });
    }
}