import {
  useState,
  useRef,
  FormEvent,
  useEffect,
  useDeferredValue,
  useMemo,
} from "react";
import interact from "interactjs";
import html2canvas from "html2canvas";
import { v4 as uuid } from "uuid";
import { renderToString } from 'react-dom/server'
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
import "react-lazy-load-image-component/src/effects/blur.css";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import darkModeAtom from "~/atoms/darkmode";
// @ts-ignore
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

interface Shape {
  name: string;
  svg?: React.ReactNode;
  styles?: any;
}

const shapes: Shape[] = [
  {
    name: "Square/Rectangle",
    styles: {
      width: "100px",
      height: "100px",
      backgroundColor: "white",
    }
  }
];

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

interface Template {
  id: number;
  src: string;
  previewSrc: string;
  title: string;
  alt: string;
}

function Create({ publish }: { publish: (image: File) => void }) {
  const { data: session } = useSession();
  const publishD = session === null ? "data-tip" : "data-not-tip";

  const imageContainer: any = useRef();
  const offScreenImage: any = useRef();
  const [memeTemplateView, setMemeTemplate] = useState<string>(
    "/meme-photos/always-has-been.png"
  );
  const [selectedText, setSelectedText] = useState(""); // Id of generated element
  const [selectedImage, setSelectedImage] = useState(""); // Id of generated element
  const [selected, setSelected] = useState(""); // Id of generated element
  const [currentText, setCurrentText] = useState("");
  const [memeTemplates, setMemeTemplates] = useState<Template[]>([]);
  const [strokeWidth, setStrokeWidth] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [shapesModalOpen, setShapesModalOpen] = useState(false);
  const [dark, setDark] = useAtom(darkModeAtom);
  const [search, setSearch] = useState("");
  const [searchT, setSearchT] = useState("");
  const defferedSearch = useDeferredValue(searchT);
  const [googleSearchResults, setGoogleSearchResults] = useState<string[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [tPlates, setTPlates] = useState<Template[]>([]);
  const searchNow = async () => {
    setSearchLoading(true);
    setTimeout(async () => {
      const res = await fetch(`/api/getGoogleResults?search=${search}`);
      const d = await res.json();
      setGoogleSearchResults(d);
      setSearchLoading(false);
    }, 200);
  };

  useEffect(() => {
    if (!selectedText) {
      return
    }
    const currentSelected = document.querySelector(".selected-meme-item")
    if (currentSelected) {
      currentSelected.classList.remove("selected-meme-item")
    }
    const shouldBeSelected = document.querySelector(`#${selectedText}`)
    shouldBeSelected?.classList.add("selected-meme-item")
  }, [selectedText])

  useEffect(() => {
    if (!selectedImage) {
      return
    }
    const currentSelected = document.querySelector(".selected-meme-item")
    if (currentSelected) {
      currentSelected.classList.remove("selected-meme-item")
    }
    const shouldBeSelected = document.querySelector(`#${selectedImage}`)
    shouldBeSelected?.classList.add("selected-meme-item")
  }, [selectedImage])

  const tms = useRef<any>(null);

  useEffect(() => {
    setTimeout(() => {
      const e = { target: { src: memeTemplateView } };
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useTemplate(e);
    }, 1000);

    // Get all meme templates from folder /templates
    fetch(`/api/getMemeTemplates`).then(async (res) => {
      const templates = await res.json();
      setMemeTemplates(templates);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMemo(() => {
    let tpl: Template[] = [];

    memeTemplates.forEach((t) => {
      if (t.alt.toLowerCase().includes(defferedSearch.toLowerCase())) {
        tpl.push(t);
      }
    });

    setTPlates(tpl);
  }, [defferedSearch, memeTemplates]);

  function dragMoveListener(event: any) {
    var target = event.target;
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

    // translate the element
    target.style.top = y + "px";
    target.style.left = x + "px";

    // update the position attributes
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
  }

  const downloadMeme = () => {
    const rotaters = document.querySelectorAll(".rotation-handle");
    const selected = document.querySelectorAll('.selected-meme-item')
    selected.forEach(s => {
      s.classList.remove('selected-meme-item')
    })
    rotaters.forEach((r: any) => {
      r.style.display = "none";
    });
    html2canvas(imageContainer.current!, { useCORS: true }).then(function (
      canvas
    ) {
      canvas.toBlob((blob) => saveAs(blob!, `lmfao-tech-${Date.now()}.png`));
    });
    rotaters.forEach((r: any) => {
      r.style.display = "table";
    });
  };

  const addToClipboard = (image: Blob) => {
    navigator.clipboard.write([
      new ClipboardItem({
        [image.type]: image,
      }),
    ]);
    toast.success("Image copied to clipboard", {
      position: "top-center",
    });
  };

  const copyToClipboard = () => {
    const rotaters = document.querySelectorAll(".rotation-handle");
    const selected = document.querySelectorAll('.selected-meme-item')
    selected.forEach(s => {
      s.classList.remove('selected-meme-item')
    })
    rotaters.forEach((r: any) => {
      r.style.display = "none";
    });
    html2canvas(imageContainer.current!, { useCORS: true }).then(function (
      canvas
    ) {
      canvas.toBlob((blob) => addToClipboard(blob!));
    });
    rotaters.forEach((r: any) => {
      r.style.display = "table";
    });
  };

  const publishMeme = (e: any) => {
    e.preventDefault();
    const rotaters = document.querySelectorAll(".rotation-handle");
    rotaters.forEach((r: any) => {
      r.style.display = "none";
    });
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
          rotaters.forEach((r: any) => {
            r.style.display = "table";
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
        rotaters.forEach((r: any) => {
          r.style.display = "table";
        });
      });
  };

  const useShape = (shape: Shape) => {
    if (shape.svg) {
      const el = document.createElement("div");
      el.style.width = "100px";
      el.style.height = "100px";
      const random_id = "meme-" + uuid();
      el.id = random_id;
      interactIcon(random_id, true);
      setSelectedImage(random_id);
      setSelected(random_id)
      // @ts-ignore
      el.innerHTML = renderToString(shape.svg);
      imageContainer.current.append(el);
      setSelectedImage(random_id);
      setSelected(random_id)
      return;
    }
    const el = document.createElement("div");
    Object.keys(shape.styles).forEach((st: string) => {
      // @ts-ignore
      el.style[`${st}`] = shape.styles[st];
    });
    const random_id = "meme-" + uuid();
    el.id = random_id;
    imageContainer.current.append(el);
    interactIcon(random_id);
    setSelectedImage(random_id);
    setSelected(random_id)
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
    if (selected) {
      let el = document.querySelector(`#${selected}`);
      if (el) {
        el.remove();
      }
      setSelectedText("");
      setSelectedImage("");
      setSelected("")
      setCurrentText("");
    } else if (selectedImage) {
      let el = document.querySelector(`#${selectedImage}`);
      if (el) {
        el.remove();
      }
      setSelectedImage("");
      setSelectedText("");
      setSelected("")
    }
  };

  const addFile = async () => {
    try {
      const selectedFile: any = await selectFile("png, jpg");
      const fileReader = new FileReader();
      const maxHeight = imageContainer.current!.offsetHeight;
      fileReader.readAsDataURL(selectedFile);

      fileReader.onload = function (oEvnt: any) {
        const newImage = document.createElement("img");
        newImage.src = oEvnt.target.result;

        // Decrease image height if it is too large
        if (newImage.height > maxHeight) {
          newImage.style.height = maxHeight + "px";
        }

        newImage.setAttribute("alt", ".");
        const random_id = "meme-" + uuid();
        newImage.setAttribute("id", random_id);
        imageContainer.current.append(newImage);

        interactIcon(random_id);
        setSelectedImage(random_id);
        setSelected(random_id)
      };
    } catch (error) {
      console.log(error);
    }
  };

  function interactIcon(id: string, svg = false) {
    interact(`#${id}`)
      .on("mousedown", (e) => {
        // set state of to manipulate the element from the toolkit
        // If element is text, set selectedText to the id of the element
        // If element is image, set selectedImage to the id of the element
        if (e.target.tagName === "IMG") {
          setSelectedImage(id);
          setSelected(id)
          //
          const selected = document.querySelector(`#${id}`);
          if (selected) {
            const currentSelected = document.querySelector(".selected-meme-item")
            if (currentSelected) {
              currentSelected.classList.remove("selected-meme-item")
            }
            selected.classList.add("selected-meme-item");
          }
        } else {
          setSelectedText(id);
          setSelected(id)
        }
      })
      .on("mouseup", (e) => {
        // Remove borders from selected image
        const selected = document.querySelector(`#${id}`);
        if (id != selectedImage && selected) {
          selected.classList.remove("border");
        }
      })
      .resizable({
        edges: { top: true, left: true, bottom: true, right: true },
        listeners: {
          start: (event) => {
            // Locks scroll during resize
            document.body.style.overflow = "hidden";
          },
          end: (event) => {
            // Unlocks scroll after resize
            document.body.style.overflow = "";
          },
          move: function (event) {
            if (svg) {
              const trgt = event.target.childNodes[0] as HTMLElement;
              trgt.setAttribute("width", `${event.rect.width}px`);
              trgt.setAttribute("height", `${event.rect.height}px`);
            }
            let { x, y } = event.target.dataset;
            x = (parseFloat(x) || 0) + event.deltaRect.left;
            y = (parseFloat(y) || 0) + event.deltaRect.top;

            Object.assign(event.target.style, {
              width: `${event.rect.width}px`,
              height: `${event.rect.height}px`,
              top: `${y}px`,
              left: `${x}px`,
              transform: `rotate(${event.target.dataset.angle}rad)`,
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

        listeners: {
          move: dragMoveListener,

          start: (event) => {
            // Locks scroll during resize
            document.body.style.overflow = "hidden";
          },
          end: (event) => {
            document.body.style.overflow = "";
          }
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
    newText.setAttribute("spellcheck", "false");
    newText.setAttribute("data-gramm", "false");
    newText.setAttribute("data-gramm_editor", "false");
    newText.setAttribute("data-enable-grammarly", "false");
    newText.style.color = "white";
    newText.style.webkitTextStroke = "1px black";
    newText.classList.add("meme_text");
    newText.innerText = "Enter text here...";
    newText.contentEditable = "true";
    imageContainer.current.append(newText);
    newText.focus();
    setSelectedText(random_id);
    setSelected(random_id)
    setCurrentText("Enter text here...");

    // Text's are not resizable but are draggle. To change size of text use the toolkit
    interact(`#${random_id}`)
      .on("mousedown", (e) => {
        // set state of to manipulate the element from the toolkit
        setSelectedText(random_id);
        setSelected(random_id)
        setCurrentText(e.target.innerText);
        const selected = document.getElementById(random_id);
        if (selected) {
          const currentSelected = document.querySelector(".selected-meme-item")
          if (currentSelected) {
            currentSelected.classList.remove("selected-meme-item")
          }
          console.log(selected)
          selected.classList.add("selected-meme-item");
        }
        
      })
      .on("keyup", (e) => {
        if (
          e.target.innerText.startsWith("Enter text here...") ||
          e.target.innerText.endsWith("Enter text here...")
        ) {
          const diff = e.target.innerText.replace("Enter text here...", "");
          e.target.innerText = diff;
          const range = document.createRange();
          range.selectNodeContents(e.target);
          range.collapse(false);
          const sel = window.getSelection();
          sel?.removeAllRanges();
          sel?.addRange(range);
        }
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

  const textFunctions = {
    toggleBold: function () {
      if (!selectedText) return;
      const textElem = document.querySelector(`#${selectedText}`);
      if (!textElem) {
        setSelectedText("")
        setSelected("")
        return
      }
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
      if (!textElem) {
        setSelected("")
        setSelectedText("")
        return
      }
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
      if (!textElem) {
        setSelectedText("")
        setSelected("")
        return
      }
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
      if (!textElem) {
        setSelectedText("")
        setSelected("")
        return
      }
      textElem.innerText = e.target.value;
    },
    changeTextSize: function (e: any) {
      if (!selectedText) return;
      const textElem = document.querySelector<HTMLElement>(`#${selectedText}`);
      if (!textElem) {
        setSelectedText("");
        setSelected("")
        return
      }
      textElem.style.fontSize = `${e.target.value}px`;
    },
    changeTextColor: function (e: any) {
      if (!selectedText) return;
      const textElem = document.querySelector<HTMLElement>(`#${selectedText}`);
      if (!textElem) {
        setSelectedText("")
        setSelected("")
        return
      }
      textElem.style.color = e.target.value;
    },
    changeBgColor: function (e: any) {
      if (!selectedText) return;
      const textElem = document.querySelector<HTMLElement>(`#${selectedText}`);
      if (!textElem) {
        setSelectedText("")
        setSelected("")
        return
      }
      textElem.style.backgroundColor = e.target.value;
    },
    removeBg: function (e: any) {
      if (!selectedText) return;
      const textElem = document.querySelector<HTMLElement>(`#${selectedText}`);
      if (!textElem) {
        setSelectedText("")
        setSelected("")
        return
      }
      textElem.style.backgroundColor = "transparent";
    },
    justifyLeft: function (e: any) {
      if (!selectedText) return;

      const textElem = document.querySelector<HTMLElement>(`#${selectedText}`);
      if (!textElem) return;
      textElem.style.textAlign = "left";
      // TODO: fix justify
    },
    justifyCenter: function (e: any) {
      if (!selectedText) return;

      const textElem = document.querySelector<HTMLElement>(`#${selectedText}`);
      if (!textElem) return;
      textElem.style.textAlign = "center";
      // TODO: fix justify
    },
    justifyRight: function (e: any) {
      if (!selectedText) return;

      const textElem = document.querySelector<HTMLElement>(`#${selectedText}`);
      if (!textElem) return;
      textElem.style.textAlign = "right";
      // TODO: fix justify
    },
    changeStrokeColor: function (e: any) {
      if (!selectedText) return;
      const textElem = document.querySelector<HTMLElement>(`#${selectedText}`);
      if (!textElem) {
        setSelectedText("")
        setSelected("")
        return
      }
      textElem.style.webkitTextStroke = `${strokeWidth}px ${e.target.value}`;
    },
    changeStrokeWidth: function (e: any) {
      if (!selectedText) return;
      const textElem = document.querySelector<HTMLElement>(`#${selectedText}`);
      if (!textElem) {
        setSelectedText("")
        setSelected("")
        return
      }
      textElem.style.webkitTextStrokeWidth = `${e}px`;
    },
  };

  useEffect(() => {
    textFunctions.changeStrokeWidth(strokeWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strokeWidth]);

  return (
    <Container>
      <HomeCategory>
        <div className="flex items-center justify-center">
          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-3 text-white bg-blue-500 rounded-md"
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
                className={`relative overflow-y-auto scrollbar-thin w-screen z-50 rounded-md h-[80vh] ${
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
                  <h1 className="my-2 text-2xl font-bold text-center">
                    Choose a meme template
                  </h1>

                  <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                  >
                    <Masonry
                      ref={tms}
                      className="flex w-full h-full gap-5 overflow-auto scrollbar-thin scrollbar-thumb-slate-200"
                    >
                      <button
                        className={`card p-1 border h-20 ${
                          !dark && "border-gray-800"
                        } m-1`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        {/* Custom image */}
                        <input
                          className="w-full h-full"
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
                        <div className="flex w-full pl-3 justify-center items-center bg-white text-black rounded-md">
                          <svg
                            width="1.48em"
                            height="1.5em"
                            viewBox="0 0 256 262"
                          >
                            <path
                              fill="#4285F4"
                              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                            ></path>
                            <path
                              fill="#34A853"
                              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                            ></path>
                            <path
                              fill="#FBBC05"
                              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                            ></path>
                            <path
                              fill="#EB4335"
                              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                            ></path>
                          </svg>
                          <input
                            type="search"
                            value={search}
                            className="w-full bg-transparent google-search-inpu"
                            placeholder="Search google for meme templates"
                            onKeyUpCapture={
                              // If enter key
                              (e) => {
                                if (e.key === "Enter") {
                                  searchNow();
                                }
                              }
                            }
                            onChange={(e) => setSearch(e.target.value)}
                          />
                        </div>

                        {googleSearchResults.length > 0 && (
                          <div className="flex flex-col h-full overflow-auto">
                            {searchLoading && (
                              <div className="flex justify-center items-center w-full py-10">
                                <svg
                                  className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                              </div>
                            )}
                            {googleSearchResults?.map((result) => (
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

                      <div
                        className={`card flex flex-col p-1 border ${
                          googleSearchResults.length > 0 ? "h-80" : "h-20"
                        } ${!dark && "border-gray-800"} m-1`}
                      >
                        <div className="flex w-full pl-3 justify-center items-center bg-white text-black rounded-md">
                          <svg width="1em" height="1em" viewBox="0 0 512 512">
                            <path
                              fill="currentColor"
                              d="M500.3 443.7L380.6 324c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0c15.606-15.64 15.606-41.04.006-56.64zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128s-57.42 128-128 128s-128-57.4-128-128z"
                            ></path>
                          </svg>
                          <input
                            type="search"
                            value={searchT}
                            className="w-full bg-transparent google-search-inpu"
                            placeholder="Search from below templates"
                            onKeyUpCapture={
                              // If enter key
                              (e) => {
                                if (e.key === "Enter") {
                                  searchNow();
                                }
                              }
                            }
                            onChange={(e) => setSearchT(e.target.value)}
                          />
                        </div>
                      </div>

                      {tPlates?.map((template, index) => {
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
                              src={template.src}
                              alt={template.alt}
                              className="w-full"
                            />
                            <h1 className="text-center">{template.alt}</h1>
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
        {shapesModalOpen &&
          ReactDOM.createPortal(
            <div className="bg-black/40 lg:bg-black/30 flex justify-center items-center p-5 lg:p-52 fixed w-screen h-screen z-[10000]">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                className={`relative overflow-y-auto scrollbar-thin w-screen z-50 rounded-md h-[80vh] ${
                  dark ? "bg-gray-600 text-white" : "bg-gray-200"
                }`}
              >
                <button
                  onClick={() => setShapesModalOpen(false)}
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
                  <h1 className="my-2 text-2xl font-bold text-center">
                    Choose a shape
                  </h1>

                  <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                  >
                    <Masonry
                      ref={tms}
                      className="flex w-full h-full gap-5 overflow-auto scrollbar-thin scrollbar-thumb-slate-200"
                    >
                      <div
                        className={`card flex flex-col p-1 border ${
                          googleSearchResults.length > 0 ? "h-80" : "h-20"
                        } ${!dark && "border-gray-800"} m-1`}
                      >
                        <div className="flex w-full pl-3 justify-center items-center bg-white text-black rounded-md">
                          <svg width="1em" height="1em" viewBox="0 0 512 512">
                            <path
                              fill="currentColor"
                              d="M500.3 443.7L380.6 324c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0c15.606-15.64 15.606-41.04.006-56.64zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128s-57.42 128-128 128s-128-57.4-128-128z"
                            ></path>
                          </svg>
                          <input
                            type="search"
                            value={searchT}
                            className="w-full bg-transparent google-search-inpu"
                            placeholder="Search from below templates"
                            onKeyUpCapture={
                              // If enter key
                              (e) => {
                                if (e.key === "Enter") {
                                  searchNow();
                                }
                              }
                            }
                            onChange={(e) => setSearchT(e.target.value)}
                          />
                        </div>
                      </div>

                      {shapes?.map((shape, index) => {
                        return (
                          <button
                            key={index}
                            className={`card p-1 border flex justify-center items-center flex-col ${
                              !dark && "border-gray-800"
                            } m-1`}
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            onClick={() => {
                              // eslint-disable-next-line react-hooks/rules-of-hooks
                              useShape(shape);
                              setShapesModalOpen(false);
                            }}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            {shape.styles &&  <div style={shape.styles}></div>}
                            {shape.svg && (
                              <div className="w-[100%] h-[100%]">
                                {shape.svg}
                              </div>
                            )}
                            <h1 className="text-center">{shape.name}</h1>
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
        <div className="relative editContainer">
          <div className="absolute w-full h-full border-2"></div>
          {/* eslint-disable @next/next/no-img-element*/}
          {/* eslint-disable jsx-a11y/alt-text */}
          <img className="hidden -z-10" src="." ref={offScreenImage} />
          <EditView
            ref={imageContainer}
            className="relative editorView"
            style={{
              backgroundImage: `url(${memeTemplateView})`,
              // height: "300px",
              border: "1px solid #000",
            }}
          >
            <h1 className="absolute z-10 text-xs font-bold text-gray-500 select-none bottom-3 right-3">
              Made using LMFAO.tech
            </h1>
          </EditView>
          <Actions className="flex items-center justify-center">
            <button
              className="z-10 flex px-4 lg:px-0 lg:w-40 lg:h-15 lg:px-0 lg:py-3 py-2 rounded-sm items-center justify-center gap-2 border btn btn-secondary dark:fill-white"
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
            </button>
            <button
              onClick={publishMeme}
              disabled={!session}
              {...{ [publishD]: "You need to login to post to twitter" }}
              className="z-10 flex px-4 lg:px-0 bg-blue-500 lg:w-40 lg:h-15 lg:py-3 py-2 rounded-sm items-center justify-center gap-2 text-white disabled:bg-blue-500/20 btn btn-primary fill-white "
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
            </button>
            <button
              className="z-10 flex items-center justify-center p-2 py-2 gap-2 dark:fill-white hidden md:block"
              onClick={copyToClipboard}
              data-tip="Copy to clipboard"
            >
              <svg width="2em" height="2em" viewBox="0 0 24 24" className="translate-y-[10px]"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M19.4 20H9.6a.6.6 0 0 1-.6-.6V9.6a.6.6 0 0 1 .6-.6h9.8a.6.6 0 0 1 .6.6v9.8a.6.6 0 0 1-.6.6Z"></path><path d="M15 9V4.6a.6.6 0 0 0-.6-.6H4.6a.6.6 0 0 0-.6.6v9.8a.6.6 0 0 0 .6.6H9"></path></g></svg>
            </button>
          </Actions>
        </div>

        {/* Editing Controls */}
        <Controls>
          <Actions className="flex items-center justify-center">
            <ActionButton
              className="flex items-center justify-center gap-2 bg-gray-200 btn dark:text-white dark:bg-gray-600 btn-light"
              onClick={AddTextToCanvas}
            >
              Add Text{" "}
              <FontAwesomeIcon className="w-5 h-5" icon={faTextHeight} />
            </ActionButton>
            <ActionButton
              className="flex items-center justify-center gap-2 bg-gray-200 btn dark:text-white dark:bg-gray-600 btn-light"
              onClick={AddImageToCanvas}
            >
              Add Image <FontAwesomeIcon className="w-5 h-5" icon={faImage} />
            </ActionButton>
            <ActionButton
              className="flex items-center justify-center gap-2 bg-gray-200 btn dark:text-white dark:bg-gray-600 btn-light"
              onClick={() => setShapesModalOpen(true)}
            >
              Add Shapes{" "}
              <svg width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor" d="M1 21h22L12 2"></path>
              </svg>
            </ActionButton>
          </Actions>
          <div className="p-0 border border-none text">
            <textarea
              onChange={textFunctions.changeText}
              className="w-full rounded resize-none dark:text-white dark:bg-gray-700"
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
                  className="w-8 h-8 font-bold border border-gray-500"
                  onClick={textFunctions.toggleBold}
                >
                  B
                </button>
                <button
                  className="w-8 h-8 italic border border-gray-500"
                  onClick={textFunctions.toggleItalics}
                >
                  I
                </button>
                <button
                  className="w-8 h-8 underline border border-gray-500"
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
                className="w-full rounded resize-none dark:text-white dark:bg-gray-700"
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
                  onClick={textFunctions.justifyLeft}
                  value="left"
                  data-justification="left"
                >
                  <FontAwesomeIcon icon={faAlignLeft} />
                </button>
                <button
                  className="midAlign border p-[5px] w-8 h-8"
                  onClick={textFunctions.justifyCenter}
                  value="center"
                  data-justification="center"
                >
                  <FontAwesomeIcon icon={faAlignCenter} />
                </button>
                <button
                  className="rightAlign border p-[5px] w-8 h-8"
                  onClick={textFunctions.justifyRight}
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
                  value={strokeWidth ? strokeWidth : 0}
                  onChange={(e) => setStrokeWidth(Number(e.target.value))}
                  className="w-full rounded resize-none dark:text-white dark:bg-gray-700"
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
                className="w-24 h-10 p-1 bg-gray-200 rounded-sm dark:bg-gray-700"
              ></input>
            </div>

            <div>
              <p>Stroke color:</p>
              <div className="inputStroke">
                <input
                  type="color"
                  className="w-24 h-10 p-1 bg-gray-200 rounded-sm dark:bg-gray-700"
                  defaultValue="#000000"
                  onChange={textFunctions.changeStrokeColor}
                />
              </div>
            </div>

            <div>
              <p>Background color:</p>
              <div className="inputStroke relative w-24">
                <button
                  onClick={textFunctions.removeBg}
                  className="absolute flex justify-center items-center top-0 right-0 w-4 h-4 -m-[7px] border-2 text-white dark:border-white border-gray-300 rounded-full bg-red-500"
                >
                  <svg width="1em" height="1em" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6Z"
                    ></path>
                  </svg>
                </button>
                <input
                  type="color"
                  className="w-24 h-10 p-1 bg-gray-200 rounded-sm dark:bg-gray-700"
                  onChange={textFunctions.changeBgColor}
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
