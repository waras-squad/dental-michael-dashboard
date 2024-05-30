import { deletePartner } from "../../configs/api/services/partner";
import GeneralButton from "../Buttons/GeneralButton";
import BaseModal from "./BaseModal";

function PartnerModal({ open, onClose, onSubmit, id }) {
    async function submit() {
        await deletePartner({ id });

        onSubmit();
    }

    return (
        <BaseModal open={open} title={"Delete Partner"} onClose={onClose}  >
            <div className="mt-5">
                <p className="text-sm text-gray-400 text-center">Apakah anda yakin menghapus data ini ? Data tidak dapat di kembalikan.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <GeneralButton onClick={onClose} title={"Cancel"} bgColor={"white"} textColor={"black"} />
                    <GeneralButton onClick={() => submit()} title={"Lanjutkan"} />
                </div>
            </div>
        </BaseModal>
    );
}

export default PartnerModal;
