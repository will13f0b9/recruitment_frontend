
import { BaseApi } from "./base"
import * as axios from 'axios';

export class Users extends BaseApi {
    constructor() {
        super();
        this.cUri = "/users"
    }

    async editUSer(id, params) {
        return axios.patch(`${this.cUri}/${id}`, params)
    }


    async authenticate(data) {
        return axios.post(`${this.cUri}/authenticate`, data)
    }

    async sendCurriculum(id, file) {
        const form = new FormData();
        form.append("curriculum", file)
        return axios.post(`${this.cUri}/${id}/curriculum`, form)
    }

    async findUserById(id) {
        return axios.get(`${this.cUri}/${id}`);
    }
}