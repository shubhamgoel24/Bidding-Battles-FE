/**
 * Type definition for error message
 */
export interface errorResponseType {
    response: {
        data: {
            message: string;
            error: { price: [string]; description: [string]; password: [string]};
        };
    };
}
