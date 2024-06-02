import React from "react";
import pizza from "../../assets/pizza.png";
import burger from "../../assets/burger.jpg";
import meat from "../../assets/meat-sallad.jpg";
import pasta1 from "../../assets/pasta-1.jpg";
import pasta2 from "../../assets/pasta-2.jpg";
import sauce from "../../assets/sauce.jpg";


const MenuItem = () => {
  return (
    <>
      <div className="dark bg-background text-text relative top-14 p-4 rounded-lg text-center w-4/5 h-6/4 mx-auto shadow-2xl">
        <img
          src={pizza}
          alt="pizza"
          className="w-full h-auto object-cover rounded-t-lg"
        />
        <h4 className="font-semibold my-3 text-xl">Pepperoni Pizza</h4>
        <p className="text-gray-500 text-sm">
          Lorem ipsum, dolor sit amet consectetur adipisicing.
        </p>
        <button className="bg-primary text-white rounded-full px-4 py-2 mt-3">
          Add to cart
        </button>
      </div>

      <div className="dark bg-background text-text relative top-14 p-4 rounded-lg text-center w-4/5 h-6/4 mx-auto shadow-2xl">
        <img
          src={meat}
          alt="meat"
          className="w-full h-auto object-cover rounded-t-lg"
        />
        <h4 className="font-semibold my-3 text-xl">Meat with sallad</h4>
        <p className="text-gray-500 text-sm">
          Lorem ipsum, dolor sit amet consectetur adipisicing.
        </p>
        <button className="bg-primary text-white rounded-full px-4 py-2 mt-3">
          Add to cart
        </button>
      </div>
      <div className="dark bg-background text-text relative top-14 p-4 rounded-lg text-center w-4/5 h-6/4 mx-auto shadow-2xl">
        <img
          src={pasta1}
          alt="pasta"
          className="w-full h-auto object-cover rounded-t-lg"
        />
        <h4 className="font-semibold my-3 text-xl">Pasta with sallad</h4>
        <p className="text-gray-500 text-sm">
          Lorem ipsum, dolor sit amet consectetur adipisicing.
        </p>
        <button className="bg-primary text-white rounded-full px-4 py-2 mt-3">
          Add to cart
        </button>
      </div>

      <div className="dark bg-background text-text relative top-14 p-4 rounded-lg text-center w-4/5 h-6/4 mx-auto shadow-2xl">
        <img
          src={pasta2}
          alt="pasta2"
          className="w-full h-auto object-cover rounded-t-lg"
        />
        <h4 className="font-semibold my-3 text-xl">Pasta with sauce</h4>
        <p className="text-gray-500 text-sm">
          Lorem ipsum, dolor sit amet consectetur adipisicing.
        </p>
        <button className="bg-primary text-white rounded-full px-4 py-2 mt-3">
          Add to cart
        </button>
      </div>

      <div className="dark bg-background text-text relative top-14 p-4 rounded-lg text-center w-4/5 h-6/4 mx-auto shadow-2xl">
        <img
          src={burger}
          alt="burger"
          className="w-full h-auto object-cover rounded-t-lg"
        />
        <h4 className="font-semibold my-3 text-xl">cheese burger</h4>
        <p className="text-gray-500 text-sm">
          Lorem ipsum, dolor sit amet consectetur adipisicing.
        </p>
        <button className="bg-primary text-white rounded-full px-4 py-2 mt-3">
          Add to cart
        </button>
      </div>
      <div className="dark bg-background text-text relative top-14 p-4 rounded-lg text-center w-4/5 h-6/4 mx-auto shadow-2xl">
        <img
          src={sauce}
          alt="sauce"
          className="w-full h-auto object-cover rounded-t-lg"
        />
        <h4 className="font-semibold my-3 text-xl">cheese burger</h4>
        <p className="text-gray-500 text-sm">
          Lorem ipsum, dolor sit amet consectetur adipisicing.
        </p>
        <button className="bg-primary text-white rounded-full px-4 py-2 mt-3">
          Add to cart
        </button>
      </div>
    </>
  );
};

export default MenuItem;
