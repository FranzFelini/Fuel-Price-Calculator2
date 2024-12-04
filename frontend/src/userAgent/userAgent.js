import axios from "axios";

export const sendUserAgent = async () => {
  const userAgent = navigator.userAgent;

  try {
    const response = await axios.post(
      "https://fuelpricecalculator-87c55c1de61b.herokuapp.com/log-user-agent",
      { userAgent }
    );
    console.log("User-Agent sent:", response.data);
  } catch (error) {
    console.error("User-Agent Error:", error);
  }
};
