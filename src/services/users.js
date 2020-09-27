
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

    async create(params) {
        return axios.post(`${this.cUri}`, params)
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

    async findUserByEmail(email) {
        return axios.get(`${this.cUri}/?email=${email}`);
    }

    async findRecruiterByEmail(email) {
        return axios.get(`${this.cUri}/?email=${email}&profiles=RECRUITER`);
    }

    async findAllRecruiterByCompanie(companieId){
        return axios.get(`${this.cUri}/companies/${companieId}`)
    }
    
    async addNewCompanyToUser(companyId, userId){
        debugger;
        return axios.post(`${this.cUri}/${userId}/companies/`, {companyId: companyId})
    }
}