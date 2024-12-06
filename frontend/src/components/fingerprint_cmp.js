import { useState } from "react";

const FingerprintComponent = () => {
  // State to store the fingerprint (visitor ID)
  const [visitorId, setVisitorId] = useState(null);

  const collectFingerprint = async () => {
    try {
      // Dynamically import FingerprintJS Pro CDN script and initialize it
      const FingerprintJS = await import(
        "https://fpjscdn.net/v3/1riiiHV7dYzPEyYepw6A"
      );

      // Load the FingerprintJS Pro with the public API key
      const fp = await FingerprintJS.load({
        apiKey: "YOUR_PUBLIC_API_KEY", // Use your actual public API key here
        region: "eu", // Optional: specify the region (use "us" for US, "eu" for Europe)
      });

      // Get the unique visitor ID (fingerprint)
      const result = await fp.get();
      const id = result.visitorId;
      setVisitorId(id); // Store the visitorId in the state
      console.log("Collected Fingerprint:", id); // Log the fingerprint (visitorId)
    } catch (error) {
      console.error("Error initializing FingerprintJS:", error);
    }
  };

  collectFingerprint();
};

export default FingerprintComponent;
