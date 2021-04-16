// Custom Bike Markers
// Variables
// type and batt and proximity
import { Bike } from "../../workers/comlink.worker";

export default function CustomBikeMarker(bike: Bike) {
  var el = document.createElement("div");
  el.className = "marker";
  el.style.width = "30px";
  el.style.height = "30px";

  if (bike.vendor == "hopp") {
    el.innerHTML =
      '<svg width="30"       height="30"       viewBox="0 0 56 56"       fill="none"       xmlns="http://www.w3.org/2000/svg"     >       <circle cx="28" cy="28" r="25.5" stroke="black" stroke-width="5" />       <circle cx="28" cy="28" r="20" fill="#1CE5BE" />       <path         d="M21.2109 37H25.0781V30.5703H31.3828V37H35.2422V21H31.3828V27.4219H25.0781V21H21.2109V37Z"         fill="black"       />     </svg>';
  } else if (bike.vendor == "wind") {
    el.innerHTML = `<svg width="30" height="30" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"> 
    <circle cx="28" cy="28" r="25" stroke="black" stroke-width="5"/
    <circle cx="28" cy="28" r="20" fill="#FFFA00"/>
    <path d="M21.0469 37H24.7656L27.6484 27.2969H27.7734L30.6563 37H34.3828L39.0312 21H34.7656L32.3438 31.5078H32.2109L29.4531 21H25.9688L23.2109 31.4844H23.0781L20.6641 21H16.3906L21.0469 37Z" fill="black"/>
    </svg>`;
  } else {
    el.innerHTML = `<svg width="30" height="30" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="28" cy="28" r="24" stroke="#FFCF00" stroke-width="8"/>
    <circle cx="28" cy="28" r="20" fill="#AD0000"/>
    <path d="M23.5781 20H19.9922L16.0469 22.4531V25.7969L19.625 23.6094H19.7188V36H23.5781V20ZM33.3652 36.2187C37.1074 36.2187 39.8262 34.2734 39.8262 31.6719C39.8262 29.6875 38.2246 28.0781 36.2324 27.7656V27.6406C37.9668 27.3125 39.2324 25.875 39.2324 24.1094C39.2324 21.6172 36.748 19.7812 33.3652 19.7812C29.9824 19.7812 27.498 21.6094 27.498 24.1094C27.498 25.875 28.7324 27.3125 30.498 27.6406V27.7656C28.4746 28.0781 26.9043 29.6875 26.9043 31.6719C26.9043 34.2734 29.623 36.2187 33.3652 36.2187ZM33.3652 33.4766C31.9434 33.4766 30.959 32.5859 30.959 31.3594C30.959 30.1094 31.9746 29.2109 33.3652 29.2109C34.7559 29.2109 35.7715 30.1172 35.7715 31.3594C35.7715 32.5937 34.7793 33.4766 33.3652 33.4766ZM33.3652 26.4844C32.1465 26.4844 31.2715 25.6641 31.2715 24.5313C31.2715 23.4062 32.1387 22.6172 33.3652 22.6172C34.5918 22.6172 35.459 23.4141 35.459 24.5313C35.459 25.6719 34.5762 26.4844 33.3652 26.4844Z" fill="white"/>
    </svg>`;
  }
  return el;
}

export function HomeMarker() {
  var el = document.createElement("div");
  el.className =
    "marker rounded-full bg-white mx-1 z-50 flex justify-center items-center";
  el.style.width = "30px";
  el.style.height = "30px";
  el.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
  <path d="M0 0h24v24H0z" fill="none"/>
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
  `;
  return el;
}
