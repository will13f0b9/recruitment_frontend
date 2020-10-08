
import { BaseApi } from "./base"
import * as axios from 'axios';
import RemoveSpecialCharacters from "../util/remove-special-characters";

export class Companies extends BaseApi {
    constructor() {
        super();
        this.cUri = "/companies"
    }

    async create(params) {
        params.cnpj = RemoveSpecialCharacters(params.cnpj);
        return axios.post(`${this.cUri}`, params)
    }

    async edit(id, params) {
        params.cnpj = RemoveSpecialCharacters(params.cnpj);
        return axios.patch(`${this.cUri}/${id}`, params)
    }

    async getPlans() {
        return axios.get(`/plans`);
    }

    async findByCnpj(cnpj) {
        cnpj = RemoveSpecialCharacters(cnpj);
        return axios.get(`${this.cUri}?cnpj=${cnpj}`)
    }
}