import { useNavigate } from "react-router-dom";

import { Timestamp } from "firebase/firestore";

import { showItemRequestProps } from "@components/ShowItemRequest/types";
import { ROUTE_PATHS } from "@constants/routePaths";

/**
 * Component to show item request
 */
const ShowItemRequest = ({
    itemRequestArray,
    showViewMore,
    handleItemRequestPayNow,
}: showItemRequestProps) => {
    const navigate = useNavigate();
    return (
        <>
            {itemRequestArray.map((request, index) => (
                <div
                    key={index}
                    data-testid="item-request"
                    className="row item-row align-items-start justify-content-center"
                >
                    <div className="col-6 col-left">
                        <div className="row">
                            <div className="col-5 field-heading">Name</div>
                            <div className="col-7 text-break">
                                {request.name}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5 field-heading">
                                Number of Items
                            </div>
                            <div className="col-7">{request.numberOfItems}</div>
                        </div>
                        <div className="row">
                            <div className="col-5 field-heading">
                                Item Condition
                            </div>
                            <div className="col-7">{request.status}</div>
                        </div>
                        {request.notOlderThan && (
                            <div className="row">
                                <div className="col-5 field-heading">
                                    Not Older Than
                                </div>
                                <div className="col-7">
                                    {request.notOlderThan} Months
                                </div>
                            </div>
                        )}
                        <div className="row">
                            <div className="col-5 field-heading">
                                Request Created on
                            </div>
                            <div className="col-7">
                                {showViewMore
                                    ? new Date(
                                          Date.parse(request.requestCreateTime)
                                      ).toLocaleString([], {
                                          dateStyle: "long",
                                          timeStyle: "short",
                                          hour12: true,
                                      })
                                    : (
                                          request.requestCreateTime as unknown as Timestamp
                                      )
                                          .toDate()
                                          .toLocaleString([], {
                                              dateStyle: "long",
                                              timeStyle: "short",
                                              hour12: true,
                                          })}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5 field-heading">
                                Live Bidding Starts on
                            </div>
                            <div className="col-7">
                                {showViewMore
                                    ? new Date(
                                          Date.parse(request.liveBiddingTime)
                                      ).toLocaleString([], {
                                          dateStyle: "long",
                                          timeStyle: "short",
                                          hour12: true,
                                      })
                                    : (
                                          request.liveBiddingTime as unknown as Timestamp
                                      )
                                          .toDate()
                                          .toLocaleString([], {
                                              dateStyle: "long",
                                              timeStyle: "short",
                                              hour12: true,
                                          })}
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-right align-items-space-between">
                        <div className="row">
                            <div className="row field-heading">Description</div>
                            <div className="row text-break description-field">
                                {request.description}
                            </div>
                        </div>
                        <div className="bottom-box row justify-content-start">
                            <div className="row">
                                <div className="col-3 field-heading">
                                    Max Price (&#8377;)
                                </div>
                                <div className="col-5">{request.maxPrice}</div>
                                {showViewMore &&
                                    (request.paymentStatus &&
                                    request.paymentStatus === "Pending" ? (
                                        <div className="col-4">
                                            <button
                                                className="btn btn-primary pay-button"
                                                onClick={() => {
                                                    handleItemRequestPayNow(
                                                        request.id
                                                    );
                                                }}
                                                disabled={
                                                    new Date(
                                                        Date.parse(
                                                            request.liveBiddingTime
                                                        )
                                                    ) < new Date()
                                                }
                                            >
                                                Pay Now
                                            </button>
                                        </div>
                                    ) : request.biddingStatus === "Closed" ? (
                                        <div className="col-4">
                                            <button
                                                className="btn btn-primary view-more-button"
                                                onClick={() => {
                                                    navigate(
                                                        `${ROUTE_PATHS.itemRequest}${request.id}`
                                                    );
                                                }}
                                            >
                                                Result
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="col-4">
                                            <button
                                                className="btn btn-primary view-more-button"
                                                onClick={() => {
                                                    navigate(
                                                        `${ROUTE_PATHS.itemRequest}${request.id}`
                                                    );
                                                }}
                                            >
                                                View More
                                            </button>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ShowItemRequest;
