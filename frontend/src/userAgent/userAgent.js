import axios from "axios";

export const sendUserAgent = async () => {
  const userAgent = navigator.userAgent;
  const szScreen = window.screen;
  const width = szScreen.width;
  const height = szScreen.height;
  const colorDepth = szScreen.colorDepth;
  const ScreenSize =
    width + " x " + height + " " + colorDepth + " bit colour depth";

  try {
    const response = await axios.post(
      "https://fuelpricecalculator-87c55c1de61b.herokuapp.com/log-user-agent",
      { userAgent }
    );
    const response2 = await axios.post(
      "https://fuelpricecalculator-87c55c1de61b.herokuapp.com/log-user-agent",
      { ScreenSize }
    );
    console.log("User-Agent sent:", response.data);
    console.log("User-Agent sent:", response2.data);
  } catch (error) {
    console.error("User-Agent Error:", error);
  }
};
