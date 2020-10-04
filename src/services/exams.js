import * as axios from 'axios';
import { BaseApi } from "./base"


export class Exams extends BaseApi {
    constructor() {
        super();
        this.resourceUri = "/exams"
    }

    async startExamOfUser(jobId, candidateId) {
        return axios.post(`${this.resourceUri}/start/jobs/${jobId}/users/${candidateId}`)
    }

    async aswerQuestion(jobId, userId, questionId, aswer) {
        return axios.post(`${this.resourceUri}/answer/jobs/${jobId}/users/${userId}/questions/${questionId}`, { answer: aswer });
    }

    async doneExamOfUser(jobId, userId) {
        return axios.post(`${this.resourceUri}/done/jobs/${jobId}/users/${userId}?forceDone=true`);
    }

    async examOfUser(jobId, userId) {
        return axios.get(`${this.resourceUri}/infos/jobs/${jobId}/users/${userId}`);
    }
}