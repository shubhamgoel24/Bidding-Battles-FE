/**
 * Props for SignIn Component
 */
export interface AuthSignInProps {
    setShowSignIn: () => void;
    handleSignIn: (event: React.FormEvent<HTMLFormElement>) => void;
}
