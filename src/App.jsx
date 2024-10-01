import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [option, setOption] = useState([]);
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("en");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  // curl -X 'POST' \
  // 'https://libretranslate.de/translate' \
  // -H 'accept: application/json' \
  // -H 'Content-Type: application/x-www-form-urlencoded' \
  // -d 'q=how%20are%20you&source=en&target=es&format=text&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'

  const Translate = () => {
    const params = new URLSearchParams();
    params.append("q", "How ");
    params.append("source", from);
    params.append("target", to);
    params.append("api_key", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");

    axios
      .post("https://libretranslate.de/translate", params, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => setOutput(res.data.translatedText));
  };

  useEffect(() => {
    axios
      .get("https://libretranslate.de/languages", {
        headers: { accept: "application/json" },
      })
      .then((res) => setOption(res.data));
  }, []);

  // curl -X 'GET' \
  // 'https://libretranslate.de/languages' \
  // -H 'accept: application/json'
  return (
    <>
      <div className="App">
        <div>
          From ({from}):
          <select onChange={(e) => setFrom(e.target.value)}>
            {option.map((item, index) => (
              <option key={index} value={item.code}>
                {item.name}
              </option>
            ))}
          </select>
          To ({to}):
          <select onChange={(e) => setTo(e.target.value)}>
            {option.map((item, index) => (
              <option key={index} value={item.code}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <textarea
            cols="50"
            rows="8"
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
        </div>
        <div>
          <textarea cols="50" rows="8" value={output} readOnly></textarea>
        </div>
        <button onClick={Translate}>Translate</button>
      </div>
    </>
  );
}

export default App;
