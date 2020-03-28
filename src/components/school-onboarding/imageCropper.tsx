import React, { ReactElement, useState, useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
const imgStyles = makeStyles((theme: Theme) => 
createStyles({
  img: {
    display: 'block',
    width: 'auto',
    height: 'auto%',
    maxWidth: '100%',
    maxHeight: '100%'
  }
})
)
interface Props {
  imgSrc?: any,
  setCroppedImage?: any
}

export default function ImageCropper(props: Props): ReactElement {
  const classes = imgStyles();
  const cropperRef:any = useRef(null);
  const _crop = async ()=>{
      if(Object.keys(cropperRef).length > 0){
        if(cropperRef.current.cropper){
          props.setCroppedImage(cropperRef.current.cropper.getCroppedCanvas('image/jpeg', 1.0).toDataURL());
        }
      }
  }
  return (
      <div className = {classes.img}>
       <Cropper
        ref={cropperRef}
        src={props.imgSrc}
        className = {classes.img}
        aspectRatio={16 / 9}
        guides={true}
        crop={_crop} />
        </div>
  )
}
