import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { render, screen, waitFor } from "@testing-library/react";

import { response } from "@constants/mockdata";
import HomePage from "@containers/HomePage";
import { getOthersItemRequests } from "@services/services";
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

describe("HomePage", () => {
    it("should render correctly", async () => {
        (checkIfAuthenticated as jest.Mock).mockResolvedValue(true);
        (getOthersItemRequests as jest.Mock).mockResolvedValue(response);
        const emptyStore = mockStore({
            loader: { value: false },
        });
        render(
            <Provider store={emptyStore}>
                <BrowserRouter>
                    <HomePage />
                </BrowserRouter>
            </Provider>
        );
        await waitFor(() => {
            expect(screen.getByText("Item 1")).toBeInTheDocument();
            expect(screen.getByText("Item 2")).toBeInTheDocument();
        });
    });

    it('should display the heading "Lets Start Bidding"', () => {
        (checkIfAuthenticated as jest.Mock).mockResolvedValue(true);
        (getOthersItemRequests as jest.Mock).mockResolvedValue({});
        const emptyStore = mockStore({
            loader: { value: false },
        });
        render(
            <Provider store={emptyStore}>
                <BrowserRouter>
                    <HomePage />
                </BrowserRouter>
            </Provider>
        );
        expect(screen.getByText("Lets Start Bidding")).toBeInTheDocument();
    });

    it("should display a message when there are no item requests", () => {
        (getOthersItemRequests as jest.Mock).mockResolvedValue({});
        const emptyStore = mockStore({
            loader: { value: false },
        });
        render(
            <Provider store={emptyStore}>
                <BrowserRouter>
                    <HomePage />
                </BrowserRouter>
            </Provider>
        );
        expect(
            screen.getByText("No requests to show right now. Check back later.")
        ).toBeInTheDocument();
    });
});
