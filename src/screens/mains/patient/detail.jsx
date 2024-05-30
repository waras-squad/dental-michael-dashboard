import { useEffect, useState } from "react";
import LoadingModal from "../../../components/Loadings";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { getPatientDetail } from "../../../configs/api/services/patient";
import { MdOutlineMailOutline, MdOutlineCalendarMonth, MdOutlineLocalPhone, MdOutlineRemoveRedEye, MdOutlineAttachFile } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";
import ImageCanva from "../../../components/Modal/ImageCanva";


function PatientDetailPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    const [data, setData] = useState(null);
    const [openImage, setOpenImage] = useState(false);

    async function getDetail() {
        try {
            setLoading(true);

            const res = await getPatientDetail({ id: id });

            setData(res);
        } catch (error) {
            toast(error?.message);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        getDetail();
    }, []);

    return (
        <div>
            {
                data?.profile_picture ? <img src={data?.profile_picture} alt={data?.name} className="rounded-full h-[120px] mx-auto w-[120px] bg-blue-400" /> : <div className="rounded-full h-[100px] w-[100px] bg-blue-400" />
            }
            <div className="p-4 rounded shadow-lg border-gray-300 flex gap-3 justify-between items-center">
                <div className="flex gap-2 items-center">
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold">{data?.name || 'N/A'}</p>
                        <div className="flex gap-1 items-center">
                            <MdOutlineMailOutline className="fill-[#6B7280] w-[24px]" size={18} />
                            <p className="text-sm text-[#6B7280]">{data?.email || 'N/A'}</p>
                        </div>
                        <div className="flex gap-1 items-center">
                            <MdOutlineLocalPhone className="fill-[#6B7280] w-[24px]" size={18} />
                            <p className="text-sm text-[#6B7280]">{data?.phone || 'N/A'}</p>
                        </div>
                        <div className="flex gap-1 items-center">
                            <MdOutlineCalendarMonth className="fill-[#6B7280] w-[24px]" size={18} />
                            <p className="text-sm text-[#6B7280]">{data?.dob ? moment(data?.dob).format('DD MMMM YYYY') : 'N/A'}</p>
                        </div>
                        <div className="flex gap-1 items-center">
                            <FaRegAddressCard className="fill-[#6B7280] w-[24px]" size={18} />
                            <p className="text-sm text-[#6B7280]">{data?.nik || 'N/A'}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <p className="px-4 mb-2 font-semibold">Document Data Patient</p>
                <div className="flex gap-2 flex-col">
                    <div className="border-b border-b-gray-300 pb-2 flex items-center justify-between">
                        <div className="px-4">
                            <div className="flex items-center gap-2">
                                <MdOutlineAttachFile className="fill-[#6B7280] w-[24px]" size={18} />
                                <p className="text-[#6B7280]">Bentuk Gigi</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <MdOutlineCalendarMonth className="fill-[#6B7280] w-[24px]" size={18} />
                                <p className="text-[#6B7280]">{moment().format('DD MMM YYYY')}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 min-w-[40px]">
                            <MdOutlineRemoveRedEye onClick={() => setOpenImage(true)} />
                        </div>
                    </div>
                </div>
            </div>
            <LoadingModal open={loading} />
            <ImageCanva open={openImage} onClose={() => setOpenImage(false)} />
        </div>
    );
}

export default PatientDetailPage;
