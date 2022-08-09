import React from "react";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function AddIconForm(props: any) {
  return (
    <div className="text-center bg-gray-700/10 dark:bg-gray-700/40 py-3 rounded">
      <button className="bg-blue-600 px-5 py-3 text-white rounded-md" onClick={props.addFile}>
        Upload Image
      </button>
    </div>
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
