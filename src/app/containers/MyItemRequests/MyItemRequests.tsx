import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useSearchParams } from "react-router-dom";

import ShowItemRequest from "@components/ShowItemRequest";
import { itemRequestTypes } from "@components/ShowItemRequest/types";
import { ROUTE_PATHS } from "@constants/routePaths";
import { errorResponseType } from "@containers/AuthPage/types";
import "@containers/MyItemRequests/style.scss";
import { removeLoader, setLoader } from "@reduxSlice/loaderSlice";
import { getMyItemRequests, payForItemRequest } from "@services/services";
import { RootState } from "store";
import showToast, { checkIfAuthenticated } from "utils/helper";

const MyItemRequests = () => {
    const dispatch = useDispatch();
    const [itemRequestArray, setItemRequestArray] = useState<
        itemRequestTypes[]
    >([]);
    const [lastDocId, setLastDoc] = useState<string | null>("");
    const [searchParams, setSearchParams] = useSearchParams();

    const paymentStatus = searchParams.get("status");
    const showLoader = useSelector((state: RootState) => state.loader.value);

    /**
     * Function to handle fetching user's requests
     */
    const getRequestsData = async () => {
        dispatch(setLoader());
        try {
            let response;
            if (lastDocId) {
                response = await getMyItemRequests(lastDocId);
            } else {
                response = await getMyItemRequests();
            }
            if (response.data.data.length < 5) {
                setLastDoc(null);
            }
            setItemRequestArray([...itemRequestArray, ...response.data.data]);
        } catch {
            setLastDoc(null);
            dispatch(removeLoader());
        }
        dispatch(removeLoader());
    };

    /**
     * Function to handle payment for item request if payment failed at item request creation
     */
    const handleItemRequestPayNow = async (itemRequestId: string) => {
        dispatch(setLoader());
        const itemPayData = {
            itemId: itemRequestId,
        };
        try {
            const response = await payForItemRequest(itemPayData);
            window.location.href = response.data.url;
        } catch (error: unknown) {
            dispatch(removeLoader());
            showToast(
                true,
                `${(error as errorResponseType).response.data.message}`
            );
        }
    };

    useEffect(() => {
        setTimeout(() => {
            if (paymentStatus === "success") {
                showToast(false, "Payment Success");
                setSearchParams("");
            } else if (paymentStatus === "canceled") {
                showToast(true, "Payment Failed");
                setSearchParams("");
            }
        }, 1000);
    }, []);

    useEffect(() => {
        if (lastDocId !== null && checkIfAuthenticated()) {
            getRequestsData();
        }
    }, [lastDocId]);

    return (
        <>
            <div className="container-fluid">
                <h3 className="text-center">Your Item Requests</h3>
                <div className="row justify-content-center">
                    <div className="col-11 show-my-requests">
                        {itemRequestArray.length <= 0 ? (
                            <div className="row item-row justify-content-center">
                                {showLoader
                                    ? "Loading"
                                    : "Why so lonely ? Create a new request to steal some deals."}
                            </div>
                        ) : (
                            <ShowItemRequest
                                itemRequestArray={itemRequestArray}
                                showViewMore={true}
                                handleItemRequestPayNow={
                                    handleItemRequestPayNow
                                }
                            />
                        )}
                    </div>
                </div>
                {!showLoader && lastDocId !== null ? (
                    <div className="row justify-content-center">
                        <button
                            className="btn btn-primary secondary-button"
                            onClick={() =>
                                setLastDoc(
                                    itemRequestArray[
                                        itemRequestArray.length - 1
                                    ].id
                                )
                            }
                        >
                            Load More
                        </button>
                    </div>
                ) : (
                    <></>
                )}
            </div>

            <NavLink
                to={ROUTE_PATHS.newItemRequest}
                className="btn btn-primary btn-float"
            >
                Create New Request
            </NavLink>
        </>
    );
};

export default MyItemRequests;
