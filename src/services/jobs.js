
import { BaseApi } from "./base"


export class Jobs extends BaseApi {
    constructor() {
        super();
        this.jobUri = "/jobs"
    }

    async getAll(params = {}) {
        return this.client.request({
            type: 'get',
            url: this.jobUri,
            params: params
        })
    }

    async getById(id) {
        return this.client.request({
            type: 'get',
            url: `${this.jobUri}/${id}`
        })
    }
}