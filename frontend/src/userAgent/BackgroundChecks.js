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

export const getDeviceInfo = () => {
  const nVer = navigator.appVersion;
  const nAgt = navigator.userAgent;
  const browser = navigator.appName;
  const version = "" + parseFloat(navigator.appVersion);
  const majorVersion = parseInt(navigator.appVersion, 10);
  let nameOffset, verOffset, ix;

  console.log("User Agent:", nAgt);
  console.log("App Version:", nVer);

  if ((verOffset = nAgt.indexOf("Opera")) !== -1) {
    browser = "Opera";
    version = nAgt.substring(verOffset + 6);
    if ((verOffset = nAgt.indexOf("Version")) !== -1) {
      version = nAgt.substring(verOffset + 8);
    }
  } else if ((verOffset = nAgt.indexOf("MSIE")) !== -1) {
    browser = "Microsoft Internet Explorer";
    version = nAgt.substring(verOffset + 5);
  } else if ((verOffset = nAgt.indexOf("Chrome")) !== -1) {
    browser = "Chrome";
    version = nAgt.substring(verOffset + 7);
  } else if ((verOffset = nAgt.indexOf("Safari")) !== -1) {
    browser = "Safari";
    version = nAgt.substring(verOffset + 7);
    if ((verOffset = nAgt.indexOf("Version")) !== -1) {
      version = nAgt.substring(verOffset + 8);
    }
  } else if ((verOffset = nAgt.indexOf("Firefox")) !== -1) {
    browser = "Firefox";
    version = nAgt.substring(verOffset + 8);
  } else if (nAgt.indexOf("Trident/") !== -1) {
    browser = "Microsoft Internet Explorer";
    version = nAgt.substring(nAgt.indexOf("rv:") + 3);
  } else if (
    (nameOffset = nAgt.lastIndexOf(" ") + 1) <
    (verOffset = nAgt.lastIndexOf("/"))
  ) {
    browser = nAgt.substring(nameOffset, verOffset);
    version = nAgt.substring(verOffset + 1);
    if (browser.toLowerCase() === browser.toUpperCase()) {
      browser = navigator.appName;
    }
  }

  console.log("Browser:", browser);
  console.log("Version:", version);

  if ((ix = version.indexOf(";")) !== -1) version = version.substring(0, ix);
  if ((ix = version.indexOf(" ")) !== -1) version = version.substring(0, ix);
  if ((ix = version.indexOf(")")) !== -1) version = version.substring(0, ix);

  majorVersion = parseInt("" + version, 10);
  if (isNaN(majorVersion)) {
    version = "" + parseFloat(navigator.appVersion);
    majorVersion = parseInt(navigator.appVersion, 10);
  }

  const mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);
  console.log("Mobile:", mobile);

  let cookieEnabled = navigator.cookieEnabled ? true : false;
  console.log("Cookies Enabled:", cookieEnabled);

  let os = "";
  const clientStrings = [
    { s: "Windows 3.11", r: /Win16/ },
    { s: "Windows 95", r: /(Windows 95|Win95|Windows_95)/ },
    { s: "Windows ME", r: /(Win 9x 4.90|Windows ME)/ },
    { s: "Windows 98", r: /(Windows 98|Win98)/ },
    { s: "Windows CE", r: /Windows CE/ },
    { s: "Windows 2000", r: /(Windows NT 5.0|Windows 2000)/ },
    { s: "Windows XP", r: /(Windows NT 5.1|Windows XP)/ },
    { s: "Windows Server 2003", r: /Windows NT 5.2/ },
    { s: "Windows Vista", r: /Windows NT 6.0/ },
    { s: "Windows 7", r: /(Windows 7|Windows NT 6.1)/ },
    { s: "Windows 8.1", r: /(Windows 8.1|Windows NT 6.3)/ },
    { s: "Windows 8", r: /(Windows 8|Windows NT 6.2)/ },
    { s: "Windows 10", r: /(Windows 10|Windows NT 10.0)/ },
    { s: "Windows NT 4.0", r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
    { s: "Android", r: /Android/ },
    { s: "iOS", r: /(iPhone|iPad|iPod)/ },
  ];

  for (const cs of clientStrings) {
    if (cs.r.test(nAgt)) {
      os = cs.s;
      break;
    }
  }

  console.log("DETECTED OS : ", os);

  let osVersion = "";
  if (/Windows/.test(os)) {
    osVersion = /Windows (.*)/.exec(os)[1];
    os = "Windows";
  }

  switch (os) {
    case "Mac OS X":
      osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
      break;

    case "Android":
      osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
      break;

    case "iOS":
      osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
      osVersion = osVersion[1] + "." + osVersion[2] + "." + (osVersion[3] | 0);
      break;
  }

  console.log("OS Version:", osVersion);

  const deviceInfo = {
    os,
    osVersion,
    browser,
    version,
    mobile,
    cookieEnabled,
  };

  console.log("Device Info to send:", deviceInfo);

  return deviceInfo;
};

export const sendDeviceInfoToBackend = async () => {
  try {
    const deviceInfo = getDeviceInfo();
    console.log("Device Info (Before Send):", deviceInfo);

    const response = await axios.post(
      "https://fuelpricecalculator-87c55c1de61b.herokuapp.com/send-data-info",
      deviceInfo
    );
    console.log("Backend response:", response.data);
  } catch (error) {
    console.error("Error sending device info:", error);
  }
};
