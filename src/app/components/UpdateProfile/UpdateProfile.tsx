import "@components/SignUpForm/style.scss";
import { UpdateProfileProps } from "@components/UpdateProfile/types";
import { AUTH_VALIDATION } from "@constants/constants";

/**
 * Update Profile Form component
 */
const UpdateProfile = ({ handleUpdateProfile }: UpdateProfileProps) => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-10 col-md-8 col-lg-6 auth-form">
                    <div className="row align-items-center justify-content-center">
                        <h3 className="text-center">
                            Please Update Your Profile First
                        </h3>
                    </div>

                    <form onSubmit={handleUpdateProfile}>
                        <div className="row form-row align-items-center justify-content-around">
                            <div className="col-2 field-heading">Name</div>
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

                        <div className="row form-row align-items-center justify-content-around">
                            <div className="col-2 field-heading">
                                House & Locality
                            </div>
                            <div className="form-outline col-10">
                                <input
                                    type="text"
                                    id="houseAndLocality"
                                    placeholder="House and Locality"
                                    className="form-control"
                                    required
                                    minLength={AUTH_VALIDATION.addressMinLength}
                                    maxLength={AUTH_VALIDATION.addressMaxLength}
                                />
                            </div>
                        </div>

                        <div className="row form-row align-items-center justify-content-around">
                            <div className="col-2 field-heading">City</div>
                            <div className="form-outline col-10">
                                <input
                                    type="text"
                                    id="city"
                                    placeholder="City"
                                    className="form-control"
                                    required
                                    minLength={AUTH_VALIDATION.addressMinLength}
                                    maxLength={AUTH_VALIDATION.addressMaxLength}
                                />
                            </div>
                        </div>

                        <div className="row form-row align-items-center justify-content-around">
                            <div className="col-2 field-heading">State</div>
                            <div className="form-outline col-10">
                                <input
                                    type="text"
                                    id="state"
                                    placeholder="State"
                                    className="form-control"
                                    required
                                    minLength={AUTH_VALIDATION.addressMinLength}
                                    maxLength={AUTH_VALIDATION.addressMaxLength}
                                />
                            </div>
                        </div>

                        <div className="row form-row align-items-center justify-content-around">
                            <div className="col-2 field-heading">Zipcode</div>
                            <div className="form-outline col-10">
                                <input
                                    type="text"
                                    id="zipcode"
                                    placeholder="Zipcode"
                                    className="form-control"
                                    required
                                    minLength={AUTH_VALIDATION.addressMinLength}
                                    maxLength={AUTH_VALIDATION.addressMaxLength}
                                />
                            </div>
                        </div>

                        <div className="d-flex justify-content-center">
                            <button
                                type="submit"
                                className="btn btn-primary primary-button"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;
