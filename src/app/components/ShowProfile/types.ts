/**
 * Type definition for profile data
 */
export interface profileDataType {
    name: string;
    address: {
        city: string;
        houseAndLocality: string;
        state: string;
        zipcode: string;
    };
    email: string;
}
export interface showProfileProps {
    profileData: profileDataType;
}
