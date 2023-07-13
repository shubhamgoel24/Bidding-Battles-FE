import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { doc, getDoc } from "firebase/firestore";

import InviteUsers from "@components/InviteUsers";
import ShowProfile from "@components/ShowProfile";
import { profileDataType } from "@components/ShowProfile/types";
import { FILE_SIZE_LIMIT } from "@constants/constants";
import { RESPONSE_MESSAGES } from "@constants/responseMessages";
import { errorResponseType } from "@containers/AuthPage/types";
import "@containers/ProfilePage/style.scss";
import { removeLoader, setLoader } from "@reduxSlice/loaderSlice";
import { inviteUser, inviteUsersWithCSV } from "@services/services";
import { auth, db } from "firebaseApp";
import { RootState } from "store";
import showToast from "utils/helper";

/**
 * Profile Page Container
 */
const ProfilePage = () => {
    const dispatch = useDispatch();
    const [inviteViaCsv, setInviteViaCsv] = useState(false);
    const [profileData, setProfileData] = useState<profileDataType | null>(
        null
    );

    const showLoader = useSelector((state: RootState) => state.loader.value);

    /**
     * Function to handle submitting invite request
     * @param event
     * @param selectedFile
     */
    const handleInviteRequest = async (
        event: React.FormEvent<HTMLFormElement>,
        selectedFile: File | null
    ) => {
        event.preventDefault();
        dispatch(setLoader());
        if (inviteViaCsv && selectedFile) {
            if (selectedFile.size <= FILE_SIZE_LIMIT) {
                let inviteData = new FormData();
                inviteData.append("csvFile", selectedFile);
                try {
                    await inviteUsersWithCSV(inviteData);
                    showToast(false, RESPONSE_MESSAGES.fileUploadSuccess);
                } catch (error: unknown) {
                    dispatch(removeLoader());
                    showToast(
                        true,
                        `${(error as errorResponseType).response.data.message}`
                    );
                }
            } else {
                showToast(true, RESPONSE_MESSAGES.fileOverLimit);
            }
        } else {
            const form = event.currentTarget;
            const formElements = form.elements as typeof form.elements & {
                name: HTMLInputElement;
                email: HTMLInputElement;
            };

            const inviteData = {
                name: formElements.name.value,
                email: formElements.email.value,
            };
            try {
                await inviteUser(inviteData);
                showToast(false, RESPONSE_MESSAGES.inviteRequestSuccess);
            } catch (error: unknown) {
                dispatch(removeLoader());
                showToast(
                    true,
                    `${(error as errorResponseType).response.data.message}`
                );
            }
        }
        dispatch(removeLoader());
    };

    const getUserData = async () => {
        dispatch(setLoader());
        const querySnapshot = await getDoc(
            doc(db, "users", `${auth.currentUser?.uid}`)
        );
        if (querySnapshot.exists()) {
            setProfileData(querySnapshot.data() as profileDataType);
        }
        dispatch(removeLoader());
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <h3 className="text-center">User Profile</h3>
                {showLoader ? (
                    <div className="row item-row justify-content-center profile-row">
                        Loading
                    </div>
                ) : (
                    <>
                        {profileData && (
                            <ShowProfile profileData={profileData} />
                        )}

                        <InviteUsers
                            inviteViaCsv={inviteViaCsv}
                            setInviteViaCsv={setInviteViaCsv}
                            handleInviteRequest={handleInviteRequest}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
