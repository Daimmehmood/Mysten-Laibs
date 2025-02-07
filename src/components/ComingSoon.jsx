import React from "react";

function ComingSoon() {
  return (
    <div className="container mb-10">
      <h1 className="font-bold text-4xl md:text-5xl text-center md:px-32 mt-5 mb-14">
        {" "}
        <span className="text-primary">Trending</span> Agent
      </h1>
      <div className="w-[90%] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-auto gap-4">
          {/* Agency 01 */}
          <div className="w-full h-[220px] flex justify-center items-center border border-[#353535] rounded-md bg-white/5 backdrop-blur-sm relative">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Agency 01</h1>
            <span className="absolute bottom-2 left-2 text-sm sm:text-lg lg:text-xl font-bold text-primary">Total Vote -</span>
          </div>

          {/* Agency 02 */}
          <div className="w-full h-[220px] flex justify-center items-center border border-[#353535] rounded-md bg-white/5 backdrop-blur-sm relative">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Agency 02</h1>
            <span className="absolute bottom-2 left-2 text-sm sm:text-lg lg:text-xl font-bold text-primary">Total Vote -</span>
          </div>

          {/* Agency 03 */}
          <div className="w-full h-[220px] flex justify-center items-center border border-[#353535] rounded-md bg-white/5 backdrop-blur-sm relative">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Agency 03</h1>
            <span className="absolute bottom-2 left-2 text-sm sm:text-lg lg:text-xl font-bold text-primary">Total Vote -</span>
          </div>

          {/* Row 2 */}
          <div className="w-full flex flex-col md:flex-row py-10 md:py-0 gap-5 md:gap-0 flex-wrap sm:flex-nowrap justify-between items-center h-auto sm:h-[220px] border border-[#353535] rounded-md bg-white/5 backdrop-blur-sm col-span-1 sm:col-span-2 lg:col-span-3">
            {/* Column 1 */}
            <div className="flex flex-col justify-center items-center w-1/3 sm:basis-1/3">
              <h1 className="text-center font-bold text-sm sm:text-lg lg:text-xl">Total Submissions</h1>
              <span className="text-primary text-3xl sm:text-4xl lg:text-5xl font-bold md:mt-3">0</span>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col justify-center items-center w-1/3 sm:basis-1/3">
              <h1 className="text-center font-bold text-sm sm:text-lg lg:text-xl">Total Submissions</h1>
              <span className="text-primary text-3xl sm:text-4xl lg:text-5xl font-bold md:mt-3">0</span>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col justify-center items-center w-1/3 sm:basis-1/3">
              <h1 className="text-center font-bold text-sm sm:text-lg lg:text-xl">Total Submissions</h1>
              <span className="text-primary text-3xl sm:text-4xl lg:text-5xl font-bold md:mt-3">0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComingSoon;
