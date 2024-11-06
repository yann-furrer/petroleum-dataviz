// components/Map.tsx
"use client";
import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX as string;
const Map: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  useEffect(() => {
    if (map.current) return;
    // Initialize map only once
    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-74.5, 40],
        zoom : 9,
        // Initial map center coordinates zoom: 9,
        // Initial zoom level
      });
      map.current.on("load", () => {
        // Example usage of Turf.js to create a random point and add it to the map
        const point = turf.point([-74.5, 40]);
        //  const point2 = turf.point([-74.5, 40]);
      //  const point3 = turf.point([-74.5, 40]);
     //   const point4 = turf.point([-74.5, 40]);
      //  const point5 = turf.point([-74.5, 40]);
      const buffer = turf.buffer(point, 5, { units: "kilometers" });
      map.current?.addSource("buffer", { type: "geojson", data: buffer });
      map.current?.addLayer({
          id: "buffer-layer",
          type: "fill",
          source: "buffer",
          layout: {},
          paint: { "fill-color": "#888888", "fill-opacity": 0.4 },
        });
      });
   
    }
    return () => {
      map.current?.remove();
    };
  }, []);
  return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
};
export default Map;
