import React, { useRef, useEffect, useCallback, useState } from "react";
import axios from "axios";
import Notification from "./Notification";
import Confetti from 'react-confetti';

const LoseOrWin = ({ isModalOpen, setIsModalOpen, status, setClicked, address }) => {
  const hasRun = useRef(false);
  const modalRef = useRef(null);
  const [message, setMessage] = useState("");

  // Wrap closeModal in useCallback to stabilize its reference
  const closeModal = useCallback(() => {
    setClicked(true);
    setIsModalOpen(false);
  }, [setClicked, setIsModalOpen]);

  // Effect for handling clicks outside the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeModal]);

  // Effect for sending data when status is true
  useEffect(() => {
    if (!status || hasRun.current) {
      return;
    }

    const sendingData = async () => {
      const form = new FormData();
      form.append("publicKey", address);

      try {
        const res = await axios.post("/api/tokenTransfer", form);
        setMessage(res.data.message);
        console.log(res.data.message, "response logged");
      } catch (error) {
        console.error("Error posting data:", error);
      }
    };

    sendingData();
    hasRun.current = true;
  }, [status, address]);

  if (!isModalOpen) return null;

  return (
    <>
      {status && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      {message && <Notification message={message} />}
      
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
        ref={modalRef}
      >
        <div className="custom-modal-background w-auto max-w-md mx-auto rounded-lg shadow-lg overflow-hidden p-8">
          <h1 className="font-semibold text-center text-3xl mb-3">
            {status
              ? " 🎰 Jackpot Unlocked! 🌟 Congratulations, You're a Winner! 🎉"
              : "Unlucky spin! Keep trying your luck for that jackpot."}
          </h1>
          <hr className="my-4" />
          <div className="flex justify-center">
            <button
              onClick={closeModal}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoseOrWin;
