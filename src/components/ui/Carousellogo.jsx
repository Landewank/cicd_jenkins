import React from "react";
import logo from "../../assets/images/logo.png";

const Carousellogo = () => {
  const logos = Array(20).fill(logo); // membuat array dengan 20 elemen logo

  return (
    <div className="logos py-10 bg-slate-400 overflow-hidden">
      <div className="flex gap-4 flex-nowrap animate-slide">
        {logos.map((logo, index) => (
          <div key={index} className="w-28 h-28 flex-shrink-0">
            <img src={logo} alt={`Logo ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousellogo;
