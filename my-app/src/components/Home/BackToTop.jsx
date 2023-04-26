import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

function BackToTop() {
  const [showButton, setShowButton] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const pageHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const newScrollPercentage = (window.scrollY / pageHeight) * 100;
      setScrollPercentage(newScrollPercentage);

      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {showButton && (
        <button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}
      <div className="progress-bar" style={{ width: `${scrollPercentage}%` }} />
    </>
  );
}

export default BackToTop;
