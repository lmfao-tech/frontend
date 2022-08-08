import { useState, useRef, SyntheticEvent, FormEvent } from "react";
import interact from "interactjs";
import html2canvas from "html2canvas";
import { v4 as uuid } from "uuid";
import { saveAs } from "file-saver";
import {
  Container,
  HomeCategory,
  Flex,
  Actions,
  ActionButton,
  EditView,
  FileButtons,
  Controls,
} from "./Create.styled";
import React from "react";
import tempImage from "public/og-image.png";

function selectFile(contentType: string, multiple = false) {
  return new Promise((resolve) => {
    let input = document.createElement("input");
    input.type = "file";
    input.multiple = multiple;
    input.accept = contentType;

    input.onchange = () => {
      let files = Array.from(input.files!);
      if (multiple) resolve(files);
      else resolve(files[0]);
    };

    input.click();
  });
}

function Create() {
  const imageContainer: any = useRef();
  const offScreenImage: any = useRef();
  const [memeTemplateView, setMemeTemplate] = useState(tempImage);
  const [selectedText, setSelectedText] = useState(""); // Id of generated element
  const [currentText, setCurrentText] = useState("");
  const [memeTemplates, setMemeTemplates] = useState([]);

  console.log(tempImage);

  function dragMoveListener(event: any) {
    var target = event.target;
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

    // translate the element
    target.style.transform = "translate(" + x + "px, " + y + "px)";

    // update the posiion attributes
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
  }

  const downloadMeme = () => {
    html2canvas(imageContainer.current!).then(function (canvas) {
      canvas.toBlob((blob) => saveAs(blob!, `lmfao-tech-${Date.now()}.png`));
    });
  };

  const useTemplate = (e: any) => {
    if (!e.target.src) return;
    // const { width, height } = getComputedStyle(offScreenImage.current);
    const { width: ContainerWidth } = getComputedStyle(imageContainer.current!);
    offScreenImage.current.src = e.target.src;
    const width = offScreenImage.current.width;
    const height = offScreenImage.current.height;
    const ratio = width / height;
    const newHeight = parseFloat(ContainerWidth) / ratio;
    imageContainer.current.style.height = newHeight + "px";
    setMemeTemplate(e.target.src);
  };

  const deleteSelected = (e: FormEvent) => {
    if (selectedText) {
      if (document !== null) {
        document.querySelector(`#${selectedText}`)!.remove();
      }
    }
  };

  const addFile = async () => {
    try {
      const selectedFile = await selectFile("png, jpg");
      const fileReader = new FileReader();
      // @ts-ignore
      fileReader.readAsDataURL(selectedFile);

      fileReader.onload = function (oEvnt) {
        const newImage = document.createElement("img");
        // @ts-ignore
        newImage.src = oEvnt.target.result;
        newImage.setAttribute("alt", ".");
        const random_id = "meme-" + uuid();
        newImage.setAttribute("id", random_id);
        imageContainer.current.append(newImage);

        interactIcon(random_id);
        // TODO dispatch(closeModal());
      };
    } catch (error) {
      console.log(error);
    }
  };

  function interactIcon(id: string) {
    interact(`#${id}`)
      .on("tap", (e) => {
        // set state of to manipulate the element from the toolkit
      })
      .resizable({
        edges: { top: true, left: true, bottom: true, right: true },
        listeners: {
          move: function (event) {
            let { x, y } = event.target.dataset;

            x = (parseFloat(x) || 0) + event.deltaRect.left;
            y = (parseFloat(y) || 0) + event.deltaRect.top;

            Object.assign(event.target.style, {
              width: `${event.rect.width}px`,
              height: `${event.rect.height}px`,
              transform: `translate(${x}px, ${y}px)`,
            });

            Object.assign(event.target.dataset, { x, y });
          },
        },
      })
      .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: "parent",
            endOnly: true,
          }),
        ],
        // enable autoScroll
        autoScroll: true,

        listeners: {
          // call this function on every dragmove event
          move: dragMoveListener,

          // call this function on every dragend event
          end(event) {
            // -------
          },
        },
      });
  }

  const AddImageToCanvas = (e: any) => {
    // TODO
    // dispatch(
    //   showModal(<AddIconForm addFile={addFile} addIcon={AddIconToCanvas} />)
    // );
  };

  const AddIconToCanvas = (e: any) => {
    const newImage = document.createElement("img");
    // newImage.src = templateFive;
    newImage.src = e.target.src;
    newImage.setAttribute("alt", ".");
    const random_id = "meme-" + uuid();
    newImage.setAttribute("id", random_id);
    imageContainer.current.append(newImage);
    // TODO dispatch(closeModal());

    interactIcon(random_id);
  };

  const AddTextToCanvas = (e: any) => {
    const newText = document.createElement("div");
    const random_id = "meme-" + uuid();
    newText.setAttribute("id", random_id);
    newText.toggleAttribute("data-text-underlined");
    newText.toggleAttribute("data-text-bold");
    newText.toggleAttribute("data-text-italics");
    newText.classList.add("meme_text");
    newText.innerText = "Enter text here...";
    // @ts-ignore
    newText.contentEditable = true;
    imageContainer.current.append(newText);
    newText.focus();

    // Text's are not resizable but are draggle. To change size of text use the toolkit
    interact(`#${random_id}`)
      .on("tap", (e) => {
        // set state of to manipulate the element from the toolkit
        setSelectedText(random_id);
        setCurrentText(e.target.innerText);
      })
      .on("keypress", (e) => {
        setCurrentText(e.target.innerText);
      })
      .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: "parent",
            endOnly: true,
          }),
        ],
        // enable autoScroll
        autoScroll: true,

        listeners: {
          // call this function on every dragmove event
          move: dragMoveListener,

          // call this function on every dragend event
          end(event) {
            // -------
          },
        },
      });
    // .resizable({
    // 	edges: { top: true, left: true, bottom: true, right: true },
    // 	listeners: {
    // 		move: function (event) {
    // 			let { x, y } = event.target.dataset;

    // 			x = (parseFloat(x) || 0) + event.deltaRect.left;
    // 			y = (parseFloat(y) || 0) + event.deltaRect.top;

    // 			Object.assign(event.target.style, {
    // 				width: `${event.rect.width}px`,
    // 				height: `${event.rect.height}px`,
    // 				transform: `translate(${x}px, ${y}px)`,
    // 			});

    // 			Object.assign(event.target.dataset, { x, y });
    // 		},
    // 	},
    // })
  };

  const removeSelections = () => {
    setSelectedText("");
  };

  const textFunctions = {
    toggleBold: function () {
      if (!selectedText) return;
      const textElem = document.querySelector(`#${selectedText}`);
      if (!textElem) return setSelectedText("");
      textElem.toggleAttribute("data-text-bold");
      if (textElem.hasAttribute("data-text-bold")) {
        // @ts-ignore
        textElem.style.fontWeight = "bolder";
        return;
      }
      // @ts-ignore
      textElem.style.fontWeight = "normal";
    },
    toggleItalics: function () {
      if (!selectedText) return;
      const textElem = document.querySelector(`#${selectedText}`);
      if (!textElem) return setSelectedText("");
      textElem.toggleAttribute("data-text-italic");
      if (textElem.hasAttribute("data-text-italic")) {
        // @ts-ignore
        textElem.style.fontStyle = "italic";
        return;
      }
      // @ts-ignore
      textElem.style.fontStyle = "normal";
    },
    toggleUnderline: function () {
      if (!selectedText) return;
      const textElem = document.querySelector(`#${selectedText}`);
      if (!textElem) return setSelectedText("");
      textElem.toggleAttribute("data-text-underlined");
      if (textElem.hasAttribute("data-text-underlined")) {
        // @ts-ignore
        textElem.style.textDecoration = "underline";
        return;
      }
      // @ts-ignore
      textElem.style.textDecoration = "none";
    },
    changeText: function (e: any) {
      setCurrentText(e.target.value);
      const textElem = document.getElementById(selectedText);
      if (!textElem) return setSelectedText("");
      textElem.innerText = e.target.value;
    },
    changeTextSize: function (e: any) {
      if (!selectedText) return;
      const textElem = document.querySelector(`#${selectedText}`);
      if (!textElem) return setSelectedText("");
      // @ts-ignore
      textElem.style.fontSize = `${e.target.value}px`;
    },
    changeTextColor: function (e: any) {
      if (!selectedText) return;
      const textElem = document.querySelector(`#${selectedText}`);
      if (!textElem) return setSelectedText("");
      // @ts-ignore
      textElem.style.color = e.target.value;
    },
    justify: function (e: any) {
      console.log(e.target.dataset["justification"]);
      if (!selectedText) return;
      const textElem = document.querySelector(`#${selectedText}`);
      if (!textElem) return setSelectedText("");
      // @ts-ignore
      textElem.style.textAlign = e.target.dataset["justification"];
    },
  };

  return (
    <Container>
      <HomeCategory>
        <div className="categoryHeader">
          <h2>Meme Templates</h2>
          <div className="categoryOptions">
            <select className="category" name="category" id="category">
              <option defaultValue="Latest">Latest</option>
              <option defaultValue="Trending">Trending</option>
              <option defaultValue="Downloads">Downloads</option>
            </select>
          </div>
        </div>
      </HomeCategory>

      {/*  */}
      <Flex>
        {/* Editing View */}
        <div className="editContainer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="." alt="off-screen" hidden ref={offScreenImage} />
          <EditView
            ref={imageContainer}
            className="editorView"
            style={{
              backgroundImage: `url(${memeTemplateView})`,
              height: "290px",
            }}
          ></EditView>
          <Actions>
            <ActionButton className="btn btn-light upload">
              Upload <i className="fas fa-share-from-square"></i>
            </ActionButton>
            <ActionButton className="btn btn-secondary" onClick={downloadMeme}>
              Download <i className="fas fa-cloud-arrow-down"></i>
            </ActionButton>
          </Actions>
        </div>

        {/* Editing Controls */}
        <Controls>
          <Actions>
            <ActionButton className="btn btn-light" onClick={AddTextToCanvas}>
              Add Text <i className="fas fa-text-height"></i>
            </ActionButton>
            <ActionButton className="btn btn-light" onClick={AddImageToCanvas}>
              Add Image <i className="fas fa-image"></i>
            </ActionButton>
          </Actions>
          <div className="text">
            <textarea onChange={textFunctions.changeText} value={currentText} />
          </div>

          {/* Font Size */}
          <div className="formatting">
            {/* Bold, Italics, and Underline */}
            <div className="styling">
              <p>Font Style:</p>
              <div>
                <button className="bold" onClick={textFunctions.toggleBold}>
                  B
                </button>
                <button
                  className="italic"
                  onClick={textFunctions.toggleItalics}
                >
                  I
                </button>
                <button
                  className="underline"
                  onClick={textFunctions.toggleUnderline}
                >
                  U
                </button>
              </div>
            </div>

            <div>
              <p>Font size:</p>
              <input
                type="text"
                defaultValue={16}
                maxLength={3}
                onChange={textFunctions.changeTextSize}
              />
            </div>

            <div>
              <p>Font color:</p>
              <input
                type="color"
                defaultValue="#ffffff"
                onChange={textFunctions.changeTextColor}
              ></input>
            </div>
          </div>
          <div className="formatting">
            {/* Text alignment */}
            <div className="styling">
              <p>Text alignment:</p>
              <div>
                <button
                  className="leftAlign"
                  onClick={textFunctions.justify}
                  data-justification="left"
                >
                  <i className="fas fa-align-left"></i>
                </button>
                <button
                  className="midAlign"
                  onClick={textFunctions.justify}
                  data-justification="center"
                >
                  <i className="fas fa-align-center"></i>
                </button>
                <button
                  className="rightAlign"
                  onClick={textFunctions.justify}
                  data-justification="right"
                >
                  <i className="fas fa-align-right"></i>
                </button>
              </div>
            </div>

            {/* Stroke */}
            <div>
              <p>Stroke width:</p>
              <div className="inputStroke">
                <input type="text" defaultValue="0" />
              </div>
            </div>

            <div>
              <p>Stroke color:</p>
              <div className="inputStroke">
                <input type="color" defaultValue="#000000" />
              </div>
            </div>
          </div>
          <div>
            <ActionButton className="btn delete" onClick={deleteSelected}>
              Delete
            </ActionButton>
          </div>
        </Controls>
      </Flex>
      <FileButtons></FileButtons>
    </Container>
  );
}

export default Create;
