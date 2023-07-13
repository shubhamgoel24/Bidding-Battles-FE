import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { response } from "@constants/mockdata";
import MyItemRequests from "@containers/MyItemRequests";
import { getMyItemRequests } from "@services/services";
import { checkIfAuthenticated } from "utils/helper";

const mockStore = configureStore([]);

jest.mock("react-hot-toast");
jest.mock("@services/services");
jest.mock("utils/helper");
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

describe("MyItemRequests", () => {
    it("should render correctly", async () => {
        (checkIfAuthenticated as jest.Mock).mockResolvedValue(true);
        (getMyItemRequests as jest.Mock).mockResolvedValue(response);
        const emptyStore = mockStore({
            loader: { value: false },
        });
        render(
            <Provider store={emptyStore}>
                <BrowserRouter>
                    <MyItemRequests />
                </BrowserRouter>
            </Provider>
        );
        await waitFor(() => {
            expect(screen.getByText("Item 1")).toBeInTheDocument();
            expect(screen.getByText("Item 2")).toBeInTheDocument();
        });
    });

    it('should display the heading "Your Item Requests"', () => {
        (getMyItemRequests as jest.Mock).mockResolvedValue({});
        const emptyStore = mockStore({
            loader: { value: false },
        });
        render(
            <Provider store={emptyStore}>
                <BrowserRouter>
                    <MyItemRequests />
                </BrowserRouter>
            </Provider>
        );
        expect(screen.getByText("Your Item Requests")).toBeInTheDocument();
    });

    it("should display a message to create a new request when there are no item requests", () => {
        (getMyItemRequests as jest.Mock).mockResolvedValue({});
        const emptyStore = mockStore({
            loader: { value: false },
        });
        render(
            <Provider store={emptyStore}>
                <BrowserRouter>
                    <MyItemRequests />
                </BrowserRouter>
            </Provider>
        );
        expect(
            screen.getByText(
                "Why so lonely ? Create a new request to steal some deals."
            )
        ).toBeInTheDocument();
    });

    it('should display a "Create New Request" button that links to the "newItemRequest" route', async () => {
        (getMyItemRequests as jest.Mock).mockResolvedValue({});
        const emptyStore = mockStore({
            loader: { value: false },
        });
        render(
            <Provider store={emptyStore}>
                <BrowserRouter>
                    <MyItemRequests />
                </BrowserRouter>
            </Provider>
        );
        const createNewRequestButton = screen.getByText("Create New Request");
        expect(createNewRequestButton).toBeInTheDocument();
        userEvent.click(createNewRequestButton);
        await waitFor(() => {
            expect(window.location.pathname).toBe("/new-item-request");
        });
    });
});
