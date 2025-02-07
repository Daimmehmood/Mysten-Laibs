import React from "react";

function Cards() {
  return (
    <div className="border-t py-10 border-[#353535] relative overflow-hidden">
        <div className="w-[800px] aspect-square select-none pointer-events-none -z-10 absolute top-0 -left-1/4 " style={{ backgroundImage: "url(/img/Ellipse.png)", backgroundPosition: "center", backgroundSize: "130%" }}></div>
        <div className="w-[800px] aspect-square select-none pointer-events-none -z-10 absolute top-1/3 left-2/4 " style={{ backgroundImage: "url(/img/Ellipse.png)", backgroundPosition: "center", backgroundSize: "130%" }}></div>
        <div className="w-[800px] aspect-square select-none pointer-events-none -z-10 absolute bottom-0 -left-1/4 " style={{ backgroundImage: "url(/img/Ellipse.png)", backgroundPosition: "center", backgroundSize: "130%" }}></div>
      <div className="container">
        <h1 className="font-bold text-4xl md:text-5xl text-center md:px-32 mt-5 mb-14">
          <span className="text-primary">Mysten</span> <span className="text-primary">L</span>ai<span className="text-primary">bs is accelerating</span> the next generation of A.I Agents with
        </h1>

        {/* Section 01 */}
        <div className="md:h-[450px] w-[100%] md:w-[90%] mx-auto my-5 py-8 md:py-10 px-3 md:px-10 flex flex-col-reverse md:flex-row overflow-hidden border border-[#353535] rounded-md bg-white/5 backdrop-blur-sm justify-around">
          <div className="flex flex-col basis-1/2 gap-2 md:gap-0">
            <h1 className="text-primary font-bold text-4xl md:text-5xl md:mb-10">Funding</h1>
            <p className="text-md md:text-2xl font-thin md:w-3/4">We provide vital funding resources, ensuring AI innovators have the capital needed to progress from inception to success.</p>
            <div className="flex mt-auto flex-col md:flex-row gap-5 md:gap-0">
              {/* 4 png icons */}
              <button className="text-[14px] leading-[21px] rounded-sm py-2.5 px-12 font-semibold text-white bg-primary mr-5">Learn More</button>

              <div className="flex items-center justify-center md:justify-start gap-3">
                <img src="/icon/x-w.png" />
                <img src="/icon/github-w.png" />
                <img src="/icon/discord-w.png" />
                <img src="/icon/telegram-w.png" />
              </div>
            </div>
          </div>
          <div className="flex md:flex-col overflow-hidden  h-[300px] ">
            <img src="/img/section1.png" className="h-full object-cover mx-auto" />
          </div>
        </div>

        {/* Section 02 */}
        <div className="md:h-[450px] w-[100%] md:w-[90%] mx-auto my-5 py-8 md:py-10 px-3 md:px-10 flex flex-col-reverse md:flex-row-reverse overflow-hidden border border-[#353535] rounded-md bg-white/5 backdrop-blur-sm justify-around">
          <div className="flex flex-col basis-1/2 gap-2 md:gap-0">
            <h1 className="text-primary font-bold text-4xl md:text-5xl md:mb-10">Marketing</h1>
            <p className="text-md md:text-2xl font-thin md:w-3/4">We drive strategic outreach, brand alignment, and user engagement, enabling next-generation AI solutions to reach global audiences.</p>
            <div className="flex mt-auto flex-col md:flex-row gap-5 md:gap-0">
              {/* 4 png icons */}
              <button className="text-[14px] leading-[21px] rounded-sm py-2.5 px-12 font-semibold text-white bg-primary mr-5">Learn More</button>

              <div className="flex items-center justify-center md:justify-start gap-3">
                <img src="/icon/x-w.png" />
                <img src="/icon/github-w.png" />
                <img src="/icon/discord-w.png" />
                <img src="/icon/telegram-w.png" />
              </div>
            </div>
          </div>
          <div className="flex md:flex-col overflow-hidden  h-[300px] ">
            <img src="/img/section2.png" className="h-full object-cover" />
          </div>
        </div>

        {/* Section 03 */}
        <div className="md:h-[450px] w-[100%] md:w-[90%] mx-auto my-5 py-8 md:py-10 px-3 md:px-10 flex flex-col-reverse md:flex-row overflow-hidden border border-[#353535] rounded-md bg-white/5 backdrop-blur-sm justify-around">
          <div className="flex flex-col basis-1/2 gap-2 md:gap-0">
            <h1 className="text-primary font-bold text-4xl md:text-5xl md:mb-10">Tech</h1>
            <p className="text-md md:text-2xl font-thin md:w-3/4">We offer development expertise, technical guidance, and infrastructure support, paving the way for robust, scalable AI innovations.</p>
            <div className="flex mt-auto flex-col md:flex-row gap-5 md:gap-0">
              {/* 4 png icons */}
              <button className="text-[14px] leading-[21px] rounded-sm py-2.5 px-12 font-semibold text-white bg-primary mr-5">Learn More</button>

              <div className="flex items-center justify-center md:justify-start gap-3">
                <img src="/icon/x-w.png" />
                <img src="/icon/github-w.png" />
                <img src="/icon/discord-w.png" />
                <img src="/icon/telegram-w.png" />
              </div>
            </div>
          </div>
          <div className="flex md:flex-col overflow-hidden  h-[300px] ">
            <img src="/img/section3.png" className="h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
