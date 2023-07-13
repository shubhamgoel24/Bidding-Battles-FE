import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";

import {
    collection,
    DocumentReference,
    doc,
    onSnapshot,
    getDoc,
    query,
    where,
} from "firebase/firestore";

import BidForm from "@components/BidForm";
import ShowBid from "@components/ShowBid";
import { showBidTypes } from "@components/ShowBid/types";
import ShowItemRequest from "@components/ShowItemRequest";
import { itemRequestTypes } from "@components/ShowItemRequest/types";
import UpdateBidForm from "@components/UpdateBidForm";
import { IMAGE_SIZE_LIMIT } from "@constants/constants";
import { RESPONSE_MESSAGES } from "@constants/responseMessages";
import { errorResponseType } from "@containers/AuthPage/types";
import "@containers/HomePage/style.scss";
import { removeLoader, setLoader } from "@reduxSlice/loaderSlice";
import { createNewBid, payForBid, updateBid } from "@services/services";
import { auth, db } from "firebaseApp";
import { RootState } from "store";
import showToast from "utils/helper";

const itemRequestPage = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const [itemRequestArray, setItemRequestArray] = useState<
        itemRequestTypes[]
    >([]);
    const [bidsArray, setBidsArray] = useState<showBidTypes[]>([]);
    const [maxPrice, setMaxPrice] = useState(0);
    const [searchId, setSearchId] = useState<string>("");
    const [isSelfRequest, setIsSelfRequest] = useState(false);
    const [isBiddingClosed, setIsBiddingClosed] = useState(false);
    const [isBidPaymentInProgress, setBidPaymentInProgress] = useState(false);
    const [showBidForm, setShowBidForm] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [priceValidationError, setPriceValidationError] =
        useState<string>("");
    const [descriptionValidationError, setDescriptionValidationError] =
        useState<string>("");

    const showLoader = useSelector((state: RootState) => state.loader.value);

    /**
     * Function to handle fetching other user's requests
     */
    const getItemRequestInfo = async () => {
        dispatch(setLoader());
        try {
            onSnapshot(doc(db, "itemRequests", searchId), (doc) => {
                if (!doc.exists()) {
                    dispatch(removeLoader());
                    return;
                }
                const itemRequestData: itemRequestTypes =
                    doc.data() as itemRequestTypes;
                setItemRequestArray([itemRequestData]);

                if (itemRequestData.biddingStatus === "Closed") {
                    setIsBiddingClosed(true);
                }

                if (auth.currentUser) {
                    if (
                        (
                            itemRequestData.userDocRef as unknown as DocumentReference
                        ).id === auth.currentUser.uid
                    ) {
                        setIsSelfRequest(true);
                        setShowBidForm(false);
                    } else {
                        getBidsInfo();
                        setMaxPrice(itemRequestData.maxPrice);
                    }
                }
            });
        } catch {
            dispatch(removeLoader());
        }
        dispatch(removeLoader());
    };

    /**
     * Function to handle getting bids for the selected item request
     */
    const getBidsInfo = async () => {
        dispatch(setLoader());

        try {
            if (isSelfRequest) {
                if (isBiddingClosed) {
                    if (
                        itemRequestArray[0].winner &&
                        itemRequestArray[0].winningBid
                    ) {
                        const querySnapshot = await getDoc(
                            doc(
                                db,
                                "itemRequests",
                                searchId,
                                "bids",
                                itemRequestArray[0].winningBid
                            )
                        );
                        let bidsData: showBidTypes[] = [
                            querySnapshot.data() as showBidTypes,
                        ];
                        setBidsArray(bidsData);
                    }
                } else {
                    // if item requester is viewing the page then fetch all the bids with successful payment status
                    onSnapshot(
                        query(
                            collection(db, "itemRequests", searchId, "bids"),
                            where("paymentStatus", "==", "Success")
                        ),
                        (docs) => {
                            let bidsData: showBidTypes[] = [];
                            docs.forEach((doc) => {
                                bidsData.push(doc.data() as showBidTypes);
                            });
                            setBidsArray(bidsData);
                        }
                    );
                }
            } else {
                // if bidder is seeing details then only fetch their bid data
                onSnapshot(
                    doc(
                        db,
                        "itemRequests",
                        searchId,
                        "bids",
                        `${auth.currentUser?.uid}`
                    ),
                    (doc) => {
                        if (doc.exists()) {
                            setShowBidForm(false);
                            const bidData: showBidTypes =
                                doc.data() as showBidTypes;
                            setBidsArray([bidData]);
                        }
                    }
                );
            }
        } catch {
            dispatch(removeLoader());
        }

        if (!isBidPaymentInProgress) {
            dispatch(removeLoader());
        }
    };

    useEffect(() => {
        setTimeout(() => {
            const paymentStatus = searchParams.get("status");
            if (paymentStatus === "success") {
                showToast(false, "Payment Success");
                searchParams.delete("status");
                setSearchParams(searchParams);
            } else if (paymentStatus === "canceled") {
                showToast(true, "Payment Failed");
                searchParams.delete("status");
                setSearchParams(searchParams);
            }
        }, 1000);

        const idString = params.itemid

        if (idString && auth.currentUser) {
            setSearchId(idString);
        }
    }, []);

    useEffect(() => {
        if (searchId) {
            getItemRequestInfo();
        }
        if (!showBidForm) {
            getBidsInfo();
        }
    }, [searchId, showBidForm]);

    /**
     * Function to handle submitting bid form and redirecting to payment page
     */
    const handleBidSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
        selectedFiles: FileList | null
    ) => {
        event.preventDefault();
        dispatch(setLoader());

        let bidData = new FormData();
        if (selectedFiles) {
            for (var i = 0; i < selectedFiles.length; i++) {
                if (
                    selectedFiles[i].size > IMAGE_SIZE_LIMIT ||
                    selectedFiles.length > 6
                ) {
                    showToast(true, RESPONSE_MESSAGES.imageOverLimit);
                    dispatch(removeLoader());
                    return;
                }
                bidData.append("files[]", selectedFiles[i]);
            }
        }

        const form = event.currentTarget;
        const formElements = form.elements as typeof form.elements & {
            price: HTMLInputElement;
            description: HTMLInputElement;
        };

        bidData.append("price", formElements.price.value);
        bidData.append("description", formElements.description.value);
        bidData.append("requestId", searchId);
        try {
            setBidPaymentInProgress(true);
            const response = await createNewBid(bidData);
            window.location.href = response.data.url;
        } catch (error: unknown) {
            dispatch(removeLoader());
            if ("error" in (error as errorResponseType).response.data) {
                if (
                    "price" in (error as errorResponseType).response.data.error
                ) {
                    setPriceValidationError(
                        (error as errorResponseType).response.data.error
                            .price[0]
                    );
                }
                if (
                    "description" in
                    (error as errorResponseType).response.data.error
                ) {
                    setDescriptionValidationError(
                        (error as errorResponseType).response.data.error
                            .description[0]
                    );
                }
            } else {
                showToast(
                    true,
                    `${(error as errorResponseType).response.data.message}`
                );
            }
        }
    };

    useEffect(() => {
        getBidsInfo();
    }, [isBiddingClosed]);

    /**
     * Function to handle payment in case payment failed at bid creation
     */
    const handleBidPayNow = async () => {
        dispatch(setLoader());
        const bidPayData = {
            itemId: searchId,
        };
        try {
            const response = await payForBid(bidPayData);
            window.location.href = response.data.url;
        } catch (error: unknown) {
            dispatch(removeLoader());
            showToast(
                true,
                `${(error as errorResponseType).response.data.message}`
            );
        }
    };

    /**
     * Function to handle payment in case payment failed at bid creation
     */
    const handleBidUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(setLoader());

        const form = event.currentTarget;
        const formElements = form.elements as typeof form.elements & {
            price: HTMLInputElement;
        };

        const bidData = {
            itemId: searchId,
            price: formElements.price.value,
        };

        try {
            const response = await updateBid(bidData);
            showToast(false, `${response.data.message}`);
            dispatch(removeLoader());
        } catch (error: unknown) {
            dispatch(removeLoader());
            showToast(
                true,
                `${(error as errorResponseType).response.data.message}`
            );
        }
    };

    return (
        <>
            <div className="container-fluid">
                <h3>Item Request Details</h3>
                <div className="row justify-content-center">
                    <div className="col-11 show-requests">
                        {itemRequestArray.length <= 0 ? (
                            <div className="row item-row justify-content-center">
                                {showLoader
                                    ? "Loading"
                                    : "Invalid Item Request Id"}
                            </div>
                        ) : (
                            <ShowItemRequest
                                itemRequestArray={itemRequestArray}
                                showViewMore={false}
                                handleItemRequestPayNow={() => {}}
                            />
                        )}

                        {isSelfRequest ? (
                            <>
                                {isBiddingClosed ? (
                                    itemRequestArray[0].winner && (
                                        <h3>Winning Bid</h3>
                                    )
                                ) : (
                                    <h3>Bids</h3>
                                )}

                                {bidsArray.length <= 0 ? (
                                    showLoader ? (
                                        <div className="row item-row justify-content-center">
                                            Loading
                                        </div>
                                    ) : (
                                        !isBiddingClosed && (
                                            <div className="row item-row justify-content-center">
                                                No Bids Placed Right Now
                                            </div>
                                        )
                                    )
                                ) : (
                                    <ShowBid
                                        bidsArray={bidsArray}
                                        selfItemRequest={!isBiddingClosed}
                                        handleBidPayNow={() => {}}
                                    />
                                )}
                            </>
                        ) : (
                            !showBidForm &&
                            !isBidPaymentInProgress && (
                                <>
                                    <h3>Your Bid</h3>
                                    <ShowBid
                                        bidsArray={bidsArray}
                                        selfItemRequest={false}
                                        handleBidPayNow={handleBidPayNow}
                                    />
                                </>
                            )
                        )}
                        {isBiddingClosed &&
                            itemRequestArray.length === 1 &&
                            (isSelfRequest ? (
                                <div className="row item-row justify-content-center">
                                    {itemRequestArray[0].winner ? (
                                        <>
                                            Winner Details:{" "}
                                            {itemRequestArray[0].winner}
                                        </>
                                    ) : (
                                        <>
                                            {" "}
                                            Bidding Closed. No one Bid on your
                                            Item Request.{" "}
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className="row item-row justify-content-center">
                                    {itemRequestArray[0].winner &&
                                    itemRequestArray[0].winner ===
                                        auth.currentUser?.email ? (
                                        <>
                                            <div className="field-heading">
                                                You Won
                                            </div>
                                            <div>
                                                Requester Details:{" "}
                                                {itemRequestArray[0].requester}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            Bidding Closed. You didn't win.
                                            Better luck next time.
                                        </>
                                    )}
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            {!isSelfRequest &&
                itemRequestArray.length === 1 &&
                !isBiddingClosed &&
                (showBidForm ? (
                    <BidForm
                        handleBidSubmit={handleBidSubmit}
                        maxPrice={maxPrice}
                        priceValidationError={priceValidationError}
                        descriptionValidationError={descriptionValidationError}
                        setPriceValidationError={(msg: string) =>
                            setPriceValidationError(msg)
                        }
                        setDescriptionValidationError={(msg: string) =>
                            setDescriptionValidationError(msg)
                        }
                    />
                ) : (
                    itemRequestArray[0].isLive &&
                    itemRequestArray[0].minBidPrice !== undefined &&
                    bidsArray.length === 1 &&
                    bidsArray[0].paymentStatus === "Success" && (
                        <UpdateBidForm
                            handleBidUpdate={handleBidUpdate}
                            maxPrice={maxPrice}
                            currentMinPrice={itemRequestArray[0].minBidPrice}
                        />
                    )
                ))}
        </>
    );
};

export default itemRequestPage;
