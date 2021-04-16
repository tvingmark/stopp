import React, { useEffect } from "react";
import WorkSVG from "./svg/work";
import HomeSVG from "./svg/home";
import AddSVG from "./svg/add";

interface ButtonProps {
  children: React.ReactNode;
  handleClick?: () => void;
  inverse?: boolean | false;
}

const Button: React.FC<ButtonProps> = ({ children, inverse, handleClick }) => {
  if (inverse) {
    return (
      <div
        onClick={handleClick}
        className="flex justify-center items-center h-10 w-10 rounded-full mx-1"
      >
        {children}
      </div>
    );
  } else {
    return (
      <div
        onClick={handleClick}
        className="flex justify-center items-center h-10 w-10 rounded-full bg-green-100 mx-1"
      >
        {children}
      </div>
    );
  }
};

export default function Banner({
  getHopp,
  children,
}: {
  getHopp: () => void;
  children?: React.ReactNode;
}) {
  const [clock, setClock] = React.useState({ h: "00", m: "00", s: "00" });
  useEffect(() => {
    setTimeout(() => {
      var d = new Date();
      var s = d.getSeconds();
      var m = d.getMinutes();
      var h = d.getHours();
      setClock({
        h: ("0" + h).substr(-2),
        m: ("0" + m).substr(-2),
        s: ("0" + s).substr(-2),
      });
    }, 1000);
    console.log("Remote useEffect");
  }, [clock]);

  return (
    <>
      <div className="w-1/2 h-20 rounded-xl p-2 bg-red-100 flex justify-center overflow-hidden mr-1">
        <div className="flex flex-col justify-center py-1 px-2 items-center">
          <div className="text-2xl sm:text-3xl font-extrabold">MONSTER</div>
        </div>
      </div>
      <div className="w-1/2 h-20 rounded-xl p-2 bg-yellow-200 flex justify-center overflow-hidden ml-1">
        <div className="flex flex-col justify-center py-1 px-2 items-center">
          <div className="text-3xl font-extrabold">
            {clock.h}
            <span className="animate-ping">:</span>
            {clock.m}
          </div>
        </div>
      </div>
    </>
  );
}
