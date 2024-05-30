import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingModal from "../../../components/Loadings";
import { toast } from "react-toastify";
import { InputSingleField } from "../../../components/Fields/InputField";
import { DropdownMultiField } from "../../../components/Fields/DropdownMulti";
import GeneralButton from "../../../components/Buttons/GeneralButton";
import { MdOutlineCheckCircleOutline } from "react-icons/md";
import validations from "../../../validations";
import { AiOutlineFileImage } from "react-icons/ai";
import moment from "moment";
import { createPatient } from "../../../configs/api/services/patient";

function PatientFormPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState("create");
    const [searchParams] = useSearchParams();
    const [detail, setDetail] = useState(null);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [idCard, setIdCard] = useState('');
    const [gender, setGender] = useState(null);
    const [phone, setPhone] = useState('+62');
    const [photo, setPhoto] = useState(null);

    const [error, setError] = useState({
        name: false,
        idCard: false,
        gender: false,
        email: false,
        dob: false,
        phone: false,
    });


    async function initial() {
        // const resPartner = await getPartners();

        // resPartner.unshift({ code: 'feeder', name: 'feeder', id: 1, });

        // setPartner(resPartner);

        if (searchParams.get("section")) {
            setType(searchParams.get("section"));
        }

        if (searchParams.get("section") !== 'create') {
            if (searchParams.get("id")) {
                // const res = await getInsuranceDetail({ id: searchParams.get("id") });

                // const idx = resPartner.findIndex((x) => x.code === res.group);

                // setDescription(res.description);
                // setName(res.name);
                // setCode(res.code);
                // setGroup(resPartner[idx]);
                // setDetail(res);
            }
        }
    }

    useEffect(() => {
        initial();
    }, [])

    async function submit() {
        try {
            setLoading(true);
            setError({
                name: false,
                idCard: false,
                gender: false,
                email: false,
                dob: false,
                phone: false,
            });

            await validations.createPatientSchema.validate({
                name: name,
                phone: phone,
                email: email,
                dob,
                nik: idCard,
                gender: gender?.value,
            }, { abortEarly: false });

            const payload = new FormData();

            payload.append("email", email);
            payload.append("password", email);
            payload.append("name", name);
            payload.append("phone", phone);
            payload.append("nik", idCard);
            payload.append("dob", moment(dob).format('YYYY-MM-DD'));
            payload.append("gender", gender.value);

            if (type === 'create' && photo) {
                payload.append("profile_picture", photo);

            } else if (type !== 'create') {
                if (photo) {
                    payload.append("profile_picture", photo);
                }
            }

            if (type === "create") {
                await createPatient(payload);
            } else {

            }

            toast(`Success ${type} patient`);
            navigate('/patients/list?page=1&limit=25')
        } catch (error) {
            if (error.name === 'ValidationError') {
                let section = {
                    name: false,
                    idCard: false,
                    gender: false,
                    email: false,
                    dob: false,
                    phone: false,
                };

                // Check Each Field for error
                error.errors.forEach((data) => {
                    if (data.toLowerCase().includes('name')) section = { ...section, name: true };
                    if (data.toLowerCase().includes('phone')) section = { ...section, phone: true };
                    if (data.toLowerCase().includes('email')) section = { ...section, email: true };
                    if (data.toLowerCase().includes('nik')) section = { ...section, idCard: true };
                    if (data.toLowerCase().includes('birth')) section = { ...section, dob: true };
                    if (data.toLowerCase().includes('gender')) section = { ...section, gender: true };
                });

                setError({
                    ...section,
                })
            } else {
                toast(error.message)
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="border bg-white rounded p-4 w-full ">
                <h1 className="text-xl font-semibold mb-6">{type === "detail" ? "Rincian" : type === 'create' ? "Pembuatan" : "Modifikasi"} Pasien</h1>
                <div className="border h-[150px] w-[150px] mx-auto mb-5">
                    {detail ? photo ? (
                        <label
                            className="flex justify-center items-center h-[100%]"
                            htmlFor={`file-photo`}
                        >
                            <img
                                src={URL.createObjectURL(photo)}
                                style={{ width: "100%", height: "100%" }}
                                alt=""
                            />
                        </label>
                    ) : <label
                        className="flex justify-center items-center h-[100%]"
                        htmlFor={`file-photo`}
                    >
                        <img
                            src={detail.photo}
                            style={{ width: "100%", height: "100%" }}
                            alt=""
                        />
                    </label> : photo ? <label
                        className="flex justify-center items-center h-[100%]"
                        htmlFor={`file-photo`}
                    >
                        <img
                            src={URL.createObjectURL(photo)}
                            style={{ width: "100%", height: "100%" }}
                            alt=""
                        />
                    </label> : (
                        <label
                            className="flex justify-center items-center h-[100%]"
                            htmlFor={`file-photo`}
                        >
                            <AiOutlineFileImage className="mr-[10px]" />
                            Photo
                        </label>
                    )}
                    <input
                        type="file"
                        accept=".png,.jpg,.pdf"
                        hidden
                        id={`file-photo`}
                        onChange={(e) => setPhoto(e.target.files[0])}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 md:gap-10">
                    <InputSingleField disable={type === "detail" ? true : false} error={error.name} label={"Nama"} labelWeight={600} required={true} value={name} onChange={(e) => { setName(e.target.value) }} />
                    <InputSingleField maxLengthCharacter={16} disable={type === "detail" ? true : false} error={error.idCard} label={"NIK"} labelWeight={600} required={true} value={idCard} onChange={(e) => setIdCard(e.target.value)} />
                    <DropdownMultiField disabled={type === "detail" ? true : false} error={error.gender} label={"Jenis Kelamain"} required={true} keyValue={"value"} keyLabel={"name"} list={[{ name: 'Male', value: 'MALE' }, { name: 'Female', value: 'FEMALE' }]} labelWeight={600} value={gender} onDropdownItemClick={(e) => setGender(e)} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 md:gap-10">
                    <InputSingleField disable={type === "detail" ? true : false} error={error.phone} label={"Telepon"} labelWeight={600} required={true} value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                    <InputSingleField disable={type === "detail" ? true : false} type={"email"} error={error.email} label={"Email"} labelWeight={600} required={true} value={email} onChange={(e) => setEmail(e.target.value)} />
                    <InputSingleField disable={type === "detail" ? true : false} type={"date"} error={error.dob} label={"Tanggal Lahir"} labelWeight={600} required={true} value={dob} onChange={(e) => setDob(e.target.value)} />
                </div>
                <div className="mt-8">
                    <GeneralButton title={type === 'detail' ? "Back" : "Submit"} onClick={() => type === 'detail' ? navigate(-1) : submit()} disable={loading} icon={type === 'detail' ? null : <MdOutlineCheckCircleOutline color={"white"} size={20} />} />
                </div>
            </div>
            <LoadingModal open={loading} />
        </div>
    );
}

export default PatientFormPage;
