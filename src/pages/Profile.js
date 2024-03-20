import React, { useState } from "react";
import Account from "../components/Account/Account";
import RegAndLogForm from "../components/RegAndLogForm/RegAndLogForm";

const Profile = ({
  logged,
  setLogged,
  setUsername,
  username,
  setUserId,
  userId,
  languageTest
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("Авторизация");

  return (
    <section className="section-account">
      <RegAndLogForm
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setLogged={setLogged}
        formTitle={formTitle}
        setFormTitle={setFormTitle}
        setUsername={setUsername}
        setUserId={setUserId}
      />
      <Account
        logged={logged}
        setModalOpen={setModalOpen}
        formTitle={formTitle}
        setFormTitle={setFormTitle}
        username={username}
        userId={userId}
        languageTest={languageTest}
      />
    </section>
  );
};

export default Profile;
