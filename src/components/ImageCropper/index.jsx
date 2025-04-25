import React, { useRef, useState } from "react";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";

const ImageCropper = () => {
  const [image, setImage] = useState(
    "https://res.cloudinary.com/dwl5gzbuz/image/upload/v1732108647/f7rzvkfgtcxu5afw65e4.png"
  ); // Stores the selected image
  const cropperRef = useRef(null); // Reference to the cropper instance

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle cropping
  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const croppedImage = cropper.getCroppedCanvas().toDataURL(); // Get cropped image as base64
      console.log(croppedImage); // For demonstration, log the cropped image
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && (
        <>
          <Cropper
            src={image}
            style={{ height: 400, width: "100%" }}
            // Cropper.js options
            initialAspectRatio={16 / 9}
            aspectRatio={16 / 9}
            guides={true}
            ref={cropperRef}
          />
          <button onClick={handleCrop} style={{ marginTop: "10px" }}>
            Crop Image
          </button>
        </>
      )}
    </div>
  );
};

export default ImageCropper;
