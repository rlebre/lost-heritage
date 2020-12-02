export default function () {
  return {
    jwtToken: localStorage.getItem("user_token") || null,

    loggingIn: false,
    loggingOut: false,
    registering: false,

    errors: {}
  }
}
