/**
 * Props for SignUp Component
 */
export interface AuthSignUpProps {
    setShowSignIn: () => void;
    handleSignUp: (event: React.FormEvent<HTMLFormElement>) => void;
}
