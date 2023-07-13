import "@components/SignUpForm/style.scss";

/**
 * 404 Page Component
 */
const InvalidUrlPage = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-10 col-md-8 col-lg-6 col-xl-5 auth-form">
                    <div className="row align-items-center justify-content-center">
                        <h3 className="text-center">404 Page Not Found</h3>
                        <h4 className="text-center">
                            You seems to have lost. Recheck the url and try
                            again.
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvalidUrlPage;
