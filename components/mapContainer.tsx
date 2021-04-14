import React from "react";

const mapContainer = React.forwardRef(
  (props, ref: React.Ref<HTMLDivElement>) => (
    <div
      className="h-full w-full map overflow-hidden rounded-xl"
      id="map"
      ref={ref}
    >
      loading
    </div>
  )
);

export default mapContainer;

//export const MemoizedMapLibre = React.memo(MapLibre);