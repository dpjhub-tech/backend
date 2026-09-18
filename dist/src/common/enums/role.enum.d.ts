export declare enum Role {
    USER = "user",
    CREATOR = "creator",
    ORGANIZATION = "organization",
    ADMIN = "admin"
}
export declare function normalizeRole(role: string | null | undefined): Role;
