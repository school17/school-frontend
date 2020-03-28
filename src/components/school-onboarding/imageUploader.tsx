import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import ImageCropper from "./imageCropper";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import {setImage} from './../../actions/address-form-actions';
import {setPreviewImage, resetImage, setImageUrl} from './../../actions/address-form-actions';


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
    dropZone: {
      width: "320px",
      height: "350px",
      display: "flex",
      flexDirection: "column-reverse",
      alignItems: "flex-end",
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

export default function ImageUpload(props: any) {
  const classes = uploadUseStyes();
  const dispatch = useDispatch();
  const {isImageSet, imageUrl, submitSchoolInfoForm} = useSelector((store: any) => {
    return store.addressFormStore;
  }); 
  const [isCropperEnabled, setIsCropperEnabled] = useState(false);
  const [files, setFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [croppedImage, setCroppedImage] = useState("");
  const [preview, setPreview] = useState("");
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles: any) => {
      setCroppedImage('');
      dispatch(setImage());
      if(imageUrl !== ''){
        dispatch(resetImage());
      }
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });
  useEffect(() => {
    if (submitSchoolInfoForm && imageUrl === '') {
        dispatch(setImageUrl(croppedImage));
    }
  }, [submitSchoolInfoForm]);
  const previewImage = (
    <div className={classes.preView}>
    <img src= {imagePreview}  className= {classes.preViewImg}></img>
    </div>
  );

  const thumbs = files.map((file: any) => (
    <div className={classes.thumb} key={file.name}>
      <div className={classes.thumbInner}>
      {croppedImage === '' ? <img src={file.preview} className={classes.img} />: 
      <img src={croppedImage} className={classes.img} />}
      </div>
    </div>
  ));

  const setCroppedImages = (image:any) => {
    setImagePreview(image);
    setPreviewImage(image);
  }

  const cropPreview = files.map((file: any) => (
    <div className={classes.thumb} key={file.name}>
      <div className={classes.thumbInner}>
        <ImageCropper imgSrc={file.preview} setCroppedImage = {setCroppedImages}></ImageCropper>
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

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file: any) => {
        URL.revokeObjectURL(file.preview);
        const pre: any = URL.revokeObjectURL(file.preview);
        setPreview(pre);
      });
    },
    [files]
  );

  const toggleCropperButton = (
    <div>
      {isCropperEnabled ?<Button variant="contained" color="primary" onClick={applyCroppedImage}>
        Set Image
      </Button> : <Button variant="contained" color="primary" onClick={setCropper}>
        Crop Image
        </Button> }
    </div>
  );

  return (
    <div>
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
          <div>Drag 'n' drop some files here, or click to select files</div>
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
      <div>
      {/*(croppedImage ==='') ? previewImage : ''*/}</div>
    </div>
  );
}

