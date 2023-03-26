import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import ballpointPenSound from "./assets/sounds/pen.wav";
import fountainPenSound from "./assets/sounds/fountainpen.wav";
import pencilSound from "./assets/sounds/pencil.wav";
import markerSound from "./assets/sounds/marker.wav";

function App() {
  const [font, setFont] = useState({
    family: "Courier Prime, monospace",
    size: "1rem",
  });

  const [pen, setPen] = useState({
    color: "black",
    opacity: 1,
    fontWeight: "normal",
    sound: ballpointPenSound,
  });

  const [soundToggle, setSoundToggle] = useState(true);
  const [characterCount, setCharacterCount] = useState(0);
  const [scale, setScale] = useState(1);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFontChange = (e) => {
    const selectedFont = fonts
      .flatMap((group) => group.options)
      .find((option) => option.family === e.target.value);
    setFont(selectedFont);
  };

  const handlePenChange = (e) => {
    const selectedPen = penOptions.find(
      (option) => option.name === e.target.value
    );
    setPen(selectedPen);
  };

  const playPenSound = () => {
    const audio = new Audio(pen.sound);
    audio.volume = 0.5;

    if (soundToggle) {
      audio.play();
    }
  };

  const fonts = [
    {
      label: "Handwriting",
      options: [
        { name: "Allura", family: "Allura, cursive", size: "2rem" },
        { name: "Amatic SC", family: "Amatic SC, cursive", size: "2rem" },
        { name: "Pacifico", family: "Pacifico, cursive", size: "1.6rem" },
        {
          name: "Permanent Marker",
          family: "Permanent Marker, cursive",
          size: "1.2rem",
        },
      ],
    },
    {
      label: "Typewriter",
      options: [
        {
          name: "Courier Prime",
          family: "Courier Prime, monospace",
          size: "1rem",
        },
        { name: "Fira Mono", family: "Fira Mono, monospace", size: "1rem" },
        {
          name: "Inconsolata",
          family: "Inconsolata, monospace",
          size: "1.1rem",
        },
        {
          name: "Special Elite",
          family: "Special Elite, cursive",
          size: "1.1rem",
        },
      ],
    },
  ];

  const penOptions = [
    {
      name: "Ballpoint Pen",
      color: "black",
      opacity: 1,
      fontWeight: "normal",
      sound: ballpointPenSound,
    },
    {
      name: "Fountain Pen",
      color: "blue",
      opacity: 1,
      fontWeight: "normal",
      sound: fountainPenSound,
    },
    {
      name: "Pencil",
      color: "gray",
      opacity: 0.7,
      fontWeight: "normal",
      sound: pencilSound,
    },
    {
      name: "Marker",
      color: "red",
      opacity: 1,
      fontWeight: "bold",
      sound: markerSound,
    },
  ];

  return (
    <div className="h-screen w-screen flex flex-col  md:flex-row bg-indigo-800">
      {/* Sidebar */}
      <div className="md:w-64 flex flex-row md:flex-col gap-5 p-4 bg-white rounded-lg">
        <h2 className="text-2xl font-bold mb-4 font-mono">Index Cards Demo</h2>
        <div className="hidden md:flex md:flex-col md:gap-3">
          <div>
            <label className="block text-sm font-medium">Font:</label>
            <select
              value={font.family}
              onChange={handleFontChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              {fonts.map((group, index) => (
                <optgroup key={index} label={group.label}>
                  {group.options.map((option) => (
                    <option
                      key={option.name}
                      value={option.family}
                      style={{ fontFamily: option.family }}>
                      {option.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Pen:</label>
            <select
              value={pen.name}
              onChange={handlePenChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              {penOptions.map((option) => (
                <option
                  key={option.name}
                  value={option.name}
                  style={{ color: option.color }}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={soundToggle}
                onChange={() => setSoundToggle(!soundToggle)}
                className="mr-2"
              />
              <span className="text-sm">Sound</span>
            </label>
          </div>
          <div>
            <span className="text-sm font-medium">
              Remaining characters: {240 - characterCount}
            </span>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 h-full flex justify-center items-center">
        <div
          className="h-1/2 aspect-video bg-white shadow-lg flex flex-col mt-6 card"
          style={{
            transform: `scale(${scale})`,
          }}>
          <div className="flex flex-col h-full">
            <div className="flex flex-col mt-4">
              <input
                type={"text"}
                className="w-auto mx-2"
                style={{
                  fontFamily: font.family,
                  fontSize: font.size,
                  color: pen.color,
                  opacity: pen.opacity,
                  fontWeight: pen.fontWeight,
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  } else {
                    playPenSound();
                  }
                }}
                maxLength={26}
              />
              <div className="h-0.5 w-full bg-red-600 mb-0.5"></div>
              <div className="h-0.5 w-full bg-red-600"></div>
            </div>
            <TextareaAutosize
              className="w-full bg-transparent border-none resize-none p-2 data-bg h-52"
              style={{
                lineHeight: "1.75rem",
                fontFamily: font.family,
                fontSize: font.size,
                color: pen.color,
                opacity: pen.opacity,
                fontWeight: pen.fontWeight,
              }}
              minRows={7}
              maxRows={7}
              maxLength={240}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                } else {
                  playPenSound();
                }
              }}
              onChange={(e) => {
                setCharacterCount(e.target.value.length);
              }}
            />
          </div>
        </div>
      </div>
      {/* Footer if small */}
      <div className="md:hidden bg-white rounded-lg p-6 flex flex-col gap-3">
        <div>
          <label className="block text-sm font-medium">Font:</label>
          <select
            value={font.family}
            onChange={handleFontChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            {fonts.map((group, index) => (
              <optgroup key={index} label={group.label}>
                {group.options.map((option) => (
                  <option
                    key={option.name}
                    value={option.family}
                    style={{ fontFamily: option.family }}>
                    {option.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Pen:</label>
          <select
            value={pen.name}
            onChange={handlePenChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            {penOptions.map((option) => (
              <option
                key={option.name}
                value={option.name}
                style={{ color: option.color }}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={soundToggle}
              onChange={() => setSoundToggle(!soundToggle)}
              className="mr-2"
            />
            <span className="text-sm">Sound</span>
          </label>
        </div>
        <div>
          <span className="text-sm font-medium">
            Remaining characters: {240 - characterCount}
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
