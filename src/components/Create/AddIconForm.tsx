import React from "react";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function AddIconForm(props: any) {
  return (
    <IconForm>
      <AddImageBtn className="btn btn-primary" onClick={props.addFile}>
        Upload Image
      </AddImageBtn>
      <p className="title">You can also choose from our library of icons</p>
      <div className="gallery">
        {/* <LazyLoadImage
          className="upload-image"
          src={meme1}
          alt="icon"
          onClick={props.addIcon}
          width="40px"
          height="40px"
          effect="blur"
          placeholderSrc={"/images/icon-canvas.png"}
        /> */}
      </div>
    </IconForm>
  );
}

const IconForm = styled.div`
  padding-bottom: 0.5rem;
  text-align: center;

  .title {
    margin: 1rem 0;
  }

  .gallery {
    max-height: 350px;
    padding: 10px 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(60px, auto));
    gap: 10px;

    @media (max-width: 500px) {
      grid-template-columns: repeat(auto-fit, minmax(40px, auto));
      gap: 12px;
    }

    .upload-image {
      cursor: pointer;
    }
  }
`;

const AddImageBtn = styled.button`
  width: 70%;
`;

export default AddIconForm;
