import React, { useState, useEffect } from "react";
import "chart.js/auto";
import Navbar from "../components/NavBar";
import { useParams } from "react-router-dom";
import { getData } from "../tables/flavour";
import { getImageURL } from "../utils/image-util";
import style from "../styles/flavour.module.css";

function Flavour() {
  const params = useParams();
  const [flavorData, setFlavorData] = useState(null);

  // Fetch data asynchronously when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        console.log("Data:", data);
        // Find the object in the data array that matches the labels value in params
        const flavor = data.find((flavor) => flavor.labels === params.type);
        console.log("Flavour:", flavor);
        setFlavorData(flavor);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.type]);

  if (!flavorData) {
    return (
      <div>
        <Navbar />
        <h1>Page Unavailable</h1>
      </div>
    );
  }
  console.log("Flavour data:", flavorData.description);

  return (
    <div className={`${style.homeContainer}`}>
      <Navbar />

      <div className={`${style.homeContent}`}>
        <div className={`${style.imgContainer}`}>
          <img
            src={getImageURL(params.type)}
            alt={params.type}
            // width="500rem"
            // height="350rem"
          />
        </div>
        <br></br>
        <div className={`${style.textContainer}`}>
          <h1>{params.type}</h1>
          <b>Chemical Name: </b>
          <p>{flavorData.chemical}</p>
          <b>Description: </b>
          <p>{flavorData.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Flavour;
