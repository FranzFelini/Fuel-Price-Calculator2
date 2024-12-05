import axios from "axios";

export const sendUserAgent = async () => {
  const userAgent = navigator.userAgent;
  const szScreen = window.screen;
  const width = szScreen.width;
  const height = szScreen.height;
  const colorDepth = szScreen.colorDepth;
  const FullSize =
    width + " x " + height + " " + colorDepth + " bit colour depth";

  try {
    const response = await axios.post(
      "https://fuelpricecalculator-87c55c1de61b.herokuapp.com/log-user-info",
      { userAgent, FullSize }
    );

    console.log("User-Agent sent:", response.data);
  } catch (error) {
    console.error("User-Agent Error:", error);
  }
};
