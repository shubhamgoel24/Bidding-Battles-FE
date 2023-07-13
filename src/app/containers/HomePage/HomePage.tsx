import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ShowItemRequest from "@components/ShowItemRequest";
import { itemRequestTypes } from "@components/ShowItemRequest/types";
import "@containers/HomePage/style.scss";
import { removeLoader, setLoader } from "@reduxSlice/loaderSlice";
import { getOthersItemRequests } from "@services/services";
import { RootState } from "store";
import { checkIfAuthenticated } from "utils/helper";

const HomePage = () => {
    const dispatch = useDispatch();
    const [itemRequestArray, setItemRequestArray] = useState<
        itemRequestTypes[]
    >([]);
    const [lastDocId, setLastDoc] = useState<string | null>("");

    const showLoader = useSelector((state: RootState) => state.loader.value);

    /**
     * Function to handle fetching other user's requests
     */
    const getRequestsData = async () => {
        dispatch(setLoader());
        try {
            let response;
            if (lastDocId) {
                response = await getOthersItemRequests(lastDocId);
            } else {
                response = await getOthersItemRequests("");
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

    useEffect(() => {
        if (lastDocId !== null && checkIfAuthenticated()) {
            getRequestsData();
        }
    }, [lastDocId]);

    return (
        <>
            <div className="container-fluid">
                <h3 className="text-center">Lets Start Bidding</h3>
                <div className="row justify-content-center">
                    <div className="col-11 show-requests">
                        {itemRequestArray.length <= 0 ? (
                            <div className="row item-row justify-content-center">
                                {showLoader
                                    ? "Loading"
                                    : "No requests to show right now. Check back later."}
                            </div>
                        ) : (
                            <ShowItemRequest
                                itemRequestArray={itemRequestArray}
                                showViewMore={true}
                                handleItemRequestPayNow={() => {}}
                            />
                        )}

                        {!showLoader &&
                            (lastDocId !== null ? (
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
                                <div className="row item-row justify-content-center">
                                    No More requests to show.
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
