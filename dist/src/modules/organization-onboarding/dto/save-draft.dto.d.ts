export declare class SaveDraftDto {
    currentStep?: string;
    organizationName?: string;
    businessType?: string;
    industry?: string;
    website?: string;
    panNumber?: string;
    hasGst?: boolean;
    gstin?: string;
    hasUdyam?: boolean;
    udyamNumber?: string;
    secondaryDocType?: string;
    shopEstablishmentNumber?: string;
    firmRegistrationNumber?: string;
    addressProofType?: string;
    bankAccountNumber?: string;
    bankIfsc?: string;
    bankName?: string;
    documents?: Record<string, unknown>;
    declarationAgreed?: boolean;
    declarationAuthorized?: boolean;
    digitalSignature?: string;
    declarationSignedAt?: string;
    finalPoliciesAgreed?: boolean;
}
