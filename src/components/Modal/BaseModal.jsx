import { MdOutlineClose } from "react-icons/md";

function BaseModal({ open, children, title, onClose }) {
    return (
        <div className={`fixed ${open ? "" : "hidden"} z-[1000] inset-0 p-5 bg-gray-600 bg-opacity-50 overflow-y-auto w-full`}>
            <div className="relative mx-auto p-5 border w-[90%] max-w-[550px] shadow-lg md:max-w-[600px] lg:max-w-[1000px] rounded-md bg-white">
                <div className="grid grid-cols-3 justify-center">
                    <div />
                    <div>
                        <p className="text-center font-semibold text-nowrap">{title}</p>
                    </div>
                    <div className="flex justify-end">
                        <MdOutlineClose size={20} color="black" onClick={onClose} />
                    </div>
                </div>
                
                {children}
            </div>
        </div>
    );
}

export default BaseModal;
