import React from 'react';
import Circular from '../Loadings/CircularLoading';

function GeneralButton({ title, onClick, disable = false, bgColor, textColor, icon = null, loading }) {
    return (
        <button
            onClick={disable ? null : onClick}
            className={`flex items-center justify-center min-w-[100px] w-full gap-3 text-center cursor-pointer rounded-lg border ${disable ? "bg-[#6ee2f5] cursor-not-allowed" : bgColor ?? "border-[#7166e9] bg-[#7166e9]"} shadow-sm py-2 transition hover:bg-opacity-90`}
        >
            {
                loading ? <Circular /> : <>
                    {
                        icon ? <div>{icon}</div> : null
                    }
                    <p className={`text-[14px] uppercase ${textColor ?? "text-white"}`}>{title}</p>
                </>
            }
        </button>
    );
}

export default GeneralButton;