const ADMIN_ENDPOINTS = {
  SIGN_IN: "/",
  USERS_DASHBOARD: "/account/",
  ADMIN_DASHBOARD: "/admin",
  USERS: "/users",
  STAFF: "/admin/staffs",
  DEPARTMENT: "/admin/departments",
};

const USERS_ENDPOINTS = {
  SIGN_IN: "/",
  USERS_DASHBOARD: "/account",
  SERVICES: "/account/services",
};

const STAFF_ENDPOINTS = {
  SIGN_IN: "/",
  USERS_DASHBOARD: "/account/departments",
  BUSINESS_PERMIT: "/account/departments/businessPermit",
};
module.exports = { ADMIN_ENDPOINTS, USERS_ENDPOINTS, STAFF_ENDPOINTS };
