import { ChangeEvent, useState } from "react";
import { Envelope, Person } from "react-bootstrap-icons";

import { InviteUsersProps } from "@components/InviteUsers/types";
import "@components/SignUpForm/style.scss";
import { AUTH_VALIDATION } from "@constants/constants";

/**
 * Invite Users Component
 */
const InviteUsers = ({
    inviteViaCsv,
    setInviteViaCsv,
    handleInviteRequest,
}: InviteUsersProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    /**
     * Function to handle selecting csv file
     * @param event
     */
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        setSelectedFile(file || null);
    };

    return (
        <div className="col-10 col-md-8 col-lg-6 col-xl-5 auth-form">
            <div className="row align-items-center justify-content-center">
                <h3 className="text-center">Invite User</h3>
            </div>
            <form
                onSubmit={(event) => handleInviteRequest(event, selectedFile)}
            >
                {inviteViaCsv ? (
                    <>
                        <div className="row justify-content-center">
                            <div className="col-10">
                                <div className="row justify-content-center">
                                    Accepted CSV Format
                                </div>
                                <div className="row justify-content-center">
                                    <table className="table table-bordered">
                                        <tr>
                                            <th>name</th>
                                            <th>email</th>
                                        </tr>
                                        <tr>
                                            <td>Name1</td>
                                            <td>email1@example.com</td>
                                        </tr>
                                        <tr>
                                            <td>Name2</td>
                                            <td>email2@example.com</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="row form-row align-items-start justify-content-around">
                            <div className="form-outline col-10">
                                <input
                                    data-testid="file-field"
                                    type="file"
                                    id="file"
                                    accept=".csv"
                                    className="form-control"
                                    onChange={handleFileChange}
                                    required
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="row form-row align-items-start justify-content-around">
                            <Person className="col-2 bs-icon" />
                            <div className="form-outline col-10">
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Name"
                                    className="form-control"
                                    required
                                    minLength={AUTH_VALIDATION.minNameLength}
                                    maxLength={AUTH_VALIDATION.maxNameLength}
                                />
                            </div>
                        </div>
                        <div className="row form-row align-items-start justify-content-around">
                            <Envelope className="col-2 bs-icon" />
                            <div className="form-outline col-10">
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Email"
                                    className="form-control"
                                    required
                                />
                            </div>
                        </div>
                    </>
                )}

                <div className="d-flex justify-content-center">
                    <button
                        data-testid="submit-button"
                        type="submit"
                        className="btn btn-primary primary-button"
                    >
                        Submit
                    </button>
                </div>

                <div className="d-flex justify-content-center">
                    {inviteViaCsv ? (
                        <button
                            type="button"
                            onClick={() => setInviteViaCsv(false)}
                            className="secondary-button"
                        >
                            Want to invite with email ?
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setInviteViaCsv(true)}
                            className="secondary-button"
                        >
                            Want to invite via CSV ?
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default InviteUsers;
