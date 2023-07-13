/**
 * Type definition for item request data
 */
export interface showBidTypes {
    price: number;
    description: string;
    imageUrlList?: [string];
    paymentStatus?: string;
}

export interface showBidProps {
    bidsArray: showBidTypes[];
    selfItemRequest: boolean;
    handleBidPayNow: () => void;
}
