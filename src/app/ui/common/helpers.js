class Helpers {
  compareField(payload) {
    const { confirmPassword, password } = payload;
    if (confirmPassword !== password)
      return "Password and confirm password fields do not match. Please make sure both fields contain the same password.";
  }
}
module.exports = { Helpers };
