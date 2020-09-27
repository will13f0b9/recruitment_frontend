import * as axios from 'axios';
import { BaseApi } from "./base"


export class Jobs extends BaseApi {
    constructor() {
        super();
        this.jobUri = "/jobs"
    }

    async getAll(companyId) {
        let url = this.jobUri;
        if (companyId) {
            url = url + `?company=${companyId}`
        }
        return axios.request({
            type: 'get',
            url: url,
        })
    }

    async getById(id) {
        return axios.request({
            type: 'get',
            url: `${this.jobUri}/${id}`
        })
    }


    async changeJobDone(id, action) {
        return axios.patch(
            `${this.jobUri}/${id}`,
            { done: action }
        )
    }
}