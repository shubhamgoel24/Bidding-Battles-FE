import { act, render, fireEvent, screen } from "@testing-library/react";

import UpdateProfile from "@components/UpdateProfile";

describe("UpdateProfile", () => {
    const handleUpdateProfile = jest.fn((event) => event.preventDefault());

    it("should render form with correct input fields and submit button", () => {
        render(<UpdateProfile handleUpdateProfile={handleUpdateProfile} />);

        // Verify form elements are rendered
        expect(
            screen.getByText("Please Update Your Profile First")
        ).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("City")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("State")).toBeInTheDocument();
        expect(screen.getByText("Update")).toBeInTheDocument();
    });

    it("should call handleUpdateProfile function on form submit", () => {
        render(<UpdateProfile handleUpdateProfile={handleUpdateProfile} />);

        const nameInput = screen.getByPlaceholderText("Name");
        const houseAndLocalityInput =
            screen.getByPlaceholderText("House and Locality");
        const cityInput = screen.getByPlaceholderText("City");
        const stateInput = screen.getByPlaceholderText("State");
        const zipcodeInput = screen.getByPlaceholderText("Zipcode");
        const updateButton = screen.getByText("Update");

        // Enter input values
        fireEvent.change(houseAndLocalityInput, {
            target: { value: "N1, MainStreet" },
        });
        fireEvent.change(nameInput, { target: { value: "John Doe" } });
        fireEvent.change(cityInput, { target: { value: "New York" } });
        fireEvent.change(stateInput, { target: { value: "NY" } });
        fireEvent.change(zipcodeInput, { target: { value: "10001" } });

        // Submit form
        act(() => {
            updateButton.click();
        });

        // Verify handleUpdateProfile function is called with correct input values
        expect(handleUpdateProfile).toBeCalledTimes(1);
        expect(handleUpdateProfile).toBeCalledWith(
            expect.objectContaining({
                target: expect.objectContaining({
                    elements: expect.objectContaining({
                        name: expect.objectContaining({
                            value: "John Doe",
                        }),
                        houseAndLocality: expect.objectContaining({
                            value: "N1, MainStreet",
                        }),
                        city: expect.objectContaining({
                            value: "New York",
                        }),
                        state: expect.objectContaining({
                            value: "NY",
                        }),
                        zipcode: expect.objectContaining({
                            value: "10001",
                        }),
                    }),
                }),
            })
        );
    });
});
