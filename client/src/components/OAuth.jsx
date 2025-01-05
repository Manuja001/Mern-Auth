import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/UserSlice";

function OAuth() {
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/googlelogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatchEvent(signInSuccess(data));
      console.log(data);
    } catch (error) {
      console.log("could not login with Google ", error);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center mt-5">
        <button
          type="button"
          onClick={handleGoogleClick}
          className="text-sm uppercase border-2 px-4 py-2 text-slate-800 border-slate-300 rounded-xl hover:scale-[1.02] ease-in-out active:scale-[0.98]"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}

export default OAuth;
