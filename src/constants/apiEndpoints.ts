import {
    BASE_URL_AUTH_INVITE,
    BASE_URL_ITEM_REQUEST_AND_BID,
} from "@constants/envConstants";

export const API_ENDPOINTS = {
    signup: `${BASE_URL_AUTH_INVITE}auth/signup`,
    updateUser: `${BASE_URL_AUTH_INVITE}auth/update-user`,
    inviteUser: `${BASE_URL_AUTH_INVITE}invite-users/`,
    inviteUsersCSV: `${BASE_URL_AUTH_INVITE}invite-users/csv`,
    newItemRequest: `${BASE_URL_ITEM_REQUEST_AND_BID}item-requests/`,
    getMyItemRequests: `${BASE_URL_ITEM_REQUEST_AND_BID}item-requests/my-requests`,
    getOtherItemRequests: `${BASE_URL_ITEM_REQUEST_AND_BID}item-requests/`,
    newItemBid: `${BASE_URL_ITEM_REQUEST_AND_BID}bids/`,
    updateBid: `${BASE_URL_ITEM_REQUEST_AND_BID}bids/update`,
    payForItem: `${BASE_URL_ITEM_REQUEST_AND_BID}payments/item-request`,
    payForBid: `${BASE_URL_ITEM_REQUEST_AND_BID}payments/bid`,
};
