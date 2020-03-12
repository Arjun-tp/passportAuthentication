module.exports = {

    kycStatus: ['initiated', 'submitted', 'pending', 'approved', 'rejected', 'paymentAccepted', 'paymentRejected'],
    role: ['superAdmin', 'Relationship Manager','Operation Manager' ,'chatSupport', 'admin'],
    investmentMethod: ['creditCard', 'wireTransfer', 'btc', 'eth'],
    companyStage: ['preSeed', 'seed', 'Prefer not to Mention'],
    documents: ['passport', 'panCard'],
    gender: ['Male', 'Female', 'notToMention'],
    tokenType: 'Bearer',
    errorMessage: {
        SUCCESS: 'SUCCESS',
        FAILED: 'FAILED',
        ACCESS_DENIED: 'ACCESS_DENIED',
        TOKEN_EXPIRED: 'TOKEN_EXPIRED',
        TOKEN_UNAUTHORIZED: 'TOKEN_UNAUTHORIZED',
        REQUIRED: 'REQUIRED',
        BLOCKED: 'BLOCKED_ACCOUNT',
        EMAIL_NOT_ACTIVATED: 'EMAIL_NOT_ACTIVATED',
        INVALID_PASSWORD: 'INVALID_PASSWORD',
        USER_SUCCESSFULLY_REGISTERED: 'USER_SUCCESSFULLY_REGISTERED',
        LOGGED_IN_SUCCESSFULLY: 'USER_SUCCESSFULLY_LOGGEDIN',
        INVALID_USER_NAME: 'INVALID_USER_NAME',
        VALIDATION_ERROR: 'VALIDATION_ERROR',
        NOT_FOUND: 'NOT_FOUND',
        FORGOT_PASSWORD: 'FORGOT_PASSWORD',
        CHANGE_PASSWORD: 'PASSWORD_HAS_BEEN_CHANGED_SUCCESSFULLY',
        EMAIL_VERIFIED: 'EMAIL_VERIFIED',
        SUPER_ADMIN_ACCESS: 'SUPERADMIN_ONLY_CAN_ACCESS',
        COMPANY_ALREADY_CREATED: 'COMPANY_ALREADY_CREATED',
        NO_COMPANY_FOUND: 'NO_COMPANY_FOUND',
        NO_USER: 'NO-USER_FOUND',
        SOMETHING_WENT_WRONG: "SOMETHING_WENT_WRONG.PLEASE_TRY_AGAIN_LATER",
        NO_SUBMISSION_FOUND: "NO_SUBMISSION_FOUND"

    },
    emailType: {
        emailVerificationMail: 'sendEmailVerificationMail',
        forgotPasswordMail: 'sendForgotPassword',
        sendPasswordResetCompleted: 'sendPasswordResetCompleted',
        sendDeleteAccount: 'sendDeleteAccount',
        sendEmailActivated: 'sendEmailActivated',
        sendPasswordSetForAdmin: 'sendPasswordSetForAdmin',
        sendMailForRelationshipManager: 'sendMailForRelationshipManager',
    },
    version: {
        v1: 'v1.0.0',
        v2: 'v2.0.0',
    },
    roleIds: {
        superAdmin: 1,
        admin: 2,
        relationshipManager: 3,
        chatSupport: 4
    },
    signedUrlExpireSeconds: 5 * 60 * 1000 // 5 minute
};
