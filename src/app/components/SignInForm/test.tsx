import { screen, render, fireEvent } from "@testing-library/react";

import SignInForm from "@components/SignInForm";

describe("SignInForm component", () => {
    it("should render correctly", () => {
        const handleSignInMock = jest.fn();
        const setShowSignInMock = jest.fn();
        render(
            <SignInForm
                setShowSignIn={() => setShowSignInMock(false)}
                handleSignIn={handleSignInMock}
            />
        );
        const emailInput = screen.getByPlaceholderText("Email");
        const passwordInput = screen.getByPlaceholderText("Password");
        expect(emailInput).toBeVisible();
        expect(passwordInput).toBeVisible();
    });

    it("should call handleSignIn function on form submit", () => {
        const handleSignInMock = jest.fn();
        const setShowSignInMock = jest.fn();
        render(
            <SignInForm
                setShowSignIn={() => setShowSignInMock(false)}
                handleSignIn={handleSignInMock}
            />
        );
        const form = screen.getByTestId("signin-form");
        fireEvent.submit(form);
        expect(handleSignInMock).toHaveBeenCalled();
    });

    it("should set email and password input values correctly", () => {
        const handleSignInMock = jest.fn();
        const setShowSignInMock = jest.fn();
        render(
            <SignInForm
                setShowSignIn={() => setShowSignInMock(false)}
                handleSignIn={handleSignInMock}
            />
        );
        const emailInput = screen.getByPlaceholderText("Email");
        const passwordInput = screen.getByPlaceholderText("Password");

        // Set email and password input values
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });

        // Check if email and password input values are set correctly
        expect((emailInput as HTMLInputElement).value).toBe("test@example.com");
        expect((passwordInput as HTMLInputElement).value).toBe("password123");
    });
});
