import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Gallery = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const authToken = sessionStorage.getItem("Auth token");
    if (authToken) {
      navigate("/gallery");
    }

    if (!authToken) {
      navigate("/auth");
    }
  }, []);

  return <div>Gallery</div>;
};

export default Gallery;
