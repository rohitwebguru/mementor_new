"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import axios from "axios";
import { Link } from "react-router-dom";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
import LoseOrWin from "./LoseOrWin";
import copy from 'copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import Notification from "./Notification";

const Spinner = ({
  state,
  loadingFile,
  setSign,
  sign,
  address,
  roll,
  setRoll,
  paramsSlug
}) => {
  const history = useNavigate();
  const [snapshot, setSnapshot] = useState(null);
  const [allSlug, setAllSlug] = useState(paramsSlug || "");
  const [clicked, setClicked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [disable, setDisable] = useState(false);
  const [id, setId] = useState(null);
  const [views, setViews] = useState(0);
  const [url, setUrl] = useState("");
  const [showDiv, setShowDiv] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [message, setMessage] = useState(null);
  const [temp, setTemp] = useState(null);
  const [output, setOutput] = useState([]);
  const [slugCount, setSlugCount] = useState(0);
  const network = WalletAdapterNetwork.Devnet;

  function shouldRenderDiv(allSlug) {
    const elements = allSlug.split("-");
    if (elements.length < 5) {
      console.log("Not enough elements to perform the check.");
      return false;
    }

    const first = elements[0];
    const third = elements[2];
    const fifth = elements[4];

    return first === third && first === fifth && third === fifth;
  }

  const walletConnectionErr = (error = WalletError) => {
    console.log("Wallet Connection Error:", error);
  };

  const sendMoney = () => {
    console.log("first");
  };

  const handleDropdownChange = (value) => {
    setIsDropdownOpen(false);
  };

  const takeSnapImage = () => {
    setLoader(true);
    const divToCapture = document.getElementById("mainDiv");
    if (!divToCapture) {
      console.error("Element with id 'mainDiv' not found.");
      setLoader(false);
      return;
    }

    toJpeg(divToCapture)
      .then(async function (dataUrl) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = dataUrl;

        img.onload = async () => {
          canvas.width = img.width;
          canvas.height = img.height;

          ctx.drawImage(img, 0, 0);

          ctx.font = '30px Arial';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.textAlign = 'right';
          ctx.textBaseline = 'bottom';

          ctx.fillText("memenator.com", canvas.width - 10, canvas.height - 10);
          const watermarkedDataUrl = canvas.toDataURL();

          try {
            const form = new FormData();
            form.append("file", watermarkedDataUrl);
            const response = await axios.post("api/share", form);
            setLoader(false);

            const res = await axios.post(`/api/share/image/${response.data.FinalData}`);
            setUrl(res.data.output.Sharefile);
            setId(response.data.FinalData);
            setSnapshot(dataUrl);
          } catch (error) {
            console.error("Error uploading image:", error);
            setLoader(false);
          }
        };
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  const handleButtonClick = () => {
    history.push("/admin");
  };

  const audioUrl = "/music.wav";

  const playAudio = async () => {
    const audio = new Audio(audioUrl);
    audio.loop = false;
    await audio.play();
  };

  let final;
  if (state) {
    final = state
      .map((item) => {
        if (item.text1 || item.text2) {
          if (item.text1) {
            return { type: "text1", value: item.text1 };
          } else {
            return { type: "text2", value: item.text2 };
          }
        } else if (item.file) {
          return { type: "image", value: item.file };
        }
        return null;
      })
      .filter((item) => item !== null);
  }

  useEffect(() => {
    let items = final;

    const doors = document.querySelectorAll(".door");

    const spin = async () => {
      const slideDuration = 7000;
      let delayBetweenDoors = 600;

      updateContent();

      await slideDownContent(slideDuration);

      await new Promise((resolve) => setTimeout(resolve, 100));

      await slideUpContent(slideDuration, delayBetweenDoors);
    };

    const slideDownContent = async (slideDuration) => {
      const maxHeight = Math.max(
        ...Array.from(doors, (door) => door.offsetHeight)
      );
      const promises = [];
      for (const door of doors) {
        const boxes = door.querySelector(".boxes");
        boxes.style.transition = `transform ${slideDuration / 1000
          }s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        const promise = new Promise((resolve) => {
          boxes.addEventListener("transitionend", () => resolve(), {
            once: true,
          });
        });
        promises.push(promise);
        boxes.style.transform = `translateY(${maxHeight}px)`;
        boxes.style.opacity = 1;
      }
      await Promise.all(promises);
    };

    const slideUpContent = async (slideDuration, delayBetweenDoors) => {
      for (let i = 0; i < doors.length; i++) {
        const door = doors[i];
        const boxes = door.querySelector(".boxes");
        const doorHeight = door.offsetHeight;
        boxes.style.transition = `none`;
        boxes.style.transform = `translateY(-${doorHeight}px)`;
        boxes.style.opacity = 0;
        void boxes.offsetHeight;
        boxes.style.transition = `transform ${slideDuration / 1000
          }s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity ${slideDuration / 1000
          }s ease`;
        boxes.style.transform = `translateY(0)`;
        boxes.style.opacity = 1;
        await new Promise((resolve) => setTimeout(resolve, delayBetweenDoors));
      }
      await new Promise((resolve) => setTimeout(resolve, slideDuration));
    };

    const updateContent = () => {
      init();

      const visibleContent = [];

      setTimeout(() => {
        for (let i = 0; i < doors.length; i++) {
          const door = doors[i];
          const boxes = door.querySelector(".boxes");
          try {
            const transformValue = window
              .getComputedStyle(boxes)
              .getPropertyValue("transform");

            if (transformValue && transformValue !== "none") {
              const translateY = parseInt(transformValue.split(",")[5]);
              const offsetHeight = door.offsetHeight;
              const visibleIndex = Math.abs(
                Math.round(translateY / offsetHeight)
              );
              const visibleElement = items[visibleIndex % items.length];
              visibleContent.push(visibleElement);
            }
          } catch (error) {
            console.error("Error parsing transform value:", error);
          }
        }

        const stateValue = {
          content: visibleContent.map((item) => item.value),
          type: "after",
          isCheck: "true",
        };

        setSign([...sign, stateValue]);
        handleOpenModal();
      }, 500);
    };

    const init = (firstInit = true, groups = 1) => {
      for (const door of doors) {
        const boxes = door.querySelector(".boxes");

        if (firstInit) {
          boxes.addEventListener(
            "transitionstart",
            function (event) {
              event.stopPropagation();
            },
            { once: true }
          );

          let allBoxesHeight = 0;

          for (let i = 0; i < 2; i++) {
            if (!boxes.querySelector(".box")) {
              const box = document.createElement("div");
              box.className = "box";
              boxes.appendChild(box);
            }
            allBoxesHeight += boxes.querySelector(".box").offsetHeight;
          }

          boxes.style.height = `${allBoxesHeight}px`;

          if (boxes.children.length > 0) {
            boxes.removeChild(boxes.children[0]);
          }
        }
      }

      if (items && items.length > 0) {
        const maxBoxes = Math.max(
          ...Array.from(doors, (door) => door.querySelectorAll(".box").length)
        );
        for (const door of doors) {
          const boxes = door.querySelector(".boxes");

          for (let i = 0; i < maxBoxes; i++) {
            const box = document.createElement("div");
            box.className = "box";
            boxes.appendChild(box);
          }
        }

        const slides = document.querySelectorAll(".door");
        for (const slide of slides) {
          const boxes = slide.querySelector(".boxes");
          for (let i = 0; i < boxes.children.length; i++) {
            boxes.children[i].style.height = `${boxes.children[0].offsetHeight}px`;
          }
        }
      }
    };

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };

    spin();

    if (state) {
      setMessage("Started spinning...");
    }
  }, [state]);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div>
      <div id="mainDiv">
        <div id="app">
          <div className="doors" id="mainDiv">
            <div className="door-w">
              <div className="door">
                <div className="boxes">
                  <div className="box">
                    {/* <img src={loadingFile[0]?.file1} /> */}
                    {/* <img src='./frame.png' /> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="door-w">
              <div className="door">
                <div className="boxes">
                  <div className="box Terminator">word slot 1</div>
                </div>
              </div>
            </div>
            <div className="door-w">
              <div className="door">
                <div className="boxes">
                  <div className="box">
                    {/* <img src={loadingFile[0]?.file3} /> */}
                    {/* <img src='./frame.png' /> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="door-w">
              <div className="door">
                <div className="boxes">
                  <div className="box Terminator">word slot 2</div>
                </div>
              </div>
            </div>
            <div className="door-w">
              <div className="door">
                <div className="boxes">
                  <div className="box">
                    {/* <img src={loadingFile[0]?.file5} /> */}
                    {/* <img src='./frame.png' /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="buttons">

            {clicked && <div className="w-auto relative">
              <button
                id="dropdownDefaultButton"
                onClick={toggleDropdown}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"

                style={{ color: "black" }}
              >
                Share
                <svg
                  className={`w-2.5 h-2.5 ms-3 transform ${isDropdownOpen ? "rotate-180" : ""
                    }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <div
                  id="dropdown"
                  className="z-10 absolute  left-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <p
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => handleDropdownChange("text")}
                      >
                        <Link
                          style={{
                            backgroundColor: "gold",
                            padding: "0.5rem 1rem",
                            borderRadius: "0.5rem",
                            color: "black"
                          }}
                          target="_blank"
                          href={`/share/${allSlug.slice(0)}`}
                        //  onClick={takeSnapshot}
                        >
                          SHARE LINK
                        </Link>
                      </p>
                    </li>
                    <li>
                      <p
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => handleDropdownChange("image")}
                      >
                        <button onClick={takeSnapImage} style={{ color: "black" }}>Share Image</button>
                        {/* image */}
                      </p>
                    </li>
                  </ul>
                </div>
              )}
            </div>}

            {/* <select>
          <option>
            <Link
              style={{
                backgroundColor: "gold",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
              }}
              target="_blank"
              href={`/share/${allSlug.slice(0)}`}
              //  onClick={takeSnapshot}
            >
              SHARE LINK
            </Link>
          </option>
          <option>jsdf</option>
        </select> */}
            {/* {clicked && (
          <Link
            style={{
              backgroundColor: "gold",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
            }}
            target="_blank"
            href={`/share/${allSlug.slice(0)}`}
            //  onClick={takeSnapshot}
          >
            SHARE LINK
          </Link>
        )}
        {clicked && <button onClick={takeSnapImage}>Share Image</button>} */}
          </div>

          <p className="info"></p>

          {/* {snapshot ? (
        <>
          <img src={snapshot} alt="Snapshot" /> */}
          {/* <button
            style={{
              backgroundColor: "gold",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
            }}
            onClick={downloadSnapshot}
          >
            Download
          </button> */}
          {/* </>
      ) : (
        <></>
      )} */}
        </div>


      </div>
      <div className="buttons justify-content-center  relative">

        <button
          id="spinnerFree"
          disabled={disable}
        >
          <img src={'/free_spin.png'} width={141} height={36} alt="" className="img-fluid" />
        </button>
        <div className="text-center terminator">
          <span className="Terminator">Tickets</span>
          <button className="wallet-button  d-flex" >
            <h3 className="Terminator">
              00
            </h3>
            {/* <span></span> */}
          </button>
        </div>
      </div>
        <div className="text-center">
          <button id="spinner" disabled={!roll || roll && !roll?.roll || roll?.roll == 0 || disable}>
          <Link to={'/ticket'}>
            <img src={'/ticketspin.png'} width={141} height={36} alt="" />
          </Link> 
          </button>
        </div>
    </div>
  );
};

export default Spinner;
