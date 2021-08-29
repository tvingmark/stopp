// Custom Bike Markers
// Variables
// type and batt and proximity
import { BikeStatus, BusStatus } from "../../workers/comlink.worker";

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

export function CustomBusMarker(bus?: BusStatus) {
  const rotate = 'rotate('+ bus.heading.toString()+'deg);'
  var el = document.createElement("div");
  el.className =
    "marker bg-yellow-400 rounded-full bg-transparent mx-1 z-50 flex justify-center font-extrabold items-center";
  el.style.width = "24px";
  el.style.height = "24px";
  el.innerHTML = `
  <svg class="relative" style=transform:`+rotate+` width="30" height="30" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="29.1639" cy="29.0768" r="24" stroke="#FFCF00" stroke-width="8"/>
  <circle cx="29.164" cy="29.0769" r="20" fill="#AD0000"/>
  <path d="M27.107 3.85641C27.9221 2.63595 29.7303 2.6798 30.4853 3.93834L36.125 13.3399C36.9359 14.6916 35.9372 16.4063 34.3614 16.3681L22.633 16.0837C21.0572 16.0455 20.1429 14.2843 21.0183 12.9735L27.107 3.85641Z" fill="#FFFFFF"/>
  </svg>
  <div class="absolute text-xs text-white font-bold>`+bus.routeNumber.toString()+`</div>
  `;
  const number = document.createElement("div")
  number.className = "absolute text-white font-bold"
  number.style.fontSize = "9px";
  number.innerText = bus.routeNumber.toString();
  el.appendChild(number);
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
