/**
 * Props for Update Bid form component
 */
export interface UpdateBidFormProps {
    maxPrice: number;
    handleBidUpdate: (event: React.FormEvent<HTMLFormElement>) => void;
    currentMinPrice: number;
}
