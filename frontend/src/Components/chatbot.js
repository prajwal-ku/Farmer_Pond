import { useState, useRef } from "react";
import { Webchat, WebchatProvider, Fab, Configuration } from "@botpress/webchat";

const botpressConfigUrl = "https://files.bpcontent.cloud/2025/04/01/18/20250401185039-ME5TQTUV.json";

export default function Chatbot() {
  const chatRef = useRef(null);
  const [isWebchatOpen, setIsWebchatOpen] = useState(false);

  const toggleWebchat = () => {
    setIsWebchatOpen((prevState) => !prevState);
  };

  return (
    <div ref={chatRef} style={{ width: "100vw", height: "100vh" }}>
      <WebchatProvider configUrl={botpressConfigUrl}>
        <Fab onClick={toggleWebchat} />
        {isWebchatOpen && <Webchat />}
      </WebchatProvider>
    </div>
  );
}
