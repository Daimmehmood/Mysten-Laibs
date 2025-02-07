import React from "react";

function Header() {
  return (
    <div className="m-4 md:m-0">
    <div className="container h-[400px] md:h-[500px] bg-no-repeat bg-[100%_100%] bg-[url('/img/header-m.png')] md:bg-[url('/img/header.png')] bg-[length:100%_99%] ">
      {/* <img src="/img/header.png" className="w-full mx-auto absolute select-none pointer-events-none -z-10" /> */}
      <div className="pt-6 md:pt-12 md:pl-16">
        <h1 className="text-5xl md:text-6xl font-black text-[#ffffff] bg-[#000000] md:leading-[70px] inline">
          WE’RE <br />
          SHAPING THE <br />
          FUTURE OF <br />
          AI AGENTS &nbsp;
        </h1>
        <p className="text-[#000000] font-semibold text-md md:text-2xl md:w-[400px] ml-auto mt-20" >A Mysten Laibs, we are accelerating
        the next generation of A.I agents.</p>
      </div>
    </div>
    </div>
  );
}

export default Header;
