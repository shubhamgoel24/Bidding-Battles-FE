/**
 * Props for InviteUsers component
 */
export interface InviteUsersProps {
    inviteViaCsv: boolean;
    setInviteViaCsv: (variable: boolean) => void;
    handleInviteRequest: (
        event: React.FormEvent<HTMLFormElement>,
        selectedFile: File | null
    ) => void;
}
