import { ChangeEvent, useState } from "react";

import "@components/BidForm/style.scss";
import { bidFormProps } from "@components/BidForm/types";
import { ITEM_REQUEST_VALIDATION } from "@constants/constants";

/**
 * Bid Form Component
 */
const BidForm = ({
    handleBidSubmit,
    maxPrice,
    priceValidationError,
    descriptionValidationError,
    setPriceValidationError,
    setDescriptionValidationError,
}: bidFormProps) => {
    const [selectedFiles, setSelectedFile] = useState<FileList | null>(null);

    /**
     * Function to handle selecting files
     * @param event
     */
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const filesList = (event.target as HTMLInputElement).files;
        setSelectedFile(filesList);
    };

    return (
        <div className="container">
            <div className="row align-items-center justify-content-center">
                <div className="col-10 col-md-8 col-lg-6 col-xl-5 bid-form">
                    <div className="row align-items-center justify-content-center">
                        <h3 className="text-center">Place Your Bid</h3>
                    </div>
                    <form
                        id="bid-form"
                        onSubmit={(event) =>
                            handleBidSubmit(event, selectedFiles)
                        }
                    >
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
                                    // min={0}
                                    // max={maxPrice}
                                    onChange={() => setPriceValidationError("")}
                                />
                                {priceValidationError && (
                                    <label
                                        htmlFor="price"
                                        className="form-label text-danger"
                                    >
                                        {priceValidationError}
                                    </label>
                                )}
                            </div>
                        </div>
                        <div className="row form-row align-items-center justify-content-around">
                            <div className="col-3">Description</div>
                            <div className="form-outline col-9">
                                <textarea
                                    id="description"
                                    placeholder="Description"
                                    className="form-control"
                                    rows={2}
                                    required
                                    // minLength={
                                    //     ITEM_REQUEST_VALIDATION.minItemDescriptionLength
                                    // }
                                    // maxLength={
                                    //     ITEM_REQUEST_VALIDATION.maxItemDescriptionLength
                                    // }
                                    onChange={() =>
                                        setDescriptionValidationError("")
                                    }
                                />
                                {descriptionValidationError && (
                                    <label
                                        htmlFor="description"
                                        className="form-label text-danger"
                                    >
                                        {descriptionValidationError}
                                    </label>
                                )}
                            </div>
                        </div>
                        <div className="row form-row align-items-start justify-content-around">
                            <div className="col-3">Images</div>
                            <div className="form-outline col-9">
                                <input
                                    data-testid="file-field"
                                    type="file"
                                    id="file"
                                    accept="image/*"
                                    className="form-control"
                                    onChange={handleFileChange}
                                    multiple={true}
                                />
                            </div>
                        </div>

                        <div className="d-flex justify-content-center">
                            <button
                                data-testid="submit-button"
                                type="submit"
                                className="btn btn-primary primary-button"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BidForm;
