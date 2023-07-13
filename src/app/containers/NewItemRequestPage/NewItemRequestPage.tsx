import { useDispatch } from "react-redux";

import ItemRequestForm from "@components/ItemRequestForm";
import { errorResponseType } from "@containers/AuthPage/types";
import { itemRequestDataProps } from "@containers/NewItemRequestPage/types";
import { removeLoader, setLoader } from "@reduxSlice/loaderSlice";
import { createItemRequest } from "@services/services";
import showToast from "utils/helper";

const ItemRequestPage = () => {
    const dispatch = useDispatch();

    /**
     * Handles creating new item request and redirecting to payment page
     */
    const handleItemRequest = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        dispatch(setLoader());
        const form = event.currentTarget;
        const formElements = form.elements as typeof form.elements & {
            name: HTMLInputElement;
            description: HTMLInputElement;
            closureTime: HTMLInputElement;
            numberOfItems: HTMLInputElement;
            maxPrice: HTMLInputElement;
            status: HTMLInputElement;
            notOlderThan: HTMLInputElement;
        };

        const itemRequestData: itemRequestDataProps = {
            name: formElements.name.value,
            description: formElements.description.value,
            closureTime: new Date(formElements.closureTime.value),
            numberOfItems: formElements.numberOfItems.value,
            maxPrice: formElements.maxPrice.value,
            status: formElements.status.value,
        };
        
        if (formElements.status.value === "Pre-owned") {
            itemRequestData["notOlderThan"] = formElements.notOlderThan.value;
        }
        try {
            const response = await createItemRequest(itemRequestData);
            window.location.href = response.data.url;
        } catch (error: unknown) {
            dispatch(removeLoader());
            if ("error" in (error as errorResponseType).response.data) {
                for (const [key, value] of Object.entries(
                    (error as errorResponseType).response.data.error
                )) {
                    showToast(true, `${key} -> ${value}`);
                }
            } else {
                showToast(
                    true,
                    `${(error as errorResponseType).response.data.message}`
                );
            }
        }
    };

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <ItemRequestForm handleItemRequest={handleItemRequest} />
            </div>
        </div>
    );
};

export default ItemRequestPage;
