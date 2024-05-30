import { useEffect, useState } from "react";
import LoadingModal from "../../../components/Loadings";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import moment from "moment";
import { getPatients } from "../../../configs/api/services/patient";
import { MdOutlineMailOutline, MdOutlineCalendarMonth, MdOutlineLocalPhone, MdOutlineRemoveRedEye } from "react-icons/md";


function PatientPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();

    const [data, setData] = useState([]);

    async function getList() {
        try {
            setLoading(true);

            const res = await getPatients();

            setData(res);
        } catch (error) {
            toast(error?.message);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        getList();
    }, [searchParams]);

    return (
        <div>
            <div className="flex flex-col gap-2 md:grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {
                    data.map((data) => {
                        return (
                            <div className="p-2 rounded border border-gray-300 flex gap-3 justify-between items-center">
                                <div className="flex gap-2 items-center">
                                    <img src={data.profile_picture} alt={data.name} className="rounded-full h-[50px] w-[50px] bg-blue-400" />

                                    <div className="flex flex-col gap-2">
                                        <p className="font-semibold">{data.name}</p>
                                        <div className="flex gap-1 items-center">
                                            <MdOutlineMailOutline className="fill-[#6B7280]" size={16} />
                                            <p className="text-sm text-[#6B7280]">{data.email}</p>
                                        </div>
                                        <div className="flex gap-1 items-center">
                                            <MdOutlineLocalPhone className="fill-[#6B7280]" size={16} />
                                            <p className="text-sm text-[#6B7280]">{data.phone}</p>
                                        </div>
                                        <div className="flex gap-1 items-center">
                                            <MdOutlineCalendarMonth className="fill-[#6B7280]" size={16} />
                                            <p className="text-sm text-[#6B7280]">{moment(data.dob).format('DD MMMM YYYY')}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 min-w-[40px]">
                                    <MdOutlineRemoveRedEye onClick={() => navigate(`/patients/${data.id}`)} />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <LoadingModal open={loading} />
        </div>
    );
}

export default PatientPage;
