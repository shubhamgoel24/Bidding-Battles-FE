import "@components/BidForm/style.scss";
import { UpdateBidFormProps } from "@components/UpdateBidForm/types";

/**
 * Bid Form Component
 */
const UpdateBidForm = ({
    handleBidUpdate,
    maxPrice,
    currentMinPrice,
}: UpdateBidFormProps) => {
    return (
        <div className="container">
            <div className="row align-items-center justify-content-center">
                <div className="col-10 bid-form">
                    <div className="row align-items-center justify-content-center">
                        <h3 className="text-center">Live Bidding</h3>
                    </div>
                    <form
                        id="bid-form"
                        onSubmit={(event) => handleBidUpdate(event)}
                    >
                        <div className="row form-row align-items-start justify-content-center">
                            <div className="col-3">
                                Current Min Price (&#8377;)
                            </div>
                            <div className="col-9">{currentMinPrice}</div>
                        </div>
                        <div className="row form-row align-items-start justify-content-center">
                            <div className="col-3">Price (&#8377;)</div>
                            <div className="form-outline col-9">
                                <input
                                    type="number"
                                    id="price"
                                    placeholder="Price"
                                    className="form-control"
                                    required
                                    step="any"
                                    min={0}
                                    max={maxPrice}
                                />
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button
                                data-testid="submit-button"
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

export default UpdateBidForm;
