import { render, fireEvent } from "@testing-library/react";

import EmailVerification from "@components/EmailVerification";

describe("EmailVerification component", () => {
    // Define a mock function for the handleVerify prop
    const handleVerifyMock = jest.fn();

    beforeEach(() => {
        // Reset the mock function before each test
        handleVerifyMock.mockClear();
    });

    it("should render component with correct text", () => {
        const { getByText } = render(
            <EmailVerification
                handleVerify={handleVerifyMock}
                disableEmailVerifyButton={false}
                setDisableShowEmailVerifyButton={() => {}}
                counter={0}
                setCounter={() => {}}
            />
        );

        expect(getByText("Your Email is Not Verified")).toBeInTheDocument();
        expect(
            getByText("Please Refresh Page After Verifying")
        ).toBeInTheDocument();
        expect(getByText("Get Verification Mail")).toBeInTheDocument();
    });

    it("should call handleVerify prop when button is clicked", () => {
        const { getByText } = render(
            <EmailVerification
                handleVerify={handleVerifyMock}
                disableEmailVerifyButton={false}
                setDisableShowEmailVerifyButton={() => {}}
                counter={0}
                setCounter={() => {}}
            />
        );

        const verifyButton = getByText("Get Verification Mail");

        fireEvent.click(verifyButton);

        expect(handleVerifyMock).toHaveBeenCalled();
    });
});
