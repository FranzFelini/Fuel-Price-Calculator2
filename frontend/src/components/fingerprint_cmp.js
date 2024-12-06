import FingerprintJS from "@fingerprintjs/fingerprintjs-pro";
import React, { useEffect } from "react";

const FingerprintComponent = () => {
  useEffect(() => {
    const collectFingerprint = async () => {
      try {
        // Initialize FingerprintJS Pro with your API key
        const fp = await FingerprintJS.load({ apiKey: "1riiiHV7dYzPEyYepw6A" });

        // Get the unique visitor ID (fingerprint)
        const result = await fp.get();
        const fingerprint = result.visitorId;

        console.log("Collected Fingerprint:", fingerprint);

        // Optionally, you can send this fingerprint data to your backend or log it somewhere
        // But if you're only interested in seeing it on the FingerprintJS dashboard,
        // you don't need to send it anywhere else.
      } catch (error) {
        console.error("Error collecting fingerprint:", error);
      }
    };

    collectFingerprint();
  }, []);

  return <div>Collecting and sending fingerprint data...</div>;
};

export default FingerprintComponent;
