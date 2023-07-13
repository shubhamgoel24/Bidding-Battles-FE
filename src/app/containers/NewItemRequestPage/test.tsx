import toast from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import configureStore from "redux-mock-store";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { RESPONSE_MESSAGES } from "@constants/responseMessages";
import NewItemRequestPage from "@containers/NewItemRequestPage";
import { createItemRequest } from "@services/services";

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

describe("NewItemRequestPage component", () => {
    beforeEach(() => {
        const emptyStore = mockStore({
            loader: { value: false },
        });
        render(
            <Provider store={emptyStore}>
                <BrowserRouter>
                    <NewItemRequestPage />
                </BrowserRouter>
            </Provider>
        );
    });

    it("should render NewItemRequestPage with item request component", () => {
        // Assert that the form elements are rendered correctly
        expect(
            screen.getByText("Place Request for an Item")
        ).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
        expect(screen.getByText("Create Request")).toBeInTheDocument();
    });

    it("should handle form submission correctly and calls api", async () => {
        (createItemRequest as jest.Mock).mockResolvedValue({
            data: {
                url: "",
            },
        });

        // Simulate user input
        fireEvent.change(screen.getByPlaceholderText("Name"), {
            target: { value: "Phone" },
        });
        fireEvent.change(screen.getByPlaceholderText("Number of Items"), {
            target: { value: "2" },
        });
        fireEvent.change(screen.getByPlaceholderText("Description"), {
            target: { value: "Phone must have 3 cameras and type c charging" },
        });
        fireEvent.change(screen.getByPlaceholderText("Closure Time"), {
            target: {
                value: new Date(
                    new Date().setMinutes(
                        new Date().getMinutes() + (49 + 5.5) * 60
                    )
                )
                    .toISOString()
                    .slice(0, new Date().toISOString().lastIndexOf(":")),
            },
        });
        fireEvent.change(screen.getByPlaceholderText("Max Price"), {
            target: { value: "100" },
        });
        fireEvent.change(screen.getByTestId("status-select"), {
            target: { value: "New" },
        });
        // Simulate form submission
        fireEvent.click(screen.getByText("Create Request"));

        // Assert that createItemRequest function is called
        await waitFor(() => {
            expect(createItemRequest).toHaveBeenCalled();
        });
    });

    it("should handle form submission correctly when status is Pre-owned and calls api", async () => {
        (createItemRequest as jest.Mock).mockResolvedValue({
            data: {
                url: "",
            },
        });

        // Simulate user input
        fireEvent.change(screen.getByPlaceholderText("Name"), {
            target: { value: "Phone" },
        });
        fireEvent.change(screen.getByPlaceholderText("Number of Items"), {
            target: { value: "2" },
        });
        fireEvent.change(screen.getByPlaceholderText("Description"), {
            target: { value: "Phone must have 3 cameras and type c charging" },
        });
        fireEvent.change(screen.getByPlaceholderText("Closure Time"), {
            target: {
                value: new Date(
                    new Date().setMinutes(
                        new Date().getMinutes() + (49 + 5.5) * 60
                    )
                )
                    .toISOString()
                    .slice(0, new Date().toISOString().lastIndexOf(":")),
            },
        });
        fireEvent.change(screen.getByPlaceholderText("Max Price"), {
            target: { value: "100" },
        });
        fireEvent.change(screen.getByTestId("status-select"), {
            target: { value: "Pre-owned" },
        });

        await waitFor(() => {
            expect(
                screen.getByPlaceholderText("Not Older Than (in Months)")
            ).toBeInTheDocument();
        });

        fireEvent.change(
            screen.getByPlaceholderText("Not Older Than (in Months)"),
            {
                target: { value: "2" },
            }
        );
        // Simulate form submission
        fireEvent.click(screen.getByText("Create Request"));

        // Assert that createItemRequest function is called
        await waitFor(() => {
            expect(createItemRequest).toHaveBeenCalled();
        });
    });

    it("should handle error when calling createItemRequest api", async () => {
        (createItemRequest as jest.Mock).mockRejectedValueOnce({
            response: {
                data: {
                    message: "Invalid Request.",
                },
            },
        });
        (toast.error as jest.Mock).mockResolvedValueOnce("ok");

        // Simulate user input
        fireEvent.change(screen.getByPlaceholderText("Name"), {
            target: { value: "Phone" },
        });
        fireEvent.change(screen.getByPlaceholderText("Number of Items"), {
            target: { value: "2" },
        });
        fireEvent.change(screen.getByPlaceholderText("Description"), {
            target: { value: "Phone must have 3 cameras and type c charging" },
        });
        fireEvent.change(screen.getByPlaceholderText("Closure Time"), {
            target: {
                value: new Date(
                    new Date().setMinutes(
                        new Date().getMinutes() + (49 + 5.5) * 60
                    )
                )
                    .toISOString()
                    .slice(0, new Date().toISOString().lastIndexOf(":")),
            },
        });
        fireEvent.change(screen.getByPlaceholderText("Max Price"), {
            target: { value: "100" },
        });
        fireEvent.change(screen.getByTestId("status-select"), {
            target: { value: "New" },
        });
        // Simulate form submission
        fireEvent.click(screen.getByText("Create Request"));

        // Assert that createItemRequest function is called
        await waitFor(() => {
            expect(createItemRequest).toHaveBeenCalled();
            expect(toast.error).toHaveBeenCalledWith("Invalid Request.");
        });
    });
});
