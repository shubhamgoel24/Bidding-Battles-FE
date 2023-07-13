import { fireEvent, render, screen } from "@testing-library/react";

import BidForm from "@components/BidForm";

describe("BidForm Component", () => {
    const handleBidSubmit = jest.fn();

    beforeEach(() => {
        handleBidSubmit.mockClear();
    });

    test("should render input fields and submit button", () => {
        render(
            <BidForm
                handleBidSubmit={handleBidSubmit}
                maxPrice={100}
                priceValidationError=""
                descriptionValidationError=""
                setPriceValidationError={() => {}}
                setDescriptionValidationError={() => {}}
            />
        );
        expect(screen.getByPlaceholderText("Price")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
        expect(screen.getByTestId("file-field")).toBeInTheDocument();
        expect(screen.getByTestId("submit-button")).toBeInTheDocument();
    });

    test("should handle form submission with valid data", () => {
        render(
            <BidForm
                handleBidSubmit={handleBidSubmit}
                maxPrice={100}
                priceValidationError=""
                descriptionValidationError=""
                setPriceValidationError={() => {}}
                setDescriptionValidationError={() => {}}
            />
        );
        const priceInput = screen.getByPlaceholderText("Price");
        const descriptionInput = screen.getByPlaceholderText("Description");
        const fileInput = screen.getByTestId("file-field");

        fireEvent.change(priceInput, { target: { value: "50" } });
        fireEvent.change(descriptionInput, {
            target: { value: "Lorem ipsum dolor sit amet." },
        });
        fireEvent.change(fileInput, {
            target: { files: [new File([], "image.png")] },
        });
        fireEvent.submit(screen.getByTestId("submit-button"));

        expect(handleBidSubmit).toHaveBeenCalledTimes(1);
        expect(handleBidSubmit).toHaveBeenCalledWith(
            expect.anything(),
            expect.anything()
        );
    });
});
