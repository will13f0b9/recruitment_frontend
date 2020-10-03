
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

    async edit(id, params) {
        return axios.patch(`${this.cUri}/${id}`, params)
    }

    async getPlans() {
        return axios.get(`/plans`);
    }

    async findByCnpj(cnpj) {
        return axios.get(`${this.cUri}?cnpj=${cnpj}`)
    }
}