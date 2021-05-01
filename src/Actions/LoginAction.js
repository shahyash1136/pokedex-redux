import firebase from "firebase/app";

export const LoginUser = (email, password) => async (dispatch) => {
  // firebase offers us this function signInWithEmailAndPassword
  // which will automatically create the user for us
  // it only has two arguments, the email and the password
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      const data = {
        email: res.user.email,
        uid: res.user.uid,
      };

      // if the login was succesful, then
      // we dispatch to our reducers the fact that
      // login was succesful by sending true
      dispatch({ type: "LOGIN_USER", payload: data });
    }) // if the login was not succesful we can catch the erros here

    .catch(function (error) {
      // if we have any erros, we'll throw an allert with that error

      alert(error);
    });
};
