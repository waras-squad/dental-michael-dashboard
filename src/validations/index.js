import * as Yup from 'yup';

const createPatientSchema = Yup.object({
    email: Yup.string()
        .email("Must be a valid email")
        .required("Email cannot be empty"),
    name: Yup.string()
        .required("Name cannot be empty"),
    nik: Yup.string()
        .required("Nik cannot be empty"),
    phone: Yup.string()
        .required("Phone cannot be empty"),
    dob: Yup.string()
        .required("Date of Birth cannot be empty"),
    gender: Yup.string()
        .required("Gender cannot be empty"),
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    createPatientSchema,
}