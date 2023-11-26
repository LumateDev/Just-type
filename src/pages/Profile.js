import React, { useState } from "react";
import Account from "../components/Account/Account";
import RegAndLogForm from "../components/RegAndLogForm/RegAndLogForm";

const Profile = ({ logged, setLogged, setUsername, username }) => {
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
      />
      <Account
        logged={logged}
        setModalOpen={setModalOpen}
        formTitle={formTitle}
        setFormTitle={setFormTitle}
        username={username}
      />
    </section>
  );
};

export default Profile;
