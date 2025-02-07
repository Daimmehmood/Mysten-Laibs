import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ConnectButton } from "@suiet/wallet-kit";
import { useWallet } from "@suiet/wallet-kit";
import toast from "react-hot-toast";
import useStore from "../store";

function Navbar() {
  const { account, connected } = useWallet();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { openPopup } = useStore();

  const handleClick = (url) => {
    if (!connected) {
      openPopup("connect");
    } else {
      navigate(url);
    }
  };

  return (
    <nav>
      <div className="container relative">
        <div className="flex justify-between items-center py-4">
          <div>
            <Link to="/" className="text-xl font-bold">
              <img src="/img/logo.png" alt="Logo" />
            </Link>
          </div>

          {!open ? <img src="/icon/menu.png" className=" block md:hidden w-[25px]" onClick={() => setOpen(!open)} /> : <img src="/icon/close.png" className=" block md:hidden w-[25px]" onClick={() => setOpen(!open)} />}
          <div className="hidden md:flex items-center">
            <button onClick={() => handleClick("/vote")} className="text-[14px] leading-[21px] rounded-sm py-2.5 px-12 font-semibold text-white bg-primary mr-3">
              Vote
            </button>
            <button onClick={() => handleClick("/agent")} className="text-[14px] leading-[21px] rounded-sm py-2.5 px-12 font-semibold text-primary bg-white mr-3">
              Create
            </button>
            <ConnectButton className="bg-primary" />
          </div>
        </div>
        {open && (
          <div className="absolute top-[80px] left-0 bg-primary/20 px-2 py-8 flex flex-col gap-2 w-full backdrop-blur-md">
            <button onClick={() => handleClick("/vote")} className="w-full text-[14px] leading-[21px] rounded-sm py-2.5 px-12 font-semibold text-white bg-primary mr-3">
              Vote
            </button>
            <button onClick={() => handleClick("/agent")} className="w-full text-[14px] leading-[21px] rounded-sm py-2.5 px-12 font-semibold text-primary bg-white mr-3">
              Create
            </button>
            <ConnectButton className="bg-primary" />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
