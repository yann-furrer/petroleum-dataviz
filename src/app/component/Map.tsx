"use client";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchData, filterByCountry } from '../store/reducers/pipelineSlice';
import { log } from "console";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX as string;

const Map: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.pipelineapi);
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [country, setCountry] = useState<string>("");

  useEffect(() => {

    if (!data) {
      dispatch(fetchData());
    }
  


   // if (map.current) return; // Initialise la carte seulement une fois
    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-74.5, 40],
        zoom: 9,
      });

      map.current.on("load", () => {
        const point = turf.point([-74.5, 40]);
        const buffer = turf.buffer(point, 5, { units: "kilometers" });
        map.current?.addSource("buffer", { type: "geojson", data: buffer });
      map.current?.addLayer({
          id: "buffer-layer",
          type: "fill",
          source: "buffer",
          layout: {},
          paint: { "fill-color": "#888888", "fill-opacity": 0.4 },
        });
    

        // Ajoutez une couche Mapbox pour les frontières administratives
        map.current?.addLayer({
          id: "countries-layer",
          type: "fill",
          source: {
            type: "vector",
            url: "mapbox://mapbox.country-boundaries-v1",
          },
          "source-layer": "country_boundaries", // Spécifie la couche des frontières des pays
          paint: {
            "fill-color": "#627BC1",
            "fill-opacity": 0,
          },
        });

        // Gestionnaire d'événements pour le clic sur un pays
        map.current?.on("click", "countries-layer", (e) => {
          console.log("carte")
          const country = e.features?.[0];
          if (country) {
            const countryName = country.properties?.name_en;
            setCountry(countryName)
            console.log(countryName)
            dispatch(filterByCountry(countryName))
           // alert(`Vous avez sélectionné : ${countryName}`);
          }
        });
        map.current?.on("click", (e) => {
          const features = map.current?.queryRenderedFeatures(e.point, {
            layers: ["countries-layer"],
          });
        
          // Si aucune entité de la couche "countries-layer" n'est sous le clic, on désélectionne
          if (!features || features.length === 0) {
            setCountry("");
            dispatch(filterByCountry(null));
            console.log("Sélection annulée : clic en dehors d'un pays.");
          }
        });

        // Change le curseur pour indiquer la possibilité de sélection
        map.current?.on("mouseenter", "countries-layer", () => {
          map.current!.getCanvas().style.cursor = "pointer";
        });
        map.current?.on("mouseleave", "countries-layer", () => {
          map.current!.getCanvas().style.cursor = "";
        });
      });
    }

    return () => {
      map.current?.remove();
    };
  },  [data, dispatch]);

  return <div ref={mapContainer} className="w-full h-full" />;
};

export default Map;