import { useState, useRef, SyntheticEvent, FormEvent, useEffect } from "react";
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
import {
  faAlignCenter,
  faAlignLeft,
  faAlignRight,
  faImage,
  faTextHeight,
  // @ts-ignore
} from "@fortawesome/free-solid-svg-icons";
// @ts-ignore
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import darkModeAtom from "~/atoms/darkmode";
// @ts-ignore
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import toast from "react-hot-toast";
import { Spinner } from "flowbite-react";

/**
 * Select file(s).
 * @param {String} contentType The content type of files you wish to select. For instance, use "image/*" to select all types of images.
 * @param {Boolean} multiple Indicates if the user can select multiple files.
 * @returns {Promise<File|File[]>} A promise of a file or array of files in case the multiple parameter is true.
 */
function selectFile(
  contentType: string,
  multiple = false
): Promise<File | File[]> {
  return new Promise((resolve) => {
    let input = document.createElement("input");
    input.type = "file";
    input.multiple = multiple;
    input.accept = contentType;

    input.onchange = () => {
      let files = Array.from(input.files!);
      if (multiple) resolve(files);
      else resolve(files[0]!);
    };

    input.click();
  });
}

function Create({ publish }: { publish: (image: File) => void }) {
  const imageContainer: any = useRef();
  const offScreenImage: any = useRef();
  const [memeTemplateView, setMemeTemplate] =
    useState<string>("/templates/19.jpg");
  const [selectedText, setSelectedText] = useState(""); // Id of generated element
  const [selectedImage, setSelectedImage] = useState(""); // Id of generated element
  const [currentText, setCurrentText] = useState("");
  const [memeTemplates, setMemeTemplates] = useState<string[]>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [dark, setDark] = useAtom(darkModeAtom);
  const [search, setSearch] = useState("");
  const [googleSearchResults, setGoogleSearchResults] = useState<string[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchNow = () => {
    async function getResults() {
      const res = await fetch(`/api/getGoogleResults?search=${search}`);
      const d = await res.json();
      setSearchLoading(true);
      setGoogleSearchResults(d);
      setSearchLoading(false);
    }
    getResults();
  };

  const tms = useRef<any>(null);

  useEffect(() => {
    // Get all meme templates from folder /templates
    const total = 22;
    let templates = [];
    for (let i = 1; i <= total; i++) {
      templates.push(`/templates/${i}.jpg`);
    }
    setMemeTemplates(templates);
  }, []);

  function dragMoveListener(event: any) {
    var target = event.target;
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

    // translate the element
    target.style.transform = "translate(" + x + "px, " + y + "px)";

    // update the position attributes
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
  }

  const downloadMeme = () => {
    html2canvas(imageContainer.current!, { useCORS: true }).then(function (
      canvas
    ) {
      canvas.toBlob((blob) => saveAs(blob!, `lmfao-tech-${Date.now()}.png`));
    });
  };

  const publishMeme = (e: any) => {
    e.preventDefault();
    html2canvas(imageContainer.current!, { useCORS: true })
      .then(function (canvas) {
        canvas.toBlob((blob) => {
          const file = new File([blob!], `lmfao-tech-${Date.now()}.png`, {
            type: "image/png",
          });
          publish(file);
          toast.success("Meme published successfully", {
            style: {
              background: "#292929",
              color: "white",
            },
          });
        });
      })
      .catch(function (error) {
        console.log(error);
        toast.error("An error occured while posting the meme...", {
          style: {
            background: "#292929",
            color: "white",
          },
        });
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
    setModalOpen(false);
  };

  const deleteSelected = (e: FormEvent) => {
    if (selectedText) {
      let el = document.querySelector(`#${selectedText}`);
      if (el) {
        el.remove();
      }
    }
    if (selectedImage) {
      let el = document.querySelector(`#${selectedImage}`);
      if (el) {
        el.remove();
      }
    }
  };

  const addFile = async () => {
    try {
      const selectedFile: any = await selectFile("png, jpg");
      const fileReader = new FileReader();
      fileReader.readAsDataURL(selectedFile);

      fileReader.onload = function (oEvnt: any) {
        const newImage = document.createElement("img");
        newImage.src = oEvnt.target.result;
        newImage.setAttribute("alt", ".");
        const random_id = "meme-" + uuid();
        newImage.setAttribute("id", random_id);
        imageContainer.current.append(newImage);

        interactIcon(random_id);
        setSelectedImage(random_id);
      };
    } catch (error) {
      console.log(error);
    }
  };

  function interactIcon(id: string) {
    interact(`#${id}`)
      .on("tap", (e) => {
        // set state of to manipulate the element from the toolkit
        // If element is text, set selectedText to the id of the element
        // If element is image, set selectedImage to the id of the element
        if (e.target.tagName === "IMG") {
          setSelectedImage(id);
        } else {
          setSelectedText(id);
        }
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
    addFile();
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
    newText.contentEditable = "true";
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
  };

  const removeSelections = () => {
    setSelectedText("");
    setSelectedImage("");
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
      const textElem = document.querySelector<HTMLElement>(`#${selectedText}`);
      if (!textElem) return setSelectedText("");
      textElem.toggleAttribute("data-text-underlined");
      if (textElem.hasAttribute("data-text-underlined")) {
        textElem.style.textDecoration = "underline";
        return;
      }
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
      const textElem = document.querySelector<HTMLElement>(`#${selectedText}`);
      if (!textElem) return setSelectedText("");
      textElem.style.fontSize = `${e.target.value}px`;
    },
    changeTextColor: function (e: any) {
      if (!selectedText) return;
      const textElem = document.querySelector<HTMLElement>(`#${selectedText}`);
      if (!textElem) return setSelectedText("");
      textElem.style.color = e.target.value;
    },
    justify: function (e: any) {
      if (!selectedText) return;

      const textElem = document.querySelector<HTMLElement>(`#${selectedText}`);

      return;
      // TODO: fix justify
    },
  };

  return (
    <Container>
      <HomeCategory>
        <div className="flex justify-center items-center">
          <button
            onClick={() => setModalOpen(true)}
            className="text-white bg-blue-500 rounded-md px-5 py-3"
          >
            Choose a meme template
          </button>
        </div>
        {modalOpen &&
          ReactDOM.createPortal(
            <div className="bg-black/40 lg:bg-black/30 flex justify-center items-center p-5 lg:p-52 fixed w-screen h-screen z-[10000]">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                className={`relative overflow-y-auto scrollbar-thin w-screen rounded-md h-[80vh] ${
                  dark ? "bg-gray-600 text-white" : "bg-gray-200"
                }`}
              >
                <button
                  onClick={() => setModalOpen(false)}
                  className={`focus:bg-gray-500 ${
                    !dark && "hover:text-white focus:text-white"
                  } hover:bg-gray-500 p-1 rounded absolute top-0 right-0 mt-3 mr-3`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    className=""
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m12 13.4l-4.9 4.9q-.275.275-.7.275q-.425 0-.7-.275q-.275-.275-.275-.7q0-.425.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7q0-.425.275-.7q.275-.275.7-.275q.425 0 .7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275q.425 0 .7.275q.275.275.275.7q0 .425-.275.7L13.4 12l4.9 4.9q.275.275.275.7q0 .425-.275.7q-.275.275-.7.275q-.425 0-.7-.275Z"
                    ></path>
                  </svg>
                </button>

                <div className="p-3">
                  <h1 className="text-center font-bold text-2xl my-2">
                    Choose a meme template
                  </h1>

                  <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                  >
                    <Masonry
                      ref={tms}
                      className="flex gap-5 w-full h-full overflow-auto scrollbar-thin scrollbar-thumb-slate-200"
                    >
                      <button
                        className={`card p-1 border h-20 ${
                          !dark && "border-gray-800"
                        } m-1`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        {/* Custom image */}
                        <input
                          className="h-full w-full"
                          type="file"
                          accept="image/png, image/gif, image/jpeg"
                          placeholder="Custom template"
                          onChange={(e) => {
                            // Convert image to URL
                            const reader = new FileReader();
                            // @ts-ignore
                            reader.readAsDataURL(e.target.files[0]);
                            reader.onload = (event) => {
                              const img = new Image();
                              // @ts-ignore
                              img.src = event.target?.result;
                              img.onload = () => {
                                setMemeTemplate(img.src);
                                setModalOpen(false);
                              };
                            };
                          }}
                        />
                      </button>

                      <div
                        className={`card flex flex-col p-1 border ${
                          googleSearchResults.length > 0 ? "h-80" : "h-20"
                        } ${!dark && "border-gray-800"} m-1`}
                      >
                        <input
                          type="search"
                          value={search}
                          className="text-black placeholder:text-gray-500"
                          placeholder="Search for meme templates"
                          onKeyUpCapture={
                            // If enter key
                            (e) => {
                              if (e.key === "Enter") {
                                setSearchLoading(true);
                                searchNow();
                                setSearchLoading(false);
                              }
                            }
                          }
                          onChange={(e) => setSearch(e.target.value)}
                        />

                        {googleSearchResults.length > 0 && (
                          <div className="flex flex-col h-full overflow-auto">
                            {searchLoading && <Spinner />}
                            {googleSearchResults.map((result) => (
                              <button
                                key={result}
                                className={`card p-1 border ${
                                  !dark && "border-gray-800"
                                } m-1`}
                                onClick={useTemplate}
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={result} alt="meme template" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      {memeTemplates.map((template, index) => {
                        return (
                          <button
                            key={index}
                            className={`card p-1 border ${
                              !dark && "border-gray-800"
                            } m-1`}
                            onClick={useTemplate}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={template}
                              alt="LMFAO Template"
                              className="w-full"
                            />
                          </button>
                        );
                      })}
                    </Masonry>
                  </ResponsiveMasonry>
                </div>
              </motion.div>
            </div>,
            document.getElementById("modals")!
          )}
      </HomeCategory>

      {/*  */}
      <Flex>
        {/* Editing View */}
        <div className="editContainer relative">
          <div className="absolute h-full w-full border-2"></div>
          {/* eslint-disable @next/next/no-img-element*/}
          {/* eslint-disable jsx-a11y/alt-text */}
          <img className="hidden -z-10" src="." ref={offScreenImage} />
          <EditView
            ref={imageContainer}
            className="editorView"
            style={{
              backgroundImage: `url(${memeTemplateView})`,
              height: "300px",
              border: "1px solid #000",
            }}
          ></EditView>
          <Actions className="flex justify-center items-center px-5">
            <ActionButton
              className="btn btn-secondary z-10 dark:fill-white flex justify-center items-center gap-2 border"
              onClick={downloadMeme}
            >
              Download{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M6 20q-.825 0-1.412-.587Q4 18.825 4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413Q18.825 20 18 20Zm6-4l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11Z"
                ></path>
              </svg>
            </ActionButton>
            <ActionButton
              onClick={publishMeme}
              className="btn btn-primary z-10 bg-blue-600 text-white fill-white flex justify-center items-center gap-2 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m10.6 16.2l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4ZM5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h14q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Z"
                ></path>
              </svg>
              Publish
            </ActionButton>
          </Actions>
        </div>

        {/* Editing Controls */}
        <Controls>
          <Actions className="flex justify-center items-center">
            <ActionButton
              className="btn bg-gray-200 dark:text-white dark:bg-gray-600 btn-light flex justify-center items-center gap-2"
              onClick={AddTextToCanvas}
            >
              Add Text{" "}
              <FontAwesomeIcon className="h-5 w-5" icon={faTextHeight} />
            </ActionButton>
            <ActionButton
              className="btn bg-gray-200 dark:text-white dark:bg-gray-600 btn-light flex justify-center items-center gap-2"
              onClick={AddImageToCanvas}
            >
              Add Image <FontAwesomeIcon className="h-5 w-5" icon={faImage} />
            </ActionButton>
          </Actions>
          <div className="text border p-0 border-none">
            <textarea
              onChange={textFunctions.changeText}
              className="w-full resize-none dark:text-white dark:bg-gray-700 rounded"
              value={currentText}
            />
          </div>

          {/* Font Size */}
          <div className="formatting">
            {/* Bold, Italics, and Underline */}
            <div className="styling">
              <p className="font-bold">Font Style:</p>
              <div>
                <button
                  className="font-bold border border-gray-500 w-8 h-8"
                  onClick={textFunctions.toggleBold}
                >
                  B
                </button>
                <button
                  className="italic border border-gray-500 w-8 h-8"
                  onClick={textFunctions.toggleItalics}
                >
                  I
                </button>
                <button
                  className="underline border border-gray-500 w-8 h-8"
                  onClick={textFunctions.toggleUnderline}
                >
                  U
                </button>
              </div>
            </div>

            <div>
              <p className="font-bold">Font size:</p>
              <input
                type="number"
                defaultValue={16}
                maxLength={3}
                className="w-full resize-none dark:text-white dark:bg-gray-700 rounded"
                onChange={textFunctions.changeTextSize}
              />
            </div>
          </div>
          <div className="formatting">
            {/* Text alignment */}
            <div className="styling">
              <p className="font-bold">Text alignment:</p>
              <div className="fill-black dark:fill-white">
                <button
                  className="leftAlign border p-[5px] w-8 h-8"
                  onClick={textFunctions.justify}
                  value="left"
                  data-justification="left"
                >
                  <FontAwesomeIcon icon={faAlignLeft} />
                </button>
                <button
                  className="midAlign border p-[5px] w-8 h-8"
                  onClick={textFunctions.justify}
                  value="center"
                  data-justification="center"
                >
                  <FontAwesomeIcon icon={faAlignCenter} />
                </button>
                <button
                  className="rightAlign border p-[5px] w-8 h-8"
                  onClick={textFunctions.justify}
                  value="right"
                  data-justification="right"
                >
                  <FontAwesomeIcon icon={faAlignRight} />
                </button>
              </div>
            </div>

            {/* Stroke */}
            <div>
              <p>Stroke width:</p>
              <div className="inputStroke">
                <input
                  type="number"
                  defaultValue="0"
                  className="w-full resize-none dark:text-white dark:bg-gray-700 rounded"
                />
              </div>
            </div>

            <br />

            <div>
              <p>Font color:</p>
              <input
                type="color"
                defaultValue="#ffffff"
                onChange={textFunctions.changeTextColor}
                className="w-24 h-10 p-1 bg-gray-200 dark:bg-gray-700 rounded-sm"
              ></input>
            </div>

            <div>
              <p>Stroke color:</p>
              <div className="inputStroke">
                <input
                  type="color"
                  className="w-24 h-10 p-1 bg-gray-200 dark:bg-gray-700 rounded-sm"
                  defaultValue="#000000"
                />
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
