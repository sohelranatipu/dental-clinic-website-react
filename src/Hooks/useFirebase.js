import { useState, useEffect } from "react";
import firebaseInitialize from "../Firebase/firebase.init";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import popupError from "../PopUp/popupError";
import popupSuccess from "../PopUp/popupSuccess";

firebaseInitialize();
const useFirebase = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const auth = getAuth();

  /* -------------------------------------------------------------------------- */
  /*                                ALL PROVIDER                                */
  /* -------------------------------------------------------------------------- */
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  /* -------------------------------------------------------------------------- */
  /*                              UPDATE USER INFO                              */
  /* -------------------------------------------------------------------------- */
  const updateUserInfo = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {})
      .catch((err) => {
        popupError(err.message);
      });
  };

  /* -------------------------------------------------------------------------- */
  /*                             SIGN IN WITH EMAIL                             */
  /* -------------------------------------------------------------------------- */
  const signInWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  /* -------------------------------------------------------------------------- */
  /*                             CREATE NEW ACCOUNT                             */
  /* -------------------------------------------------------------------------- */
  const createNewAccount = (email, password, name) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        updateUserInfo(name);
        setUser(result.user);
        window.location.pathname = "/";
        logOut(false);
        popupSuccess("new");
      })
      .catch((err) => {
        popupError(err.message);
      });

    setLoading(false);
  };

  /* -------------------------------------------------------------------------- */
  /*                           SIGN IN WITH ANY SOCIAL                          */
  /* -------------------------------------------------------------------------- */

  const signInWithSocialAccount = (provider) => {
    return signInWithPopup(auth, provider);
  };

  /* -------------------------------------------------------------------------- */
  /*                               RESET PASSWORD                               */
  /* -------------------------------------------------------------------------- */
  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        popupSuccess("reset");
      })
      .catch((err) => {
        popupError(err.message);
      });
  };

  /* -------------------------------------------------------------------------- */
  /*                                 USER LOGOUT                                */
  /* -------------------------------------------------------------------------- */
  const logOut = (isfalse) => {
    signOut(auth)
      .then(() => {
        popupSuccess("logout", isfalse);
      })
      .catch((err) => {
        popupError(err.message);
      });
  };

  /* -------------------------------------------------------------------------- */
  /*                               ON AUTH CHANGE                               */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      setLoading(true);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribed;
  }, []);

  // Return All function
  return {
    signInWithEmail,
    loading,
    user,
    setUser,
    createNewAccount,
    signInWithSocialAccount,
    resetPassword,
    googleProvider,
    facebookProvider,
    logOut,
  };
};
export default useFirebase;
