const DEFAULT_P5_SCRIPT =
  "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.js";
const DEFAULT_P5_SOUND_SCRIPT =
  "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/addons/p5.sound.js";

// node modules
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

// local modules
import useScript from "../../hooks/useScript";

// local file
import { GlobalStyle, Wrapper } from "./style";

const Processing = ({
  hasSoundLibrary = false,
  isIgnoreLoadingMessage = false,
  isPositionFixed = false,
  sketch = null,
  zIndex = null
}) => {
  const ref = useRef();
  const isP5ScriptLoaded = useScript(DEFAULT_P5_SCRIPT);
  const isP5SoundScriptLoaded = useScript(
    hasSoundLibrary && isP5ScriptLoaded ? DEFAULT_P5_SOUND_SCRIPT : ""
  );
  const isLibraryLoaded = hasSoundLibrary
    ? isP5ScriptLoaded && isP5SoundScriptLoaded
    : isP5ScriptLoaded;

  useEffect(() => {
    let p5;

    if (sketch && isLibraryLoaded) {
      p5 = new window.p5(sketch, ref.current);
    }

    return () => {
      if (p5) {
        p5.remove();
        p5.destroy && p5.destroy();
      }
    };
  }, [isLibraryLoaded]);

  return (
    <>
      {isIgnoreLoadingMessage && <GlobalStyle />}
      <Wrapper ref={ref} isPositionFixed={isPositionFixed} zIndex={zIndex} />
    </>
  );
};

Processing.propTypes = {
  hasSoundLibrary: PropTypes.bool,
  isIgnoreLoadingMessage: PropTypes.bool,
  isPositionFixed: PropTypes.bool,
  sketch: PropTypes.func,
  zIndex: PropTypes.number
};

export default Processing;
