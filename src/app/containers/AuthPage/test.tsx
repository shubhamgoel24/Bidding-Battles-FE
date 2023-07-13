import toast from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import configureStore from "redux-mock-store";

import {
    render,
    fireEvent,
    waitFor,
    screen,
    act,
} from "@testing-library/react";

import { signInWithEmailAndPassword } from "firebase/auth";

import { RESPONSE_MESSAGES } from "@constants/responseMessages";
import AuthPage from "@containers/AuthPage";
import { checkEmailVerified } from "@containers/AuthPage/utils";
import { signUp, updateDetails } from "@services/services";

const mockStore = configureStore([]);

jest.mock("@services/services");
jest.mock("react-hot-toast");
jest.mock("firebase/auth");
jest.mock("@containers/AuthPage/utils");
jest.mock("@constants/envConstants", () => ({
    BASE_URL: "http://127.0.0.1:5000/",
    FIREBASE_CONFIG: {
        fbApiKey: "key",
        fbAuthDomain: "authDomain",
        fbProjectId: "projectId",
        fbStorageBucket: "bucketStorage",
        fbMessagingSenderId: "messagingId",
        fbAppId: "appId",
        fbMeasurementId: "measurementId",
    },
}));

describe("AuthPage Component", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render SignInForm by default", () => {
        const emptyStore = mockStore({
            isLoggedIn: { value: false, docCreated: false },
        });

        render(
            <Provider store={emptyStore}>
                <BrowserRouter>
                    <AuthPage />
                </BrowserRouter>
            </Provider>
        );
        const signInForm = screen.getByTestId("signin-form");
        expect(signInForm).toBeInTheDocument();
    });

    it("should render SignUpForm when showSignIn state is false", () => {
        const emptyStore = mockStore({
            isLoggedIn: { value: false, docCreated: false },
        });

        render(
            <Provider store={emptyStore}>
                <BrowserRouter>
                    <AuthPage />
                </BrowserRouter>
            </Provider>
        );
        const signUpFormBotton = screen.getByTestId("signup-toggle");
        fireEvent.click(signUpFormBotton);
        const signUpForm = screen.getByTestId("signup-form");
        expect(signUpForm).toBeInTheDocument();
    });

    it("should show error toast when signing up with incorrect email", async () => {
        const emptyStore = mockStore({
            isLoggedIn: { value: false, docCreated: false },
        });

        render(
            <Provider store={emptyStore}>
                <BrowserRouter>
                    <AuthPage />
                </BrowserRouter>
            </Provider>
        );
        const signUpFormBotton = screen.getByTestId("signup-toggle");
        fireEvent.click(signUpFormBotton);
        const registerButton = screen.getByText("Register");
        const emailInput = screen.getByPlaceholderText("Email");
        const passwordInput = screen.getByPlaceholderText("Password");
        const confirmPasswordInput =
            screen.getByPlaceholderText("Confirm Password");
        fireEvent.change(emailInput, { target: { value: "invalidEmail@g" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.change(confirmPasswordInput, {
            target: { value: "password456" },
        });
        fireEvent.click(registerButton);
        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith(
                `${RESPONSE_MESSAGES.incorrectEmail}`
            );
        });
    });

    it("should show error toast when signing up with mismatched passwords", async () => {
        const emptyStore = mockStore({
            isLoggedIn: { value: false, docCreated: false },
        });

        render(
            <Provider store={emptyStore}>
                <BrowserRouter>
                    <AuthPage />
                </BrowserRouter>
            </Provider>
        );
        const signUpFormBotton = screen.getByTestId("signup-toggle");
        fireEvent.click(signUpFormBotton);
        const registerButton = screen.getByText("Register");
        const emailInput = screen.getByPlaceholderText("Email");
        fireEvent.change(emailInput, {
            target: { value: "johndoe@example.com" },
        });
        const passwordInput = screen.getByPlaceholderText("Password");
        const confirmPasswordInput =
            screen.getByPlaceholderText("Confirm Password");
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.change(confirmPasswordInput, {
            target: { value: "password456" },
        });
        (toast.error as jest.Mock).mockResolvedValueOnce("ok");
        fireEvent.click(registerButton);
        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith(
                `${RESPONSE_MESSAGES.passwordMismatch}`
            );
        });
    });

    it("should call signUp function and shows success toast when signing up with valid data", async () => {
        const emptyStore = mockStore({
            isLoggedIn: { value: false, docCreated: false },
        });

        render(
            <Provider store={emptyStore}>
                <BrowserRouter>
                    <AuthPage />
                </BrowserRouter>
            </Provider>
        );
        const signUpButton = screen.getByText("Want to create an account ? SignUp Here.");
        fireEvent.click(signUpButton);
        const emailInput = screen.getByPlaceholderText("Email");
        const passwordInput = screen.getByPlaceholderText("Password");
        const confirmPasswordInput =
            screen.getByPlaceholderText("Confirm Password");
        fireEvent.change(emailInput, {
            target: { value: "johndoe@example.com" },
        });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.change(confirmPasswordInput, {
            target: { value: "password123" },
        });
        (signUp as jest.Mock).mockResolvedValue(
            RESPONSE_MESSAGES.signUpSuccessful
        );
        (toast.success as jest.Mock).mockResolvedValueOnce("ok");
        const registerButton = screen.getByText("Register");
        fireEvent.click(registerButton);
        await waitFor(() => {
            expect(signUp).toHaveBeenCalled();
            expect(toast.success).toHaveBeenCalledWith(
                RESPONSE_MESSAGES.signUpSuccessful
            );
        });
    });

    it("should show error toast when signing in with incorrect email", async () => {
        const emptyStore = mockStore({
            isLoggedIn: { value: false, docCreated: false },
        });

        render(
            <Provider store={emptyStore}>
                <BrowserRouter>
                    <AuthPage />
                </BrowserRouter>
            </Provider>
        );
        const loginButton = screen.getByText("Login");
        const emailInput = screen.getByPlaceholderText("Email");
        const passwordInput = screen.getByPlaceholderText("Password");
        fireEvent.change(emailInput, { target: { value: "invalidEmail@g" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.click(loginButton);
        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith(
                `${RESPONSE_MESSAGES.incorrectEmail}`
            );
        });
    });

    it("should call signIn function and shows success toast when signing in with valid data", async () => {
        const emptyStore = mockStore({
            isLoggedIn: { value: false, docCreated: false },
        });

        render(
            <Provider store={emptyStore}>
                <BrowserRouter>
                    <AuthPage />
                </BrowserRouter>
            </Provider>
        );
        const emailInput = screen.getByPlaceholderText("Email");
        const passwordInput = screen.getByPlaceholderText("Password");
        fireEvent.change(emailInput, {
            target: { value: "johndoe@example.com" },
        });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        (signInWithEmailAndPassword as jest.Mock).mockResolvedValue("Success");
        (toast.success as jest.Mock).mockResolvedValueOnce("ok");
        const loginButton = screen.getByText("Login");
        fireEvent.click(loginButton);
        await waitFor(() => {
            expect(signInWithEmailAndPassword).toHaveBeenCalled();
            expect(toast.success).toHaveBeenCalledWith(
                RESPONSE_MESSAGES.signInSuccessful
            );
        });
    });

    it("should call signIn function and shows error toast when signing in with invalid data", async () => {
        const emptyStore = mockStore({
            isLoggedIn: { value: false, docCreated: false },
        });

        render(
            <Provider store={emptyStore}>
                <BrowserRouter>
                    <AuthPage />
                </BrowserRouter>
            </Provider>
        );
        const emailInput = screen.getByPlaceholderText("Email");
        const passwordInput = screen.getByPlaceholderText("Password");
        fireEvent.change(emailInput, {
            target: { value: "johndoe@example.com" },
        });
        fireEvent.change(passwordInput, { target: { value: "password12" } });
        (signInWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(
            "Failed"
        );
        (toast.error as jest.Mock).mockResolvedValueOnce("error");
        const loginButton = screen.getByText("Login");
        fireEvent.click(loginButton);
        await waitFor(() => {
            expect(signInWithEmailAndPassword).toHaveBeenCalled();
            expect(toast.error).toHaveBeenCalledWith(
                RESPONSE_MESSAGES.invalidCredentials
            );
        });
    });

    it("should call update function and shows success toast when updating with valid data", async () => {
        const store = mockStore({
            isLoggedIn: { value: true, docCreated: false },
        });

        (checkEmailVerified as jest.Mock).mockImplementation(() => false);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthPage />
                </BrowserRouter>
            </Provider>
        );

        const nameInput = screen.getByPlaceholderText("Name");
        const houseAndLocalityInput =
            screen.getByPlaceholderText("House and Locality");
        const cityInput = screen.getByPlaceholderText("City");
        const stateInput = screen.getByPlaceholderText("State");
        const zipcodeInput = screen.getByPlaceholderText("Zipcode");
        const updateButton = screen.getByText("Update");

        // Enter input values
        fireEvent.change(houseAndLocalityInput, {
            target: { value: "N1, MainStreet" },
        });
        fireEvent.change(nameInput, { target: { value: "John Doe" } });
        fireEvent.change(cityInput, { target: { value: "New York" } });
        fireEvent.change(stateInput, { target: { value: "NY" } });
        fireEvent.change(zipcodeInput, { target: { value: "10001" } });

        (updateDetails as jest.Mock).mockResolvedValue(
            RESPONSE_MESSAGES.signUpSuccessful
        );
        (toast.success as jest.Mock).mockResolvedValueOnce("ok");

        act(() => {
            updateButton.click();
        });

        await waitFor(() => {
            expect(updateDetails).toHaveBeenCalled();
            expect(toast.success).toHaveBeenCalledWith(
                RESPONSE_MESSAGES.detailsUpdateSuccess
            );
        });
    });
});
