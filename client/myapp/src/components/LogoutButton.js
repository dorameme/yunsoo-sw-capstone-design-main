import { GoogleLogout } from "react-google-login";

const clientId =
  "112172327061-95mqb878sgpt8t955rkkdug7mvgco8od.apps.googleusercontent.com";

const LogoutButton = ({ logoutHandler }) => {
  const onSuccess = () => {
    logoutHandler(false);
    console.log("Log out successful!");
  };

  return (
    <>
      <GoogleLogout
        clientId={clientId}
        buttonText={"로그아웃"}
        onLogoutSuccess={onSuccess}
      />
    </>
  );
};

export default LogoutButton;
