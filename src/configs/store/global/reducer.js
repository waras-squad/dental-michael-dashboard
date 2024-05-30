import {
    INITIAL_STATE
} from "./type";

const initiate = {
    partnerType: [],
    provinces: [],
    pickupPackageType: [],
    pickupTransportType: [],
    pickupPaymentType: [],
    pickupSizeType: [],
    departmentType: [],
    roleType: [],
}

const GlobalReducer = (state = initiate, action) => {
    switch (action.type) {
        case INITIAL_STATE:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

export default GlobalReducer;