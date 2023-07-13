import toast from "react-hot-toast";
import { Provider } from "react-redux";

import configureStore from "redux-mock-store";

import { render, fireEvent, waitFor, screen } from "@testing-library/react";

import { RESPONSE_MESSAGES } from "@constants/responseMessages";
import ProfilePage from "@containers/ProfilePage";
import { inviteUser, inviteUsersWithCSV } from "@services/services";

const mockStore = configureStore([]);
jest.mock("react-hot-toast");
jest.mock("@services/services");
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

describe("ProfilePage component", () => {
    it("should render profile page with invite users component", () => {
        const emptyStore = mockStore({
            isLoggedIn: { value: false, docCreated: false },
            loader: { value: false },
        });
        render(
            <Provider store={emptyStore}>
                <ProfilePage />
            </Provider>
        );

        const inviteUsersTitle = screen.getByText("Invite User");
        const inviteUsersSubmitButton = screen.getByText("Submit");
        const inviteUsersViaEmailButton = screen.getByText(
            "Want to invite via CSV ?"
        );

        expect(inviteUsersTitle).toBeInTheDocument();
        expect(inviteUsersSubmitButton).toBeInTheDocument();
        expect(inviteUsersViaEmailButton).toBeInTheDocument();
    });

    it("should submit invite users form on profile page", async () => {
        const emptyStore = mockStore({
            isLoggedIn: { value: false, docCreated: false },
            loader: { value: false },
        });
        render(
            <Provider store={emptyStore}>
                <ProfilePage />
            </Provider>
        );

        const emailInput = screen.getByPlaceholderText("Email");
        const nameInput = screen.getByPlaceholderText("Name");
        fireEvent.change(emailInput, {
            target: { value: "johndoe@example.com" },
        });
        fireEvent.change(nameInput, { target: { value: "name" } });

        (inviteUser as jest.Mock).mockResolvedValue("ok");
        (toast.success as jest.Mock).mockResolvedValueOnce("ok");

        const inviteUsersSubmitButton = screen.getByTestId("submit-button");
        fireEvent.click(inviteUsersSubmitButton);

        await waitFor(() => {
            expect(inviteUser).toHaveBeenCalled();
            expect(toast.success).toHaveBeenCalledWith(
                RESPONSE_MESSAGES.inviteRequestSuccess
            );
        });
    });

    it("should submit invite users form on profile page", async () => {
        const emptyStore = mockStore({
            isLoggedIn: { value: false, docCreated: false },
            loader: { value: false },
        });
        render(
            <Provider store={emptyStore}>
                <ProfilePage />
            </Provider>
        );

        const emailInput = screen.getByPlaceholderText("Email");
        const nameInput = screen.getByPlaceholderText("Name");
        fireEvent.change(emailInput, {
            target: { value: "johndoe@example.com" },
        });
        fireEvent.change(nameInput, { target: { value: "name" } });

        (inviteUser as jest.Mock).mockRejectedValueOnce({
            response: {
                data: {
                    message: "Invalid Data",
                },
            },
        });
        (toast.error as jest.Mock).mockResolvedValueOnce("ok");

        const inviteUsersSubmitButton = screen.getByTestId("submit-button");
        fireEvent.click(inviteUsersSubmitButton);

        await waitFor(() => {
            expect(inviteUser).toHaveBeenCalled();
            expect(toast.error).toHaveBeenCalledWith("Invalid Data");
        });
    });

    it("should switche between invite via CSV and invite via email on profile page", async () => {
        const emptyStore = mockStore({
            isLoggedIn: { value: false, docCreated: false },
            loader: { value: false },
        });
        render(
            <Provider store={emptyStore}>
                <ProfilePage />
            </Provider>
        );

        const inviteViaCsvButton = screen.getByText("Want to invite via CSV ?");

        fireEvent.click(inviteViaCsvButton);

        await waitFor(() => {
            expect(
                screen.getByText("Want to invite with email ?")
            ).toBeInTheDocument();
        });
    });
});
