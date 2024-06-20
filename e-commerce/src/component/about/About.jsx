import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Map from '../../utility/Map';

const About = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .append("svg")
      .attr("width", 800)
      .attr("height", 600);

    const g = svg.append("g");

    const images = [
      { url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg", x: 100, y: 100 },
      { url: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", x: 300, y: 100 },
      { url: "https://i.imgur.com/Qphac99.jpeg", x: 500, y: 100 },
      { url: "https://i.imgur.com/Ald3Rec.jpeg", x: 100, y: 300 },
      { url: "https://i.imgur.com/4lTaHfF.jpeg", x: 300, y: 300 },
      { url: "https://i.imgur.com/Qphac99.jpeg", x: 500, y: 300 }
    ];

    const imageElements = g.selectAll("image")
      .data(images)
      .enter()
      .append("image")
      .attr("xlink:href", d => d.url)
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .attr("width", 100)
      .attr("height", 100);

    const cursor = g.append("circle")
      .attr("cx", 200)
      .attr("cy", 200)
      .attr("r", 10)
      .attr("fill", "red");

    svg.on("mousemove", (event) => {
      const [x, y] = d3.pointer(event);
      cursor.attr("cx", x)
        .attr("cy", y);
    });

  
    const zoom = d3.zoom()
      .scaleExtent([0.5, 5])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

   
    svg.call(zoom);
  }, []);

  return <>
    {/* <div ref={svgRef} /> */}
    <Map />
  </>
  
};

export default About;
