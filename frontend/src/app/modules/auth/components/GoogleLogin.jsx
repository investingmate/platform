import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_investingmate/helpers";

const GoogleLogin = () => {
  const signIn = async () => {
    await Auth.federatedSignIn({ provider: "Google" });
  };

  return (
    <Link to="#">
      <button
        className="btn btn-flex flex-center btn-light btn-lg w-100 mb-5"
        onClick={(e) => {
          e.preventDefault();
          signIn();
        }}
      >
        <img
          alt="Logo"
          src={toAbsoluteUrl("/media/svg/brand-logos/google-icon.svg")}
          className="h-20px me-3"
        />
        Continue with Google
      </button>
    </Link>
  );
};

export { GoogleLogin };
