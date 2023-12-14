export const FIREBASE_ERROR_INVALID_EMAIL = "auth/invalid-email";
export const FIREBASE_ERROR_MISSING_PASSWORD = "auth/missing-password";
export const FIREBASE_ERROR_ALREADY_IN_USE = "auth/email-already-in-use";

type FirebadeErrorMessageType = {
    [key: string]: string
}

export const FIREBASE_ERROR_MESSAGE: FirebadeErrorMessageType = {
    [FIREBASE_ERROR_INVALID_EMAIL]: "Your email does not look correct. Please make sure you can typed it correctly.",
    [FIREBASE_ERROR_MISSING_PASSWORD]: "A password is required",
    [FIREBASE_ERROR_ALREADY_IN_USE]: "There is already an account using this email address." // Login action
};
