import firebase from "firebase/app";
import FirebaseConfig from "../Config/FirebaseConfig";
firebase.initializeApp(FirebaseConfig);

// get me the firebase database
const databaseRef = firebase.database().ref();

// get me the table named user-details
// if it does not exist, firebase will
// automatically create it
const userDetailsRef = databaseRef.child("user-details");

export const RegisterUser = (name, email, password) => async (dispatch) => {
  // firebase offers us this function createUserWithEmailAndPassword
  // which will automatically create the user for us
  // it only has two arguments, the email and the password
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const data = {
        loggedIn: true,
        email: res.user.email,
        uid: res.user.uid,
      };

      // we take the user id and it's name and we add it in our
      // user-details table
      userDetailsRef.push().set({ userId: res.user.uid, userName: name });
      // after that we dispatch to our reducers the fact that
      // register was succesful by sending true
      dispatch({ type: "REGISTER_USER", payload: data });
      // if the register was not succesful we can catch the erros here
    })
    .catch((error) => {
      // if we have any erros, we'll throw an allert with that error
      console.error(error);
    });
};

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

export const LogoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LOGOUT_USER", payload: {} });
  } catch (error) {
    alert(error);
  }
};
