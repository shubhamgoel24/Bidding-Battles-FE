import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    sendEmailVerification,
    signInWithEmailAndPassword,
} from "firebase/auth";

import EmailVerification from "@components/EmailVerification";
import SignInForm from "@components/SignInForm";
import SignUpForm from "@components/SignUpForm";
import UpdateProfile from "@components/UpdateProfile";
import {
    EMAIL_REGEX,
    PASSWORD_REGEX,
    ONLY_ALPHABET_REGEX,
} from "@constants/constants";
import { RESPONSE_MESSAGES } from "@constants/responseMessages";
import { ROUTE_PATHS } from "@constants/routePaths";
import { errorResponseType } from "@containers/AuthPage/types";
import { checkEmailVerified } from "@containers/AuthPage/utils";
import { setLoader, removeLoader } from "@reduxSlice/loaderSlice";
import { signUp, updateDetails } from "@services/services";
import { auth } from "firebaseApp";
import { docFound } from "reduxSlice/isLoggedInSlice";
import { RootState } from "store";
import showToast from "utils/helper";

/**
 * Auth Page Container
 */
const AuthPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showSignIn, setShowSignIn] = useState(true);
    const [showEmailVerify, setShowEmailVerify] = useState(false);
    const [disableEmailVerifyButton, setDisableShowEmailVerifyButton] =
        useState(false);
    const [counter, setCounter] = useState(0);
    const isLoggedIn = useSelector(
        (state: RootState) => state.isLoggedIn.value
    );

    const isDocCreated = useSelector(
        (state: RootState) => state.isLoggedIn.docCreated
    );

    useEffect(() => {
        if (isLoggedIn && checkEmailVerified()) {
            setShowEmailVerify(true);
        } else {
            setShowEmailVerify(false);
        }
    });

    /**
     * Function to check is email is valid or not based on regex
     * @returns boolean
     */
    const isValidEmail = (email: string) => {
        return String(email).toLowerCase().match(EMAIL_REGEX);
    };

    const isStrongPassword = (password: string) => {
        return password.match(PASSWORD_REGEX);
    };

    const allowOnlyAlphabet = (password: string) => {
        return password.match(ONLY_ALPHABET_REGEX);
    };

    /**
     * Function to handle signup
     */
    const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(setLoader());
        const form = event.currentTarget;
        const formElements = form.elements as typeof form.elements & {
            email: HTMLInputElement;
            password: HTMLInputElement;
            confirmPassword: HTMLInputElement;
        };

        const userData = {
            email: formElements.email.value,
            password: formElements.password.value,
            confirmPassword: formElements.confirmPassword.value,
        };

        if (!isValidEmail(userData.email)) {
            showToast(true, RESPONSE_MESSAGES.incorrectEmail);
        } else if (!isStrongPassword(userData.password)) {
            showToast(true, RESPONSE_MESSAGES.strongPasswordRequired);
        } else if (userData.password !== userData.confirmPassword) {
            showToast(true, RESPONSE_MESSAGES.passwordMismatch);
        } else {
            try {
                await signUp(userData);
                setShowSignIn(true);
                showToast(false, RESPONSE_MESSAGES.signUpSuccessful);
            } catch (error: unknown) {
                dispatch(removeLoader());
                if ("error" in (error as errorResponseType).response.data) {
                    for (const [key, value] of Object.entries(
                        (error as errorResponseType).response.data.error
                    )) {
                        showToast(true, `${key} -> ${value}`);
                    }
                } else {
                    showToast(
                        true,
                        `${(error as errorResponseType).response.data.message}`
                    );
                }
            }
        }
        dispatch(removeLoader());
    };

    /**
     * Function to handle login
     */
    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(setLoader());
        const form = event.currentTarget;
        const formElements = form.elements as typeof form.elements & {
            email: HTMLInputElement;
            password: HTMLInputElement;
        };

        const userData = {
            email: formElements.email.value,
            password: formElements.password.value,
        };

        if (!isValidEmail(userData.email)) {
            showToast(true, RESPONSE_MESSAGES.incorrectEmail);
        } else {
            try {
                await signInWithEmailAndPassword(
                    auth,
                    userData.email,
                    userData.password
                );
                showToast(false, RESPONSE_MESSAGES.signInSuccessful);
                navigate(ROUTE_PATHS.home);
            } catch (error: unknown) {
                dispatch(removeLoader());
                showToast(true, RESPONSE_MESSAGES.invalidCredentials);
            }
        }
        dispatch(removeLoader());
    };

    /**
     * Function to handle sending email verification mail
     */
    const handleVerify = async () => {
        const user = auth.currentUser;
        dispatch(setLoader());
        if (user) {
            try {
                await sendEmailVerification(user, {
                    url: "https://bidding-battles-a36f9.web.app/auth",
                });
                showToast(false, RESPONSE_MESSAGES.emailSent);
                setDisableShowEmailVerifyButton(true);
                setCounter(60);
            } catch {
                dispatch(removeLoader());
                showToast(true, RESPONSE_MESSAGES.emailFail);
            }
        }
        dispatch(removeLoader());
    };

    /**
     * Handle Updating profile doc
     */
    const handleUpdateProfile = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        dispatch(setLoader());
        const form = event.currentTarget;
        const formElements = form.elements as typeof form.elements & {
            name: HTMLInputElement;
            houseAndLocality: HTMLInputElement;
            city: HTMLInputElement;
            state: HTMLInputElement;
            zipcode: HTMLInputElement;
        };

        const userData = {
            name: formElements.name.value,
            address: {
                houseAndLocality: formElements.houseAndLocality.value,
                city: formElements.city.value,
                state: formElements.state.value,
                zipcode: formElements.zipcode.value,
            },
        };
        if (!allowOnlyAlphabet(userData.address.city)) {
            showToast(true, RESPONSE_MESSAGES.onlyAlphabetsInCity);
        } else if (!allowOnlyAlphabet(userData.address.state)) {
            showToast(true, RESPONSE_MESSAGES.onlyAlphabetsInState);
        } else {
            try {
                await updateDetails(userData);
                showToast(false, RESPONSE_MESSAGES.detailsUpdateSuccess);
                dispatch(docFound());
            } catch (error: unknown) {
                dispatch(removeLoader());
                if ("error" in (error as errorResponseType).response.data) {
                    for (const [key, value] of Object.entries(
                        (error as errorResponseType).response.data.error
                    )) {
                        showToast(true, `${key} -> ${value}`);
                    }
                } else {
                    showToast(
                        true,
                        `${(error as errorResponseType).response.data.message}`
                    );
                }
            }
        }
        dispatch(removeLoader());
    };

    useEffect(() => {
        if (isLoggedIn && showEmailVerify) {
            handleVerify();
        }
    }, [showEmailVerify]);

    return (
        <>
            {isLoggedIn ? (
                showEmailVerify ? (
                    <EmailVerification
                        handleVerify={handleVerify}
                        disableEmailVerifyButton={disableEmailVerifyButton}
                        setDisableShowEmailVerifyButton={
                            setDisableShowEmailVerifyButton
                        }
                        counter={counter}
                        setCounter={setCounter}
                    />
                ) : (
                    !isDocCreated && (
                        <UpdateProfile
                            handleUpdateProfile={handleUpdateProfile}
                        />
                    )
                )
            ) : showSignIn ? (
                <SignInForm
                    setShowSignIn={() => setShowSignIn(false)}
                    handleSignIn={handleSignIn}
                />
            ) : (
                <SignUpForm
                    setShowSignIn={() => setShowSignIn(true)}
                    handleSignUp={handleSignUp}
                />
            )}
        </>
    );
};

export default AuthPage;
