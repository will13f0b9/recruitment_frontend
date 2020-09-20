import * as axios from 'axios';
import { BaseApi } from "./base"


export class Jobs extends BaseApi {
    constructor() {
        super();
        this.jobUri = "/jobs"
    }

    async getAll(params = {}) {
        return axios.request({
            type: 'get',
            url: this.jobUri,
            params: params
        })
    }

    async getById(id) {
        return axios.request({
            type: 'get',
            url: `${this.jobUri}/${id}`
        })
    }
}