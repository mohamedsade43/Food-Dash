import React from "react";
import sallad1 from "../assets/sallad1.png";
import sallad2 from "../assets/sallad2.png";
import MenuItem from "./menu/MenuItem";

const HomePage = () => {
  return (
  
    <section>
      <div className="absolute left-0 right-0 w-full justify-start">
        <div className="absolute lef-0 -top-[70px] text-left -z-10">
          <img src={sallad1} alt="Sallad1" width={107} height={195} />
        </div>

        <div className="absolute -top-[100px] right-0 -z-10">
          <img src={sallad2} alt="Sallad2" width={107} height={195} />
        </div>
      </div>
      <div className="text-center">
        <h3 className="uppercase text-gray-500 font-semibold leading-4">
          Check out
        </h3>
        <h2 className="text-primary font-bold text-4xl italic">Menu</h2>
      </div>
      <div className="grid grid-cols-3 gap-4">
       <MenuItem />
       {/* <MenuItem />
       <MenuItem />
       <MenuItem />
       <MenuItem />
       <MenuItem /> */}

      </div>
    </section>
  );
};

export default HomePage;
