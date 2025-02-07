import React from "react";

function Voting() {
  return (
    <div className="container">
      <div className="relative md:w-[90%] md:h-[650px] my-20 py-10 md:px-32 container border border-[#353535] rounded-md bg-white/5 backdrop-blur-sm overflow-hidden">
        <div className="w-[800px] aspect-square select-none pointer-events-none -z-10 absolute -top-1/3 -left-2/4 " style={{ backgroundImage: "url(/img/Ellipse.png)", backgroundPosition: "center", backgroundSize: "130%" }}></div>
        <div className="w-[800px] aspect-square select-none pointer-events-none -z-10 absolute -bottom-1/3 -right-2/4 " style={{ backgroundImage: "url(/img/Ellipse.png)", backgroundPosition: "center", backgroundSize: "130%" }}></div>
        <img src="/img/logo.png" className="h-[50px] mx-auto" />
        <h1 className="text-center text-3xl md:text-5xl font-bold mt-5">Voting Close In :</h1>
        <div className="flex gap-2 justify-center md:mt-5">
          <div className="w-[140px] md:h-[146px] rounded-md bg-primary flex justify-center items-center flex-col  text-center text-3xl md:text-5xl font-bold mt-5">
            <p>00</p>
            <span className="text-sm md:text-xl font-bold">Hours</span>
          </div>
          <div className="w-[140px] h-[100px] md:h-[146px] rounded-md bg-primary flex justify-center items-center flex-col  text-center text-3xl md:text-5xl font-bold mt-5">
            <p>00</p>
            <span className="text-sm md:text-xl font-bold">Hours</span>
          </div>
          <div className="w-[140px] h-[100px] md:h-[146px] rounded-md bg-primary flex justify-center items-center flex-col  text-center text-3xl md:text-5xl font-bold mt-5">
            <p>00</p>
            <span className="text-sm md:text-xl font-bold">Hours</span>
          </div>
          <div className="w-[140px] h-[100px] md:h-[146px] rounded-md bg-primary flex justify-center items-center flex-col  text-center text-3xl md:text-5xl font-bold mt-5">
            <p>00</p>
            <span className="text-sm md:text-xl font-bold">Hours</span>
          </div>
        </div>
        <h1 className="text-center text-3xl md:text-6xl font-bold mt-5">Let’s Grow Together</h1>
        <p className="text-primary uppercase text-md text-center mt-5">Be part of the NEXT BIG THING. CAST YOur vote on which a.i agent deserves to get the spotlight</p>
        <div className="flex justify-center flex-col md:flex-row mt-5 gap-3">
          <button className="text-[14px] leading-[21px] rounded-sm py-2.5 px-14 font-semibold text-white bg-primary ">Vote</button>
          <button className="text-[14px] leading-[21px] rounded-sm py-2.5 px-14 font-semibold text-primary bg-white">Create</button>
        </div>
      </div>
    </div>
  );
}

export default Voting;
