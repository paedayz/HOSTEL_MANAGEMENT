import * as React from 'react';
import { useState, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl'
import styled from 'styled-components'

export default function Map(props) {

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoicGRheXoiLCJhIjoiY2ttMHJhYjhxMHY4aTJvcDR5emF4NjZjMCJ9.V4nwPphxyjYXejKUFoXM0Q';
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [props.longitude, props.latitude],
    zoom: 8
    });
 
var marker = new mapboxgl.Marker()
.setLngLat([props.longitude, props.latitude])
.addTo(map);
  }, [])

  return (
    <MapContainer id="map"></MapContainer>
  );
}

const MapContainer = styled.div`
  max-width:400px;
  max-height:400px;
  border: 2px solid black;
  border-radius: 10px;
  float:right;
  margin-right: 10px;
`