import { showProfileProps } from "@components/ShowProfile/types";

/**
 * Component to show user profile
 */
const ShowProfile = ({ profileData }: showProfileProps) => {
    return (
        <>
            <div className="row item-row align-items-start justify-content-center profile-row">
                <div className="col-6">
                    <div className="row">
                        <div className="row field-heading">Name</div>
                        <div className="row text-break">{profileData.name}</div>
                    </div>

                    <div className="row">
                        <div className="row field-heading">Email</div>
                        <div className="row text-break">
                            {profileData.email}
                        </div>
                    </div>
                </div>
                <div className="col-6 col-right">
                    <div className="row">
                        <div className="row field-heading">Address</div>
                        <div className="row text-break">
                            {profileData.address.houseAndLocality}
                        </div>
                        <div className="row text-break">
                            {profileData.address.city}
                        </div>
                        <div className="row text-break">
                            {profileData.address.state}
                        </div>
                        <div className="row text-break">
                            {profileData.address.zipcode}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShowProfile;
