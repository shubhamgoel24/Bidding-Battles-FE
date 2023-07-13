/**
 * Props for email verification component
 */
export interface EmailVerificationProps {
    handleVerify: () => void;
    disableEmailVerifyButton: boolean;
    setDisableShowEmailVerifyButton: (newValue: boolean) => void;
    counter: number;
    setCounter: (newCount: number) => void;
}
