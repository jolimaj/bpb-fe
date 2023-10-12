const ADMIN_ENDPOINTS = {
  SIGN_IN: "/signin",
  USERS_DASHBOARD: "/account/",
  ADMIN_DASHBOARD: "/admin",
  USERS: "/users",
  STAFF: "/admin/staffs",
  DEPARTMENT: "/admin/departments",
  PROFILE: "/admin/profile",
  USER: "/admin/users",
};

const USERS_ENDPOINTS = {
  SIGN_IN: "/signin",
  USERS_DASHBOARD: "/account",
  SERVICES: "/account/services",
  NEW: "/account/services/new",
  RENEW: "/account/services/renew",
  PROFILE: "/account/profile",
  BUSINESS_PERMIT: "/account/businessPermit",
};

const STAFF_ENDPOINTS = {
  SIGN_IN: "/signin",
  USERS_DASHBOARD: "/account/departments",
  BUSINESS_PERMIT: "/account/departments/businessPermit",
  PROFILE: "/account/departments/profile",
};
module.exports = { ADMIN_ENDPOINTS, USERS_ENDPOINTS, STAFF_ENDPOINTS };
