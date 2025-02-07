import React from "react";

function Footer() {
  return (
    <footer className="max-w-[1440px] relative mx-auto ">
      <img src="/img/footer.png" className="hidden md:block w-full h-[500px] p-5 select-none pointer-events-none absolute top-0 left-0 -z-10" />
      <div className="md:py-10 md:px-16 p-4 m-2 md:m-0 bg-primary md:bg-opacity-0 md:border-none border-8 border-white rounded-lg">
        <img src="/img/footer-logo.png" className="py-6 " alt="" />
        <div className="flex flex-col md:flex-row mt-6 md:gap-32">
          <p className="md:w-[470px] text-left md:text-justify text-xl font-light">
          Mysten Laibs is a parody DAO and is in no way affiliated with Mysten Labs. We hold the official founding company of the Sui blockchain in high regard and have no intention of misrepresenting or detracting from their brand or contributions to the crypto space.
          </p>
          <div className="flex flex-col pt-5 md:pt-0">
            <a href="/" className="py-1 font-medium text-xl text-[#000000]">
              About
            </a>
            <a href="/" className="py-1 font-medium text-xl text-[#000000]">
              Trending
            </a>
            <a href="/" className="py-1 font-medium text-xl text-[#000000]">
              Blog
            </a>
            <a href="/" className="py-1 font-medium text-xl text-[#000000]">
              We're <br /> Hiring
            </a>
          </div>
          <div className="flex flex-col">
            <a href="/" className="py-1 font-medium text-xl text-[#000000]">
              Products
            </a>
            <a href="/" className="py-1 font-medium text-xl text-[#000000]">
              Contact
            </a>
            <a href="/" className="py-1 font-medium text-xl text-[#000000]">
              Bug Bounty
            </a>
          </div>
        </div>
        <div className="flex  md:flex-row flex-col justify-between items-center mt-6">
          <div className="flex gap-5">
            <img src="/icon/x.png" alt="" />
            <img src="/icon/github.png" alt="" />
            <img src="/icon/discord.png" alt="" />
            <img src="/icon/telegram.png" alt="" />
          </div>
          <div className=" flex md:flex-row flex-col gap-3 w-full md:w-auto mt-10 md:mt-0">
          <input type="text" id="first_name" className="md:min-w-[300px] bg-primary border border-[#000000] text-[#000000] text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 placeholder-[#000000]" placeholder="Sign up to recieve updates" required />
          <button className='text-[14px] leading-[21px] rounded-lg py-2.5 px-12 font-semibold text-white bg-[#000000]' >Subscribe</button>

          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between mt-6">
          <div className="flex flex-col md:flex-row pb-4 md:pb-0">
            <a className="text-[#000000] mr-10" href="#">Privacy Policy</a>
            <a className="text-[#000000]" href="#">Privacy Tearm Of Service</a>
          </div>
          <p className="text-[#000000] ">@2025 Mysten Laibs. All Right Reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
