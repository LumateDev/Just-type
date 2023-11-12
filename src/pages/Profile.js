import React from "react";
import Account from "../components/Account/Account";

const Profile = ({ logged, setModalOpen }) => {
  return <Account logged={logged} setModalOpen={setModalOpen}></Account>;
};

export default Profile;
