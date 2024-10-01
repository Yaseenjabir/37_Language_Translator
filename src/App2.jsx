import axios from "axios";
import { useEffect, useState } from "react";

const App2 = () => {
  const [options, setOptions] = useState([]);
  const [input, setInput] = useState("en");
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const translate = async () => {
    const params = new URLSearchParams();
    params.append("q", input);
    params.append("source", from);
    params.append("target", to);
    params.append("api_key", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");
    try {
      const res = await axios.post(
        "https://libretranslate.de/translate",
        params,
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setTranslatedText(res.data.translatedText);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await axios.get("https://libretranslate.de/languages", {
          headers: { accept: "application/json" },
        });
        setOptions(res.data);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLanguages();
  }, []);

  return (
    <>
      <div className="w-full min-h-[100vh] flex flex-col items-center justify-center border">
        <div className="w-[350px] rounded-lg pt-4 ">
          <div className="flex items-center justify-evenly">
            <div className="flex">
              <h1 className="text-lg mx-2">From:</h1>
              <select
                className="rounded px-2"
                onChange={(e) => setFrom(e.target.value)}
              >
                {options.map((item, index) => (
                  <option key={index} value={item.code}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex">
              <h1 className="text-lg mx-2">To:</h1>
              <select
                className="rounded px-2"
                onChange={(e) => setTo(e.target.value)}
              >
                {options.map((item, index) => (
                  <option key={index} value={item.code}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full mt-5">
            <p className="pl-1">Enter Your Text</p>
            <textarea
              className="w-full border outline-none px-1"
              rows="6"
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
            <p className="pl-1">Your Translated Text</p>
            <textarea
              className="w-full border outline-none px-1"
              readOnly
              rows="6"
              value={translatedText}
            ></textarea>
          </div>
          <button
            className="border rounded-md bg-orange-500 text-white px-4 py-2 mx-[35%] my-3"
            onClick={translate}
          >
            Translate
          </button>
        </div>
      </div>
    </>
  );
};
export default App2;
