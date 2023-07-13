import { showBidProps } from "@components/ShowBid/types";

/**
 * Component to show item request
 */
const ShowBid = ({
    bidsArray,
    selfItemRequest,
    handleBidPayNow,
}: showBidProps) => {
    return (
        <>
            {bidsArray.map((bid, index) => (
                <div
                    key={index}
                    data-testid="item-request"
                    className="row item-row align-items-start justify-content-center"
                >
                    <div className="row">
                        <div className="row field-heading">Description</div>
                        <div className="row text-break description-field">
                            {bid.description}
                        </div>
                    </div>

                    {bid.imageUrlList && (
                        <div className="row">
                            <div className="row field-heading">Images</div>
                            {bid.imageUrlList.map((imgageFile, index) => (
                                <div className="col-auto" key={index}>
                                    <img
                                        src={imgageFile}
                                        className="bid-image"
                                        alt="Bid Image"
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {!selfItemRequest && (
                        <div className="bottom-box row justify-content-start">
                            <div className="row">
                                <div className="col-3 field-heading">
                                    Price (&#8377;)
                                </div>
                                <div className="col-6">{bid.price}</div>
                            </div>
                        </div>
                    )}
                    {!selfItemRequest &&
                        bid.paymentStatus &&
                        bid.paymentStatus === "Pending" && (
                            <div className="col-4">
                                <button
                                    className="btn btn-primary pay-button"
                                    onClick={() => {
                                        handleBidPayNow();
                                    }}
                                >
                                    Pay Now
                                </button>
                            </div>
                        )}
                </div>
            ))}
        </>
    );
};

export default ShowBid;
