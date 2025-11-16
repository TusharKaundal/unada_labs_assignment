const headers = [
  "Home",
  "About",
  "Contact",
  "Meteora",
  "Galaxies",
  "Solar System",
  "Earth",
];

import etheron from "./assets/images/etheron.png";
import lumenara from "./assets/images/lumenara.png";
import theronix from "./assets/images/theronix.png";
import orionis from "./assets/images/orionis.png";

const planetsData = [
  {
    name: "Etheron",
    image: etheron,
    galaxy: "Andromeda-IV",
    diameter: "16,400",
    dayLength: 26,
    avgTemperature: "-20°C to 0°C",
    climate: "Polar",
  },
  {
    name: "Lumenara",
    image: lumenara,
    galaxy: "Andromeda-IV",
    diameter: "11,540",
    dayLength: 56,
    avgTemperature: "10°C to 30°C",
    climate: "Tropical",
  },
  {
    name: "Theronix",
    image: theronix,
    galaxy: "Sombrero",
    diameter: "56,780",
    dayLength: 12,
    avgTemperature: "60°C to 90°C",
    climate: "Temperate",
  },
  {
    name: "Orionis",
    image: orionis,
    galaxy: "Virgo A",
    diameter: "120,780",
    dayLength: 4,
    avgTemperature: "10°C to 45°C",
    climate: "Temperate",
  },
];

import SolarSytem from "./assets/images/solarsystem.png";
import { useRef, useState } from "react";

function App() {
  const [imageIndex, setImageIndex] = useState(0);
  const [planetAngle, setPlanetAngle] = useState(0);

  const prevIndex = (imageIndex - 1 + planetsData.length) % planetsData.length;
  const nextIndex = (imageIndex + 1) % planetsData.length;
  const planetRef = useRef(null);

  function handlePrev() {
    setImageIndex(prevIndex);
    const finalAngle = planetAngle - 20;
    const overshootAngle = finalAngle - 10;

    if (planetRef.current && prevIndex > 0) {
      planetRef.current.style.transform = `rotate(${overshootAngle}deg)`;
      setTimeout(() => {
        if (!planetRef.current) return;
        planetRef.current.style.transform = `rotate(${finalAngle}deg)`;
      }, 500);
    }
    setPlanetAngle(finalAngle);
  }

  function handleNext() {
    setImageIndex(nextIndex);
    const finalAngle = planetAngle + 20;
    const overshootAngle = finalAngle + 10;

    if (planetRef.current && nextIndex > 0) {
      planetRef.current.style.transform = `rotate(${overshootAngle}deg)`;
      setTimeout(() => {
        if (!planetRef.current) return;
        planetRef.current.style.transform = `rotate(${finalAngle}deg)`;
      }, 500);
    }
    setPlanetAngle(finalAngle);
  }
  return (
    <div className="app">
      <header className="header">
        <nav>
          <ul className="nav-links">
            {headers.map((link, idx) => (
              <li
                key={link}
                className={`nav-item${idx === 3 ? " uppercase" : ""}`}
              >
                {link}
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="planets-wrap">
        <div className="planet">
          <h1 className="planet-name">{planetsData[imageIndex].name}</h1>
          <div className="planet-infos">
            <div className="info">
              <h4>Galaxy</h4>
              <p>{planetsData[imageIndex].galaxy}</p>
            </div>
            <div className="info">
              <h4>Diameter</h4>
              <p>{planetsData[imageIndex].diameter} km</p>
            </div>
            <div className="info">
              <h4>Day Length</h4>
              <p>{planetsData[imageIndex].dayLength} Earth hours</p>
            </div>
            <div className="info">
              <h4>Avg Temperature</h4>
              <p>{planetsData[imageIndex].avgTemperature}</p>
            </div>
            <div className="info">
              <h4>Climate</h4>
              <p>{planetsData[imageIndex].climate}</p>
            </div>
          </div>
          <div className="planet-image-wrap">
            <img
              className="prev-img"
              src={planetsData[prevIndex]?.image}
              alt={planetsData[prevIndex]?.name}
              onClick={handlePrev}
            />
            <img
              ref={planetRef}
              className="main-img"
              src={planetsData[imageIndex].image}
              alt={planetsData[imageIndex].name}
            />
            <img
              className="next-img"
              src={planetsData[nextIndex]?.image}
              alt={planetsData[nextIndex]?.name}
              onClick={handleNext}
            />
          </div>
        </div>

        <img className="backImage" src={SolarSytem} alt="Solar System" />
      </main>
    </div>
  );
}

export default App;
