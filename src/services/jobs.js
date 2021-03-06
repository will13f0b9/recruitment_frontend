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

    async changeJobData(id, data) {
        return axios.patch(
            `${this.jobUri}/${id}`,
            data
        )
    }


    async createJob(data) {
        return axios.post(
            `${this.jobUri}/`,
            data
        )
    }

    async getDashFromCompanyJobs(companyId) {
        return axios.get(
            `${this.jobUri}/company/${companyId}`
        )
    }

    async getCandidatesInJob(jobId) {
        return axios.get(`${this.jobUri}/${jobId}/candidates/`)
    }

    async approveCandidateToJob(jobId, candidateId) {
        return axios.post(`${this.jobUri}/${jobId}/approve/${candidateId}`)
    }

    async repproveCandidateToJob(jobId, candidateId) {
        return axios.post(`${this.jobUri}/${jobId}/repprove/${candidateId}`)
    }

    async candidateUserToJob(jobId, candidateId) {
        return axios.post(`${this.jobUri}/${jobId}/candidate/${candidateId}`)
    }
}