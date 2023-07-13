/**
 * Props for NavBar component
 */
export interface NavBarProps {
    isLoggedIn: boolean;
    docCreated: boolean;
    handleLogout: () => void;
}
