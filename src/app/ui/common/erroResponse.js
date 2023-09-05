const errorResponse = (payload) => {

  if (!payload?.data?.error?.message) {
    return payload?.data?.error[0];
  } else if (payload?.error) {
    return payload?.error[0];
  }
  return payload?.data?.error?.message;
};
module.exports = { errorResponse };
