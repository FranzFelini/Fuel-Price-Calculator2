import axios from "axios";
import { useEffect } from "react";

export const DeviceCheck = () => {
  // Function to get device information
  const getDeviceInfo = () => {
    const unknown = "-";
    const nVer = navigator.appVersion;
    let nAgt = navigator.userAgent;
    let browser = navigator.appName;
    let version = "" + parseFloat(navigator.appVersion);
    let majorVersion = parseInt(navigator.appVersion, 10);
    let nameOffset, verOffset, ix;

    // Opera
    if ((verOffset = nAgt.indexOf("Opera")) !== -1) {
      browser = "Opera";
      version = nAgt.substring(verOffset + 6);
      if ((verOffset = nAgt.indexOf("Version")) !== -1) {
        version = nAgt.substring(verOffset + 8);
      }
    }
    // MSIE
    else if ((verOffset = nAgt.indexOf("MSIE")) !== -1) {
      browser = "Microsoft Internet Explorer";
      version = nAgt.substring(verOffset + 5);
    }
    // Chrome
    else if ((verOffset = nAgt.indexOf("Chrome")) !== -1) {
      browser = "Chrome";
      version = nAgt.substring(verOffset + 7);
    }
    // Safari
    else if ((verOffset = nAgt.indexOf("Safari")) !== -1) {
      browser = "Safari";
      version = nAgt.substring(verOffset + 7);
      if ((verOffset = nAgt.indexOf("Version")) !== -1) {
        version = nAgt.substring(verOffset + 8);
      }
    }
    // Firefox
    else if ((verOffset = nAgt.indexOf("Firefox")) !== -1) {
      browser = "Firefox";
      version = nAgt.substring(verOffset + 8);
    }
    // MSIE 11+
    else if (nAgt.indexOf("Trident/") !== -1) {
      browser = "Microsoft Internet Explorer";
      version = nAgt.substring(nAgt.indexOf("rv:") + 3);
    }
    // Other browsers
    else if (
      (nameOffset = nAgt.lastIndexOf(" ") + 1) <
      (verOffset = nAgt.lastIndexOf("/"))
    ) {
      browser = nAgt.substring(nameOffset, verOffset);
      version = nAgt.substring(verOffset + 1);
      if (browser.toLowerCase() === browser.toUpperCase()) {
        browser = navigator.appName;
      }
    }

    // trim the version string
    if ((ix = version.indexOf(";")) !== -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(" ")) !== -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(")")) !== -1) version = version.substring(0, ix);

    majorVersion = parseInt("" + version, 10);
    if (isNaN(majorVersion)) {
      version = "" + parseFloat(navigator.appVersion);
      majorVersion = parseInt(navigator.appVersion, 10);
    }

    // mobile version
    const mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

    // cookie
    let cookieEnabled = navigator.cookieEnabled ? true : false;
    if (typeof navigator.cookieEnabled === "undefined" && !cookieEnabled) {
      document.cookie = "testcookie";
      cookieEnabled =
        document.cookie.indexOf("testcookie") !== -1 ? true : false;
    }

    // system
    let os = unknown;
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

    let osVersion = unknown;

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
        osVersion =
          osVersion[1] + "." + osVersion[2] + "." + (osVersion[3] | 0);
        break;
    }

    return {
      os,
      osVersion,
      browser,
      version,
      mobile,
      cookieEnabled,
    };
  };

  // Function to send device info to backend
  const sendDeviceInfoToBackend = async () => {
    try {
      const deviceInfo = getDeviceInfo();

      // Send device info via Axios POST request
      const response = await axios.post(
        "http://your-backend-url/send-data-info",
        deviceInfo
      );

      // Log the response from the backend (if necessary for debugging)
      console.log("Backend response:", response.data);
    } catch (error) {
      console.error("Error sending device info:", error);
    }
  };

  // Run the function to send device info when the component mounts
  useEffect(() => {
    sendDeviceInfoToBackend();
  }, []); // Empty array ensures it runs only once when the component mounts

  return null; // No UI rendering
};
