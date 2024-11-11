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
  

     if (loading || !data || map.current) return;
   // if (map.current) return; // Initialise la carte seulement une fois
    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-74.5, 40],
        zoom: 9,
      });

      map.current.on("load", () => {
         console.log(data)

        for (const key in data.features) {
          if(data.features[key].geometry){
        
           // console.log("dd" , key)
            
            // const pipeline = data[key];
           // console.log("pipeline",data.features[key].geometry.coordinates)

            const line = turf.lineString(data.features[key].geometry.coordinates);
      
            // Ajoutez une source pour chaque pipeline
            map.current?.addSource(`pipeline-${data.features[key].properties.ProjectID}`, {
              type: 'geojson',
              data: line,
            });
      
            // Définissez la couleur et l'épaisseur en fonction des propriétés du pipeline
            const color = data.features[key].properties.Status === 'Operating' ? '#FF0000' : '#0000FF'; // rouge pour haute pression, bleu pour basse pression
            const lineWidth = data.features[key].properties.Capacity > 500 ? 4 : 2; // épaisseur conditionnelle en fonction de la longueur
      
            // Ajoutez un layer pour chaque pipeline
            map.current?.addLayer({
              id: `pipeline-layer-${data.features[key].properties.ProjectID}`,
              type: 'line',
              source: `pipeline-${data.features[key].properties.ProjectID}`,
              layout: {},
              paint: {
                'line-color': color,
                'line-width': lineWidth,
              },
           });
      
            // Ajoutez des événements pour afficher les détails sur le survol
            map.current?.on('mouseenter', `pipeline-layer-${data.features[key].properties.ProjectID}`, (e) => {
              map.current!.getCanvas().style.cursor = 'pointer';
              const coordinates = e.lngLat;
              const description = `Pipeline ID: ${data.features[key].properties.ProjectID}, Type: ${data.features[key].properties.Fuel}, Length: ${data.features[key].properties.LengthKnownKm} km`;
      
              new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map.current!);
            });
      
            map.current?.on('mouseleave', `pipeline-layer-${data.features[key].properties.ProjectID}`, () => {
              map.current!.getCanvas().style.cursor = '';
              map.current!.getPopup()?.remove();
            });
          
          }
        }

//        const point = turf.point([-74.5, 40]);
//        const buffer = turf.buffer(point, 5, { units: "kilometers" });
//        map.current?.addSource("buffer", { type: "geojson", data: buffer });
//      map.current?.addLayer({
//          id: "buffer-layer",
//          type: "fill",
//          source: "buffer",
//          layout: {},
//          paint: { "fill-color": "#888888", "fill-opacity": 0.4 },
//        });
    

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