/**
 * Type definition for item request data
 */
export interface itemRequestDataProps {
    name: string;
    description: string;
    closureTime: Date;
    numberOfItems: string;
    maxPrice: string;
    status: string;
    notOlderThan?: string;
}
