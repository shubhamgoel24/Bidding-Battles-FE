import { auth } from "firebaseApp";

/**
 * Function to check if user's email is verified
 * @returns boolean
 */
export const checkEmailVerified = () => {
    if (auth.currentUser) {
        return !auth.currentUser.emailVerified;
    } else {
        return false;
    }
};
