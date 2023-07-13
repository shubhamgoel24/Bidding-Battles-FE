import { API_ENDPOINTS } from "@constants/apiEndpoints";
import { ApiClient } from "@services/apiClient";
import { auth } from "firebaseApp";

/**
 * Function to get auth token of current user
 */
const getToken = async () => {
    const user = auth.currentUser;
    return await user?.getIdToken();
};

/**
 * Function to make api call to sign up a new user
 */
export const signUp = (userData: {}) => {
    return new ApiClient({}, "").post(`${API_ENDPOINTS.signup}`, userData);
};

/**
 * Function to make api call to update details of user
 */
export const updateDetails = async (userData: {}) => {
    const token = await getToken();
    return new ApiClient({}, token).post(
        `${API_ENDPOINTS.updateUser}`,
        userData
    );
};

export const inviteUsersWithCSV = async (inviteData: {}) => {
    /**
     * Function to make api call to invite users using csv
     */
    const token = await getToken();
    return new ApiClient({}, token).post(
        `${API_ENDPOINTS.inviteUsersCSV}`,
        inviteData
    );
};

export const inviteUser = async (inviteData: {}) => {
    /**
     * Function to make api call to invite a user
     */
    const token = await getToken();
    return new ApiClient({}, token).post(
        `${API_ENDPOINTS.inviteUser}`,
        inviteData
    );
};

export const createItemRequest = async (itemRequestData: {}) => {
    /**
     * Function to make api call to create a new item request
     */
    const token = await getToken();
    return new ApiClient({}, token).post(
        `${API_ENDPOINTS.newItemRequest}`,
        itemRequestData
    );
};

export const getMyItemRequests = async (lastDocId: string = "") => {
    /**
     * Function to make api call to fetch all the item requests of user
     */
    const token = await getToken();
    return new ApiClient({}, token).get(
        `${API_ENDPOINTS.getMyItemRequests}?last-doc=${lastDocId}`
    );
};

export const getOthersItemRequests = async (lastDocId: string) => {
    /**
     * Function to make api call to fetch all the item requests of other users
     */
    const token = await getToken();
    return new ApiClient({}, token).get(
        `${API_ENDPOINTS.getOtherItemRequests}?last-doc=${lastDocId}`
    );
};

export const createNewBid = async (bidData: {}) => {
    /**
     * Function to make api call to place a new bid
     */
    const token = await getToken();
    return new ApiClient({}, token).post(
        `${API_ENDPOINTS.newItemBid}`,
        bidData
    );
};

export const payForItemRequest = async (itemRequestPayData: {}) => {
    /**
     * Function to make api call to pay for item request
     */
    const token = await getToken();
    return new ApiClient({}, token).post(
        `${API_ENDPOINTS.payForItem}`,
        itemRequestPayData
    );
};

export const payForBid = async (bidPayData: {}) => {
    /**
     * Function to make api call to pay for bid
     */
    const token = await getToken();
    return new ApiClient({}, token).post(
        `${API_ENDPOINTS.payForBid}`,
        bidPayData
    );
};

export const updateBid = async (bidData: {}) => {
    /**
     * Function to make api call to update bid
     */
    const token = await getToken();
    return new ApiClient({}, token).patch(`${API_ENDPOINTS.updateBid}`, bidData);
};
