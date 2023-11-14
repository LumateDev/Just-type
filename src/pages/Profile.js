import React, {useState} from "react";
import Account from "../components/Account/Account";
import RegAndLogForm from "../components/RegAndLogForm/RegAndLogForm";

const Profile = ({ logged, setLogged }) => {

  const [modalOpen, setModalOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("Авторизация");

  return (
    <div>
      <RegAndLogForm
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setLogged={setLogged}
        formTitle={formTitle}
        setFormTitle={setFormTitle}
      />
      <Account logged={logged} setModalOpen={setModalOpen} formTitle={formTitle} setFormTitle={setFormTitle} />
    </div>
  );
}

export default Profile;
