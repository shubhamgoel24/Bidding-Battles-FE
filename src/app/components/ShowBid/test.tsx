import { render } from "@testing-library/react";

import ShowItemRequest from "@components/ShowBid";
import { showBidTypes } from "@components/ShowBid/types";

describe("ShowItemRequest component", () => {
    const bidsArray: showBidTypes[] = [
        {
            description: "Example item description",
            imageUrlList: ["https://example.com/image1.jpg"],
            price: 100,
        },
        {
            description: "Another item description",
            imageUrlList: ["https://example.com/image3.jpg"],
            price: 200,
        },
    ];

    it("should render the correct number of item requests", () => {
        const { getAllByTestId } = render(
            <ShowItemRequest
                bidsArray={bidsArray}
                selfItemRequest={false}
                handleBidPayNow={() => {}}
            />
        );
        expect(getAllByTestId("item-request")).toHaveLength(bidsArray.length);
    });

    it("should display the correct item information", () => {
        const { getByText, getAllByRole } = render(
            <ShowItemRequest
                bidsArray={bidsArray}
                selfItemRequest={false}
                handleBidPayNow={() => {}}
            />
        );
        expect(getByText("Example item description")).toBeInTheDocument();
        expect(getByText("Another item description")).toBeInTheDocument();
        expect(getAllByRole("img")).toHaveLength(2);
        expect(getByText("100")).toBeInTheDocument();
        expect(getByText("200")).toBeInTheDocument();
    });

    it("should not display the price if it is a self item request", () => {
        const { queryByText } = render(
            <ShowItemRequest
                bidsArray={bidsArray}
                selfItemRequest={true}
                handleBidPayNow={() => {}}
            />
        );
        expect(queryByText("100")).toBeNull();
        expect(queryByText("200")).toBeNull();
    });
});
