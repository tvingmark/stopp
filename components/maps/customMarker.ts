// Custom Bike Markers
// Variables
// type and batt and proximity
import { BikeStatus } from "../../workers/comlink.worker";

export default function CustomBikeMarker(bike: BikeStatus) {
  var el = document.createElement("div");
  el.className = "marker";
  el.style.width = "24px";
  el.style.height = "24px";

  if (bike.vendor == "hopp") {
    el.innerHTML =
      '<svg width="20"       height="20"       viewBox="0 0 56 56"       fill="none"       xmlns="http://www.w3.org/2000/svg"     >       <circle cx="28" cy="28" r="25.5" stroke="black" stroke-width="5" />       <circle cx="28" cy="28" r="20" fill="#1CE5BE" />       <path         d="M21.2109 37H25.0781V30.5703H31.3828V37H35.2422V21H31.3828V27.4219H25.0781V21H21.2109V37Z"         fill="black"       />     </svg>';
  } else {
    el.innerHTML = `<svg width="20" height="20" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"> 
    <circle cx="28" cy="28" r="25" stroke="black" stroke-width="5"/
    <circle cx="28" cy="28" r="20" fill="#FFFA00"/>
    <path d="M21.0469 37H24.7656L27.6484 27.2969H27.7734L30.6563 37H34.3828L39.0312 21H34.7656L32.3438 31.5078H32.2109L29.4531 21H25.9688L23.2109 31.4844H23.0781L20.6641 21H16.3906L21.0469 37Z" fill="black"/>
    </svg>`;
  }
  return el;
}

export function HomeMarker() {
  var el = document.createElement("div");
  el.className =
    "marker bg-blue-100 bg-opacity-25 rounded-full bg-transparent mx-1 z-50 flex justify-center items-center";
  el.style.width = "18px";
  el.style.height = "18px";
  el.innerHTML = `
  <svg width="30" height="30" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"> 
  <circle cx="28" cy="28" r="25" stroke="white" stroke-width="5"/
  <circle cx="28" cy="28" r="20" fill="#4285F4"/>
  </svg>
  `;
  return el;
}
