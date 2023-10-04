const ADMIN_ENDPOINTS = {
  SIGN_IN: "/signin",
  USERS_DASHBOARD: "/account/",
  ADMIN_DASHBOARD: "/admin",
  USERS: "/users",
  STAFF: "/admin/staffs",
  DEPARTMENT: "/admin/departments",
  PROFILE: "/admin/profile",
};

const USERS_ENDPOINTS = {
  SIGN_IN: "/signin",
  USERS_DASHBOARD: "/account",
  SERVICES: "/account/services",
  PROFILE: "/account/profile",
};

const STAFF_ENDPOINTS = {
  SIGN_IN: "/signin",
  USERS_DASHBOARD: "/account/departments",
  BUSINESS_PERMIT: "/account/departments/businessPermit",
  PROFILE: "/account/departments/profile",
};
module.exports = { ADMIN_ENDPOINTS, USERS_ENDPOINTS, STAFF_ENDPOINTS };
