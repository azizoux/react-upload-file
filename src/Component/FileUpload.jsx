import React, { useState } from "react";

const FileUpload = () => {
  const [image, setImage] = useState("");
  const covertToBase64 = (e) => {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result); //base64encoded string
      setImage(reader.result);
    };
    reader.onerror = (err) => {
      console.log("Error:", err);
    };
  };
  const uploadImage = async () => {
    try {
      const response = await fetch("http://localhost:3001/upload-image", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          base64: image,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {}
  };
  return (
    <div className="bg-blue-300 py-10 mx-auto max-w-2xl my-20 flex items-center">
      <p>Let's upload Image file</p>
      <input type="file" accept="image/" onChange={covertToBase64} />
      {image && <img src={image} width={100} height={100} alt="" />}
      {image && <button onClick={uploadImage}>Charger</button>}
    </div>
  );
};

export default FileUpload;
