
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import '../assert/css/svg.css';

const Magnifier = ({ src, width = '100%', height = '100%', zoomFactor = 2 }) => {
  const imageRef = useRef(null);
  const zoomRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(imageRef.current)
      .attr("width", width)
      .attr("height", height);

    const image = svg.append("image")
      .attr("xlink:href", src)
      .attr("width", width)
      .attr("height", height);

    const zoom = d3.zoom()
      .scaleExtent([1, zoomFactor])
      .on("zoom", (event) => {
        image.attr("transform", event.transform);
      });

    svg.call(zoom);
  }, [src, width, height, zoomFactor]);

  return (
    <svg ref={imageRef} />
  );
};

export default Magnifier;
