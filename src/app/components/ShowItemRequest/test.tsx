import { BrowserRouter } from "react-router-dom";

import { render, screen } from "@testing-library/react";

import ShowItemRequest from "@components/ShowItemRequest";
import { mockItemRequestArray } from "@constants/mockdata";

describe("ShowItemRequest component", () => {
    it("should render the correct number of item requests", () => {
        render(
            <BrowserRouter>
                <ShowItemRequest
                    itemRequestArray={mockItemRequestArray}
                    showViewMore={true}
                    handleItemRequestPayNow={() => {}}
                />
            </BrowserRouter>
        );
        const requestElements = screen.getAllByTestId("item-request");
        expect(requestElements.length).toBe(mockItemRequestArray.length);
    });

    it("should render the name of each item request", () => {
        render(
            <BrowserRouter>
                <ShowItemRequest
                    itemRequestArray={mockItemRequestArray}
                    showViewMore={true}
                    handleItemRequestPayNow={() => {}}
                />
            </BrowserRouter>
        );
        const item1 = screen.getByText("Item 1");
        const item2 = screen.getByText("Item 2");
        expect(item1).toBeInTheDocument();
        expect(item2).toBeInTheDocument();
    });
});
