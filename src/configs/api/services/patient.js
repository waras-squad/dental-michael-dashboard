import { HttpGet, HttpPost } from "..";
import constant from '../../../constants/url';

export async function getPatients() {
    try {
        let res = await HttpGet(`${constant.PATIENT}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function getPatientDetail({ id }) {
    try {
        let res = await HttpGet(`${constant.PATIENT}/${id}`, null);

        return res;
    } catch (error) {
        throw (error);
    }
}

export async function createPatient(data) {
    try {
        let res = await HttpPost(`${constant.PATIENT}`, data , null);

        return res;
    } catch (error) {
        throw (error);
    }
}