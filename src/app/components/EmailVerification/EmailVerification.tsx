import { useEffect } from "react";

import { EmailVerificationProps } from "@components/EmailVerification/types";
import "@components/SignUpForm/style.scss";

/**
 * Email Verification Component
 */
const EmailVerification = ({
    handleVerify,
    disableEmailVerifyButton,
    setDisableShowEmailVerifyButton,
    counter,
    setCounter,
}: EmailVerificationProps) => {
    useEffect(() => {
        if (counter > 0) {
            setTimeout(() => setCounter(counter - 1), 1000);
        } else {
            setDisableShowEmailVerifyButton(false);
        }
    }, [counter]);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-10 col-md-8 col-lg-6 col-xl-5 auth-form">
                    <div className="row align-items-center justify-content-center">
                        <h3 className="text-center">
                            Your Email is Not Verified
                        </h3>
                        <h4 className="text-center">
                            Please Refresh Page After Verifying
                        </h4>
                    </div>
                    <div className="row justify-content-center">
                        <button
                            type="button"
                            className="btn btn-primary primary-button"
                            onClick={handleVerify}
                            disabled={disableEmailVerifyButton}
                        >
                            Get Verification Mail
                        </button>
                    </div>
                    {counter !== 0 && (
                        <div className="row justify-content-center">
                            Resend in {counter} Secs
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmailVerification;
