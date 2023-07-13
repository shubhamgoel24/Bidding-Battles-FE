import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import Loader from "@components/Loader";
import NavBar from "@components/NavBar";
import { RESPONSE_MESSAGES } from "@constants/responseMessages";
import { ROUTE_PATHS } from "@constants/routePaths";
import { removeGlobalLoader } from "@reduxSlice/loaderSlice";
import AppRoutes from "AppRoutes";
import { auth, db } from "firebaseApp";
import {
    login,
    logout,
    docFound,
    docNotFound,
} from "reduxSlice/isLoggedInSlice";
import { RootState } from "store";
import showToast from "utils/helper";

/**
 * Main app function
 */
const App = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector(
        (state: RootState) => state.isLoggedIn.value
    );

    const docCreated = useSelector(
        (state: RootState) => state.isLoggedIn.docCreated
    );

    const showLoader = useSelector((state: RootState) => state.loader.value);

    const showGlobalLoader = useSelector(
        (state: RootState) => state.loader.global
    );

    const handleLogout = () => {
        signOut(auth);
        showToast(false, RESPONSE_MESSAGES.signOutSuccessful);
        navigate(ROUTE_PATHS.auth);
    };

    const checkDocCreated = async (uid: string) => {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            dispatch(docFound());
            dispatch(removeGlobalLoader());
        } else {
            dispatch(docNotFound());
            dispatch(removeGlobalLoader());
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user?.uid) {
                dispatch(login());
                checkDocCreated(user.uid);
            } else {
                dispatch(logout());
                dispatch(removeGlobalLoader());
            }
        });
        return unsubscribe;
    }, []);

    if (showGlobalLoader) {
        return <Loader />;
    }

    return (
        <>
            <NavBar
                isLoggedIn={isLoggedIn}
                docCreated={docCreated}
                handleLogout={handleLogout}
            />
            {showLoader && <Loader />}
            <AppRoutes />
            <Toaster />
        </>
    );
};

export default App;
