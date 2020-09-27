
import { BaseApi } from "./base"
import * as axios from 'axios';

export class Companies extends BaseApi {
    constructor() {
        super();
        this.cUri = "/companies"
    }

    async create(params) {
        return axios.post(`${this.cUri}`, params)
    }

    async getPlans(){
        return axios.get(`/plans`);
    }
}