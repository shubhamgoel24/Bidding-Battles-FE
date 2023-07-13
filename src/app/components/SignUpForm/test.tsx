import { screen, render, fireEvent } from "@testing-library/react";

import SignUpForm from "@components/SignUpForm";

describe("SignUpForm component", () => {
    it("should render correctly", () => {
        const handleSignUpMock = jest.fn();
        const setShowSignInMock = jest.fn();
        render(
            <SignUpForm
                setShowSignIn={() => setShowSignInMock(true)}
                handleSignUp={handleSignUpMock}
            />
        );
        const emailInput = screen.getByPlaceholderText("Email");
        const passwordInput = screen.getByPlaceholderText("Password");
        const confirmPasswordInput =
            screen.getByPlaceholderText("Confirm Password");
        expect(emailInput).toBeVisible();
        expect(passwordInput).toBeVisible();
        expect(confirmPasswordInput).toBeVisible();
    });

    it("should call handleSignUp function on form submit", () => {
        const handleSignUpMock = jest.fn();
        const setShowSignInMock = jest.fn();
        render(
            <SignUpForm
                setShowSignIn={() => setShowSignInMock(true)}
                handleSignUp={handleSignUpMock}
            />
        );
        const form = screen.getByTestId("signup-form");
        fireEvent.submit(form);
        expect(handleSignUpMock).toHaveBeenCalled();
    });

    it("should set input values correctly", () => {
        const handleSignUpMock = jest.fn();
        const setShowSignInMock = jest.fn();
        render(
            <SignUpForm
                setShowSignIn={() => setShowSignInMock(true)}
                handleSignUp={handleSignUpMock}
            />
        );
        const emailInput = screen.getByPlaceholderText("Email");
        const passwordInput = screen.getByPlaceholderText("Password");
        const confirmPasswordInput =
            screen.getByPlaceholderText("Confirm Password");

        // Set input values
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.change(confirmPasswordInput, {
            target: { value: "password123" },
        });

        // Check input values are set correctly
        expect((emailInput as HTMLInputElement).value).toBe("test@example.com");
        expect((passwordInput as HTMLInputElement).value).toBe("password123");
        expect((confirmPasswordInput as HTMLInputElement).value).toBe(
            "password123"
        );
    });
});
