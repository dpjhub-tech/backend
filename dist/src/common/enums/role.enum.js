"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
exports.normalizeRole = normalizeRole;
var Role;
(function (Role) {
    Role["USER"] = "user";
    Role["CREATOR"] = "creator";
    Role["ORGANIZATION"] = "organization";
    Role["ADMIN"] = "admin";
})(Role || (exports.Role = Role = {}));
function normalizeRole(role) {
    if (!role)
        return Role.USER;
    const lower = role.toLowerCase();
    if (lower === 'creator')
        return Role.CREATOR;
    if (lower === 'organization' || lower === 'business')
        return Role.ORGANIZATION;
    if (lower === 'admin')
        return Role.ADMIN;
    return Role.USER;
}
//# sourceMappingURL=role.enum.js.map