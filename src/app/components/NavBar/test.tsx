import { BrowserRouter } from "react-router-dom";
import { act, render, screen } from "@testing-library/react";

import NavBar from "@components/NavBar";
import { ROUTE_PATHS } from "@constants/routePaths";

describe("NavBar", () => {
    it("should render Navbar component with correct links when not logged in", () => {
        const handleLogout = jest.fn();
        const isLoggedIn = false;
        const docCreated = false;
        render(
            <BrowserRouter>
                <NavBar
                    isLoggedIn={isLoggedIn}
                    docCreated={docCreated}
                    handleLogout={handleLogout}
                />
            </BrowserRouter>
        );

        // Assert that the Home link is rendered with the correct text and route
        const homeLink = screen.getByText("BIDDING BATTLES");
        expect(homeLink).toBeInTheDocument();
        expect(homeLink).toHaveAttribute("href", ROUTE_PATHS.home);
    });

    it("should render Navbar component with correct links when logged in", () => {
        const handleLogout = jest.fn();
        const isLoggedIn = true;
        const docCreated = true;
        render(
            <BrowserRouter>
                <NavBar
                    isLoggedIn={isLoggedIn}
                    docCreated={docCreated}
                    handleLogout={handleLogout}
                />
            </BrowserRouter>
        );

        // Assert that the Home link is rendered with the correct text and route
        const homeLink = screen.getByText("BIDDING BATTLES");
        expect(homeLink).toBeInTheDocument();
        expect(homeLink).toHaveAttribute("href", ROUTE_PATHS.home);

        // Assert that the SignIn/SignUp link is rendered with the correct text and route
        const signInSignUpLink = screen.getByText("Profile");
        expect(signInSignUpLink).toBeInTheDocument();
        expect(signInSignUpLink).toHaveAttribute("href", ROUTE_PATHS.profile);

        const logOutButton = screen.getByText("Logout");
        expect(logOutButton).toBeInTheDocument();
    });

    it("should navigate to the correct routes when links are clicked", () => {
        const handleLogout = jest.fn();
        const isLoggedIn = false;
        const docCreated = false;
        render(
            <BrowserRouter>
                <NavBar
                    isLoggedIn={isLoggedIn}
                    docCreated={docCreated}
                    handleLogout={handleLogout}
                />
            </BrowserRouter>
        );

        // Click on the Home link and assert that it navigates to the correct route
        const homeLink = screen.getByText("BIDDING BATTLES");
        act(() => {
            homeLink.click();
        });

        expect(window.location.pathname).toBe(ROUTE_PATHS.home);
    });

    it("should navigate to the correct routes when logged in", () => {
        const handleLogout = jest.fn();
        const isLoggedIn = true;
        const docCreated = true;
        render(
            <BrowserRouter>
                <NavBar
                    isLoggedIn={isLoggedIn}
                    docCreated={docCreated}
                    handleLogout={handleLogout}
                />
            </BrowserRouter>
        );

        // Click on the Home link and assert that it navigates to the correct route
        const homeLink = screen.getByText("BIDDING BATTLES");
        act(() => {
            homeLink.click();
        });

        expect(window.location.pathname).toBe(ROUTE_PATHS.home);

        const signInSignUpLink = screen.getByText("Profile");
        act(() => {
            signInSignUpLink.click();
        });
        expect(window.location.pathname).toBe(ROUTE_PATHS.profile);

        const logOutButton = screen.getByText("Logout");
        act(() => {
            logOutButton.click();
        });
        expect(handleLogout).toBeCalled();
    });
});
