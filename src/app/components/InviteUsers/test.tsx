import { render, fireEvent, screen, waitFor } from "@testing-library/react";

import InviteUsers from "@components/InviteUsers";

describe("InviteUsers Component", () => {
    it("should render correctly", () => {
        const mockProps = {
            inviteViaCsv: false,
            setInviteViaCsv: jest.fn(),
            handleInviteRequest: jest.fn(),
        };

        render(<InviteUsers {...mockProps} />);

        // Assert that the component renders with the correct text and placeholders
        expect(screen.getByText("Invite User")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
        expect(screen.getByText("Submit")).toBeInTheDocument();
        expect(
            screen.getByText("Want to invite via CSV ?")
        ).toBeInTheDocument();
    });

    it("should handle form submission correctly", () => {
        let inviteViaCsv = false;
        const setInviteViaCsv = jest.fn((value: boolean) => {
            inviteViaCsv = value;
        });
        const handleInviteRequest = jest.fn((event) => event.preventDefault());

        // Render the component with mock props
        render(
            <InviteUsers
                inviteViaCsv={inviteViaCsv}
                setInviteViaCsv={setInviteViaCsv}
                handleInviteRequest={handleInviteRequest}
            />
        );

        // Fill in the form fields
        const nameInput = screen.getByPlaceholderText("Name");
        fireEvent.change(nameInput, { target: { value: "John Doe" } });

        const emailInput = screen.getByPlaceholderText("Email");
        fireEvent.change(emailInput, {
            target: { value: "john.doe@example.com" },
        });

        // Submit the form
        const submitButton = screen.getByText("Submit");
        fireEvent.click(submitButton);

        // Assert that the handleInviteRequest prop function is called
        expect(handleInviteRequest).toHaveBeenCalledTimes(1);
    });

    it("should toggle between inviteViaCsv state correctly", async () => {
        let inviteViaCsv = false;
        const setInviteViaCsv = jest.fn((value: boolean) => {
            inviteViaCsv = value;
        });
        const setSelectedFile = jest.fn();
        const handleInviteRequest = jest.fn((event) => event.preventDefault());

        // Render the component with mock props
        const { rerender } = render(
            <InviteUsers
                inviteViaCsv={inviteViaCsv}
                setInviteViaCsv={setInviteViaCsv}
                handleInviteRequest={handleInviteRequest}
            />
        );

        // Click on the "Want to invite via CSV ?" button
        const csvButton = screen.getByText("Want to invite via CSV ?");
        fireEvent.click(csvButton);

        // Assert that the setInviteViaCsv prop function is called with true
        expect(setInviteViaCsv).toHaveBeenCalledTimes(1);
        expect(setInviteViaCsv).toHaveBeenCalledWith(true);

        rerender(
            <InviteUsers
                inviteViaCsv={inviteViaCsv}
                setInviteViaCsv={setInviteViaCsv}
                handleInviteRequest={handleInviteRequest}
            />
        );

        // Click on the "Want to invite with email ?" button
        const toggleButton = screen.getByText("Want to invite with email ?");
        fireEvent.click(toggleButton);

        // Assert that the setInviteViaCsv prop function is called with false
        expect(setInviteViaCsv).toHaveBeenCalledTimes(2);
        expect(setInviteViaCsv).toHaveBeenCalledWith(false);
    });

    it("should handle selecting file in input", async () => {
        let inviteViaCsv = false;
        const setInviteViaCsv = jest.fn((value: boolean) => {
            inviteViaCsv = value;
        });
        const handleInviteRequest = jest.fn((event) => event.preventDefault());

        // Render the component with mock props
        const { rerender } = render(
            <InviteUsers
                inviteViaCsv={inviteViaCsv}
                setInviteViaCsv={setInviteViaCsv}
                handleInviteRequest={handleInviteRequest}
            />
        );

        // Click on the "Want to invite via CSV ?" button
        const csvButton = screen.getByText("Want to invite via CSV ?");
        fireEvent.click(csvButton);

        // Assert that the setInviteViaCsv prop function is called with true
        expect(setInviteViaCsv).toHaveBeenCalledTimes(1);
        expect(setInviteViaCsv).toHaveBeenCalledWith(true);

        rerender(
            <InviteUsers
                inviteViaCsv={inviteViaCsv}
                setInviteViaCsv={setInviteViaCsv}
                handleInviteRequest={handleInviteRequest}
            />
        );

        const file = new File(["name", "email@xyz.com"], "file.csv", {
            type: "text/csv",
        });

        // Click on the "Want to invite with email ?" button
        const fileField = screen.getByTestId("file-field");
        await waitFor(() =>
            fireEvent.change(fileField, {
                target: { files: [file] },
            })
        );
    });
});
