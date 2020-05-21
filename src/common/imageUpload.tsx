import React, { ReactElement, useEffect, useState, useCallback } from 'react'
import { useDropzone } from "react-dropzone";
import { makeStyles, Theme, createStyles, Button } from "@material-ui/core";
import ImageCropper from './imageCropper';
interface Props {
  saveImage:any
}

const uploadUseStyes = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    preView: {
      paddingTop: 25,
      maxWidth: '250px',
      maxHeight: '250px',
      margin: 'auto'
    },
    thumb: {
      display: "inline-flex",
      borderRadius: 2,
      border: "1px solid #eaeaea",
      marginBottom: 8,
      marginRight: 11,
      width: 250,
      height: 250,
      padding: 4,
      boxSizing: "border-box"
    },
    thumbInner: {
      display: "flex",
      minWidth: 100,
      height: 250,
      overflow: "hidden"
    },
    img: {
      display: "block",
      width: "auto",
      height: "100%",
      maxWidth: "100%",
      maxHeight: "100%"
    },
    preViewImg: {
      display: "block",
      width: "auto",
      height: "100%",
      maxWidth: "100%",
      maxHeight: "250px",
      border: 'dashed 1px',
      padding: '7px',
      backgroundColor: 'lightgrey'
    },
    container: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      margin: "10px 0"
    },
    button: {
      fontSize: 10,
      marginTop: 15
    },
    dropZone: {
      width: "320px",
      height: "350px",
      display: "flex",
      flexDirection: "column-reverse",
      alignItems: "center",
      color: "black",
      fontSize: 12,
      padding: 20,
      border: "dashed 1px grey",
      borderRadius: "7px",
      fontWeight: 600
    },
    upload: {
      margin: "auto"
    }
  })
);

function ImageUpload({saveImage}: Props): ReactElement {
  const classes = uploadUseStyes();
  const [imageUrl, setImageUrl] = useState("");
  const [files, setFiles] = useState([]);
  const [isImageSet, updateisImageSet] = useState(false);
  const [isCropperEnabled, setIsCropperEnabled] = useState(false);
  const [croppedImage, setCroppedImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const setCroppedImages = (image:any) => {
    setImagePreview(image);
    saveImage(image)
    //saveImage(files[0]);
    if(!isCropperEnabled){
      setImageUrl(image)
    }
  }

  const cropPreview = files.map((file: any) => (
    
    <div className={classes.thumb} key={file.name}>
      <div className={classes.thumbInner}>
        <ImageCropper imgSrc={file.preview} setCroppedImage = {setCroppedImages}></ImageCropper>
      </div>
    </div>
  ));

  const thumbs = files.map((file: any) => (
    <div className={classes.thumb} key={file.name}>
      <div className={classes.thumbInner}>
      {croppedImage === '' ? <img src={file.preview} className={classes.img} />: 
      <img src={croppedImage} className={classes.img} />}
      </div>
    </div>
  ));

  const setCropper = () => {
    setCroppedImage('');
    setIsCropperEnabled(true);
  };

  const applyCroppedImage = () => {
    setCroppedImage(imagePreview);
    setIsCropperEnabled(false);
  }


  const toggleCropperButton = (
    <div>
      {isCropperEnabled ?<Button variant="contained" color="primary" onClick={applyCroppedImage} className={classes.button}>
        Set Image
      </Button> : <Button variant="contained" color="primary" onClick={setCropper} className={classes.button}>
        Crop Image
        </Button> }
    </div>
  );

 
 
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles: any) => {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
      updateisImageSet(true);
    }
  });
  return (
    <section className={classes.container}>
     <div
          {...getRootProps({
            className: "dropzone",
            onClick: event => {
              if (isCropperEnabled) {
                event.stopPropagation();
              }
            }
          })}
          className={classes.dropZone}
        >
          <input type="file" placeholder="click" {...getInputProps()} />
          <div>Drag and Drop picture or click to select</div>
          {imageUrl !== '' ?  <img src={imageUrl} className={classes.img}></img>: 
           isImageSet === true ? (
            <aside>{isCropperEnabled == true ? cropPreview : thumbs}</aside>
          ) : (
            <img src={"/assest/upload.png"} className={classes.upload}></img>
          )
        }
        </div>
        
        {isImageSet && toggleCropperButton}
  </section>
  )
}

export default ImageUpload