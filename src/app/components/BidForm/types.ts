/**
 * Props for Bid form component
 */
export interface bidFormProps {
    maxPrice: number;
    handleBidSubmit: (
        event: React.FormEvent<HTMLFormElement>,
        selectedFiles: FileList | null
    ) => void;
    priceValidationError: string;
    descriptionValidationError: string;
    setPriceValidationError: (msg: string) => void;
    setDescriptionValidationError: (msg: string) => void;
}
