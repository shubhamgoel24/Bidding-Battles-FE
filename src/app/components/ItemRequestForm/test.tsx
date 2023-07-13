import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import ItemRequestForm from "@components/ItemRequestForm";

describe("ItemRequest Component", () => {
    // Mock function for handleItemRequest
    const mockHandleItemRequest = jest.fn(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
        }
    );

    beforeEach(() => {
        // Reset mock function before each test
        mockHandleItemRequest.mockClear();
    });

    it("should render correctly", () => {
        render(
            <BrowserRouter>
                <ItemRequestForm handleItemRequest={mockHandleItemRequest} />
            </BrowserRouter>
        );

        // Assert that the form elements are rendered correctly
        expect(
            screen.getByText("Place Request for an Item")
        ).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
        expect(screen.getByText("Create Request")).toBeInTheDocument();
    });

    it("should handle form submission correctly", () => {
        render(
            <BrowserRouter>
                <ItemRequestForm handleItemRequest={mockHandleItemRequest} />
            </BrowserRouter>
        );

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

        // Assert that handleItemRequest function is called
        expect(mockHandleItemRequest).toHaveBeenCalledTimes(1);
    });

    it("should render not older than field when selecting Pre-owned in status", () => {
        render(
            <BrowserRouter>
                <ItemRequestForm handleItemRequest={mockHandleItemRequest} />
            </BrowserRouter>
        );

        // Simulate user input
        fireEvent.change(screen.getByTestId("status-select"), {
            target: { value: "Pre-owned" },
        });

        // Assert that not older than field is visible
        expect(
            screen.getByPlaceholderText("Not Older Than (in Months)")
        ).toBeVisible();
    });
});
