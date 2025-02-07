import React from "react";
import { ConnectButton } from "@suiet/wallet-kit";
import useStore from "../store";

function Popup() {
  const { isSuccess, type, closePopup } = useStore();

  return isSuccess ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">Connect Wallet</h2>
          <p className="text-gray-600 mb-6 text-center">
            Please connect your wallet to {type === "connect" ? "continue" : "vote"}
          </p>
          <ConnectButton className="bg-primary text-white px-6 py-2 rounded-lg" />
          <button
            onClick={closePopup}
            className="mt-4 text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : null;
}

export default Popup;
