import toast from "react-hot-toast";

import { auth } from "firebaseApp";

export const checkIfAuthenticated = () => {
    return auth.currentUser;
};

const showToast = (isErrorToast: boolean, toastMessage: string) => {
    if (isErrorToast) {
        toast.error(toastMessage);
    } else {
        toast.success(toastMessage);
    }
};

export default showToast;
