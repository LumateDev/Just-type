import React from "react";
import Modal from "react-modal";
import "./regAndLogForm.css";

const RegAndLogForm = ({ modalOpen, setModalOpen }) => {
  Modal.setAppElement("#root");
  return (
    <div>
      <div className="container">
        <Modal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          className="modal-form"
          overlayClassName="overlay"
        >
          <div className="form-wrapper">
            <h2 className="form-title">Регистрация/Авторизация</h2>
            <form className="form-col">
              <div className="form-row">
                <input
                  type="text"
                  autoComplete="username"
                  placeholder="Username"
                />
              </div>

              <div className="form-row">
                <input
                  type="password"
                  autoComplete="current-password"
                  placeholder="Password"
                />
              </div>
              <div className="form-row"></div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default RegAndLogForm;
