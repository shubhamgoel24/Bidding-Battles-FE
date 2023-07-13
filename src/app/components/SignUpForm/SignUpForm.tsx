import { Envelope, Key } from "react-bootstrap-icons";

import "@components/SignUpForm/style.scss";
import { AuthSignUpProps } from "@components/SignUpForm/types";
import { AUTH_VALIDATION } from "@constants/constants";

/**
 * SignUp Form component
 */
const SignUpForm = ({ setShowSignIn, handleSignUp }: AuthSignUpProps) => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-10 col-md-8 col-lg-6 col-xl-5 auth-form">
                    <div className="row align-items-center justify-content-center">
                        <h3 className="text-center">
                            Sign Up
                        </h3>
                    </div>

                    <form onSubmit={handleSignUp} data-testid="signup-form">
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

                        <div className="row form-row align-items-start justify-content-around">
                            <Key className="col-2 bs-icon" />
                            <div className="form-outline col-10">
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    className="form-control"
                                    required
                                    minLength={
                                        AUTH_VALIDATION.minPasswordLength
                                    }
                                    maxLength={
                                        AUTH_VALIDATION.maxPasswordLength
                                    }
                                />
                            </div>
                        </div>

                        <div className="row form-row align-items-start justify-content-around">
                            <Key className="col-2 bs-icon" />
                            <div className="form-outline col-10">
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="Confirm Password"
                                    className="form-control"
                                    required
                                    minLength={
                                        AUTH_VALIDATION.minPasswordLength
                                    }
                                    maxLength={
                                        AUTH_VALIDATION.maxPasswordLength
                                    }
                                />
                            </div>
                        </div>

                        <div className="d-flex justify-content-center">
                            <button
                                type="submit"
                                className="btn btn-primary primary-button"
                            >
                                Register
                            </button>
                        </div>

                        <div className="row justify-content-center">
                            <button
                                type="button"
                                onClick={setShowSignIn}
                                className="btn-light secondary-button"
                            >
                                Already Have An Account ? Log In Here.
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
