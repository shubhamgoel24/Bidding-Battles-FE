import { NavLink } from "react-router-dom";

import "@components/NavBar/styles.scss";
import { NavBarProps } from "@components/NavBar/types";
import { ROUTE_PATHS } from "@constants/routePaths";

/**
 * Navbar component
 */
const NavBar = ({ isLoggedIn, docCreated, handleLogout }: NavBarProps) => {
    return (
        <nav className="navbar-light">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-6">
                        <div className="row align-items-center">
                            <div className="main-link link">
                                BIDDING BATTLES
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row justify-content-end align-items-center">
                            {isLoggedIn && (
                                <>
                                    {docCreated && (
                                        <>
                                            <NavLink
                                                to={ROUTE_PATHS.home}
                                                className="link"
                                            >
                                                Home
                                            </NavLink>
                                            <NavLink
                                                to={ROUTE_PATHS.myItemRequests}
                                                className="link"
                                            >
                                                My Requests
                                            </NavLink>
                                            <NavLink
                                                to={ROUTE_PATHS.profile}
                                                className="link"
                                            >
                                                Profile
                                            </NavLink>
                                        </>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        type="button"
                                        className="btn btn-primary"
                                    >
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
