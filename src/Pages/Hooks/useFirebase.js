import { useEffect, useState } from "react";
import initializeAuthentication from "../Firebase/Firebase.init";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// firebase init
initializeAuthentication();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [error, setError] = useState("");

  const GoogleProvider = new GoogleAuthProvider();
  const auth = getAuth();

  // google sign in
  const signInWithGoogle = (location, navigate) => {
    setIsLoading(false);
    signInWithPopup(auth, GoogleProvider)
      .then((result) => {
        const user = result.user;
        saveUser(user.email, user.displayName, "PUT");
        const destination = location?.state?.from || "/";
        navigate(destination);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      })
      .finally(() => setIsLoading(true));
  };
  //   logout
  const logOut = () => {
    setIsLoading(true);
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      })
      .finally(() => setIsLoading(false));
  };
  // Auth Observer
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
  }, [auth]);

  // registration
  const registration = (email, password, navigate) => {
    setIsLoading(false);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        saveUser(user.email, user.displayName, "POST");
        navigate("/");
      })

      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      })
      .finally(() => setIsLoading(true));
  };

  // Log in

  const login = (email, password, location, navigate) => {
    setIsLoading(false);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const destination = location?.state?.from || "/";
        navigate(destination);
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      })
      .finally(() => setIsLoading(true));
  };

  // user post to db
  const saveUser = (email, displayName, method) => {
    const user = { email, displayName };
    fetch("https://urban-estate-server.onrender.com/users", {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
  };

  // load admin
  useEffect(() => {
    fetch(`https://urban-estate-server.onrender.com/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => setAdmin(data.admin));
  }, [user.email]);

  return {
    user,
    signInWithGoogle,
    logOut,
    registration,
    login,
    admin,
    isLoading,
    error,
  };
};

export default useFirebase;
