import { getAddress, getGroupData } from "../../api/services/public";
import { INITIAL_STATE } from "./type";

export const initiate = () => {
    return async (dispatch) => {
        try {
            const [
                partnerType, 
                provinces,
                pickupPackageType, 
                pickupTransportType, 
                pickupPaymentType, 
                pickupSizeType,
                roleType,
                departmentType
            ] = await Promise.all([
                getGroupData({ group: 'partner-type' }), 
                getAddress({ id: '', category: 'province' }), 
                getGroupData({ group: 'pickup-package-type' }), 
                getGroupData({ group: 'pickup-transport-type' }), 
                getGroupData({ group: 'pickup-payment-type' }), 
                getGroupData({ group: 'pickup-size-type' }),
                getGroupData({ group: 'role' }),
                getGroupData({ group: 'department' }),
            ]);

            const userData = sessionStorage.getItem('userInfo');

            dispatch({
                type: INITIAL_STATE,
                payload: {
                    partnerType: partnerType,
                    provinces: provinces,
                    pickupPackageType: pickupPackageType,
                    pickupTransportType: pickupTransportType,
                    pickupPaymentType: pickupPaymentType,
                    pickupSizeType: pickupSizeType,
                    roleType: roleType,
                    departmentType: departmentType,
                    user: JSON.parse(userData),
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
}