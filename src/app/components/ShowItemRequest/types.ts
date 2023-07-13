/**
 * Type definition for item request data
 */
export interface itemRequestTypes {
    name: string;
    description: string;
    closureTime: number;
    numberOfItems: number;
    maxPrice: number;
    status: string;
    notOlderThan?: number;
    liveBiddingTime: string;
    requestCreateTime: string;
    id: string;
    userDocRef?: string;
    paymentStatus?: string;
    biddingStatus: string;
    isLive: boolean;
    minBidPrice?: number;
    winner?: string;
    winningBid?: string;
    requester?: string;
}

export interface showItemRequestProps {
    itemRequestArray: itemRequestTypes[];
    showViewMore: boolean;
    handleItemRequestPayNow: (itemRequestId: string) => void;
}
