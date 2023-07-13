import "@components/Loader/styles.scss";

const Loader = () => {
    return (
        <div className="container-fluid loader-container">
            <div className="col">
                <div className="row justify-content-center align-items-center spinner-row">
                    <div className="spinner-border"></div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
