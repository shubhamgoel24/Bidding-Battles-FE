import { useState } from "react";
import { NavLink } from "react-router-dom";

import "@components/ItemRequestForm/style.scss";
import { ItemRequestFormProps } from "@components/ItemRequestForm/types";
import { ITEM_REQUEST_VALIDATION } from "@constants/constants";
import { ROUTE_PATHS } from "@constants/routePaths";

/**
 * Item Request Form component
 */
const ItemRequestForm = ({ handleItemRequest }: ItemRequestFormProps) => {
    const [statusValue, setStatusValue] = useState("");

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-11 request-form">
                    <div className="row align-items-center justify-content-center">
                        <NavLink
                            to={ROUTE_PATHS.myItemRequests}
                            className="btn btn-primary col-1"
                        >
                            &#8678; Back
                        </NavLink>
                        <h3 className="text-center col-10">
                            Place Request for an Item
                        </h3>
                    </div>

                    <form onSubmit={handleItemRequest}>
                        <div className="row form-row align-items-center justify-content-around">
                            <div className="col-2">Name</div>
                            <div className="form-outline col-4">
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Name"
                                    className="form-control"
                                    required
                                    minLength={
                                        ITEM_REQUEST_VALIDATION.minItemNameLength
                                    }
                                    maxLength={
                                        ITEM_REQUEST_VALIDATION.maxItemNameLength
                                    }
                                />
                            </div>
                            <div className="col-2">No. Of Items</div>
                            <div className="form-outline col-4">
                                <input
                                    type="number"
                                    id="numberOfItems"
                                    placeholder="Number of Items"
                                    className="form-control"
                                    required
                                    min={
                                        ITEM_REQUEST_VALIDATION.minNumberOfItems
                                    }
                                    max={
                                        ITEM_REQUEST_VALIDATION.maxNumberOfItems
                                    }
                                />
                            </div>
                        </div>

                        <div className="row form-row align-items-center justify-content-around">
                            <div className="col-2">
                                Description (Characters Limit{" "}
                                {
                                    ITEM_REQUEST_VALIDATION.maxItemDescriptionLength
                                }
                                )
                            </div>
                            <div className="form-outline col-10">
                                <textarea
                                    id="description"
                                    placeholder="Description"
                                    className="form-control"
                                    rows={2}
                                    required
                                    minLength={
                                        ITEM_REQUEST_VALIDATION.minItemDescriptionLength
                                    }
                                    maxLength={
                                        ITEM_REQUEST_VALIDATION.maxItemDescriptionLength
                                    }
                                />
                            </div>
                        </div>

                        <div className="row form-row align-items-center justify-content-around">
                            <div className="col-2">Bid Closing Time</div>
                            <div className="form-outline col-4">
                                <input
                                    type="datetime-local"
                                    id="closureTime"
                                    placeholder="Closure Time"
                                    className="form-control"
                                    required
                                    min={ITEM_REQUEST_VALIDATION.minClosureTime}
                                    max={ITEM_REQUEST_VALIDATION.maxClosureTime}
                                />
                            </div>

                            <div className="col-2">Max Price (&#8377;)</div>
                            <div className="form-outline col-4">
                                <input
                                    type="number"
                                    id="maxPrice"
                                    placeholder="Max Price"
                                    className="form-control"
                                    required
                                    step="any"
                                    min={
                                        ITEM_REQUEST_VALIDATION.maxPriceMinValue
                                    }
                                    max={
                                        ITEM_REQUEST_VALIDATION.maxPriceMaxValue
                                    }
                                />
                            </div>
                        </div>

                        <div className="row form-row align-items-start">
                            <div className="col-2">Condition</div>
                            <div className="form-outline col-4">
                                <select
                                    id="status"
                                    className="form-control"
                                    required
                                    data-testid="status-select"
                                    onChange={(event) => {
                                        setStatusValue(event.target.value);
                                    }}
                                >
                                    <option value="New">New</option>
                                    <option value="Pre-owned">Pre-Owned</option>
                                    <option value="Refurbished">
                                        Refurbished
                                    </option>
                                </select>
                            </div>

                            {statusValue === "Pre-owned" && (
                                <>
                                    <div className="col-2">
                                        Not Older Than (in months)
                                    </div>
                                    <div className="form-outline col-4">
                                        <input
                                            type="number"
                                            id="notOlderThan"
                                            placeholder="Not Older Than (in Months)"
                                            className="form-control"
                                            required
                                            min={
                                                ITEM_REQUEST_VALIDATION.notOlderThanMinValue
                                            }
                                            max={
                                                ITEM_REQUEST_VALIDATION.notOlderThanMaxValue
                                            }
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="row form-row align-items-center justify-content-around"></div>

                        <div className="d-flex justify-content-center">
                            <button
                                type="submit"
                                className="btn btn-primary btn-submit"
                            >
                                Create Request
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ItemRequestForm;
