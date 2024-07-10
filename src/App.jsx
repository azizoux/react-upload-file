import React, { useEffect, useState } from "react";
import FileUpload from "./Component/FileUpload";

const App = () => {
  const [images, setImages] = useState([]);
  const fetchImages = async () => {
    try {
      const response = await fetch("http://localhost:3001/get-images");
      const data = await response.json();
      console.log(data);
      if (data.status === "ok") {
        setImages(data.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchImages();
  }, []);
  return (
    <div className="bg-slate-200 h-screen w-full">
      <div>
        {images &&
          images.map((img, index) => (
            <div key={index}>
              <img src={img.image} alt="" />
            </div>
          ))}
      </div>
      <FileUpload />
    </div>
  );
};

export default App;
