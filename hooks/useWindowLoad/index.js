// node modules
import { useState } from "react";

// local modules - hooks
import useWindowEvent from "../useWindowEvent";
import useTimeout from "../useTimeout";

// local modules - functions
import checkIsWindowLoaded from "@letea/functions/checkIsWindowLoaded";

const useWindowLoad = () => {
  const [isLoaded, setIsLoaded] = useState(checkIsWindowLoaded());

  const handleLoad = () => {
    !isLoaded && setIsLoaded(true);
  };

  useWindowEvent({
    eventName: "load",
    callback: handleLoad
  });

  useTimeout({
    callback: () => {
      checkIsWindowLoaded() && handleLoad();
    },
    duration: 3000
  });

  return isLoaded;
};

export default useWindowLoad;
