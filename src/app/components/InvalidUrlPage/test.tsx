import { render } from "@testing-library/react";

import InvalidUrlPage from "@components/InvalidUrlPage";

describe("InvalidUrlPage component", () => {
    it("should render the correct text", () => {
        const { getByText } = render(<InvalidUrlPage />);
        expect(getByText("404 Page Not Found")).toBeInTheDocument();
        expect(
            getByText("You seems to have lost. Recheck the url and try again.")
        ).toBeInTheDocument();
    });
});
