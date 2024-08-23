"use client";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import html2canvas from 'html2canvas';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import axios from "axios";
import Link from "@bradgarropy/next-link";
const Spinner = ({ state, loadingFile }) => {
  console.log(state, "statestate")
  const router = useRouter();
  const [snapshot, setSnapshot] = useState(null);
  const [allSlug, setAllSlug] = useState("")
  const [clicked, setClicked] = useState(false)
  // const takeSnapshot = () => {
  //   router.push(`/share/${allSlug.slice(0)}`);
  // const divToCapture = document.getElementById("mainDiv");
  // console.log(divToCapture, "divvvvvv");

  // toPng(divToCapture)
  //   .then(async function (dataUrl) {
  //     const form = new FormData();
  //     form.append("file", dataUrl);
  //     const res=await axios.post("api/share",form)
  //     console.log(res.data.FinalData,"ressssss")
  //     router.push(`/share/${res.data.FinalData}`);
  //     setSnapshot(dataUrl);
  //   })
  //   .catch(function (error) {
  //     console.error("oops, something went wrong!", error);
  //   });
  // };
  // console.log(allSlug, "allSlugallSlugallSlug");
  const takeSnapImage = () => {
    const divToCapture = document.getElementById("mainDiv");
    console.log(divToCapture, "divvvvvv");

    toPng(divToCapture)
      .then(async function (dataUrl) {
        const form = new FormData();
        form.append("file", dataUrl);
        const res = await axios.post("api/share", form)
        console.log(res.data.FinalData, "ressssss")
        // router.push(`/share/${res.data.FinalData}`);
        window.open(`/share/image/${res.data.FinalData}`, '_blank')
        setSnapshot(dataUrl);
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  }
  const handleButtonClick = () => {
    router.push("/admin");
  };
  const audioUrl = "/music.wav";

  // console.log(loadingFile, "i am inslinner");
  const playAudio = async () => {
    const audio = new Audio(audioUrl);
    audio.loop = false;
    await audio.play();
    // setAudioPlayed(true);
  };

  let final;
  if (state) {
    final = state
      .map((item) => {
        // console.log(item,"tiememem")
        if (item.text1 || item.text2) {
          if (item.text1) {

            return { type: "text1", value: item.text1 };
          } else {
            return { type: "text2", value: item.text2 };

          }
        } else if (item.file) {
          return { type: "image", value: item.file };
        }
        return null; // Ensure to handle other types of content properly if any
      })
      .filter((item) => item !== null); // Remove null items if any
  }

  useEffect(() => {
    let items = final;


    const doors = document.querySelectorAll(".door");
    // let spinCount = 0;

    const spin = async () => {
      const slideDuration = 1200; // Duration of slide animation in milliseconds
      const delayBetweenDoors = 400; // Delay between each door's animation in milliseconds

      // Update content
      updateContent();

      // Slide down current content
      await slideDownContent(slideDuration);

      // Wait for a short delay before starting the slide up
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Slide up new content with delay between each door's animation
      await slideUpContent(slideDuration, delayBetweenDoors);
    };

    const slideDownContent = async (slideDuration) => {
      const maxHeight = Math.max(...Array.from(doors, door => door.offsetHeight)); // Get the maximum height among all doors
      const promises = []; // Array to hold promises for each door's animation
      for (const door of doors) {
        const boxes = door.querySelector(".boxes");
        boxes.style.transition = `transform ${slideDuration / 1000}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`; // Apply transition
        const promise = new Promise((resolve) => {
          boxes.addEventListener('transitionend', () => resolve(), { once: true }); // Resolve the promise when transition ends
        });
        promises.push(promise); // Add the promise to the array
        boxes.style.transform = `translateY(${maxHeight}px)`; // Slide content down
        boxes.style.opacity = 1; // Show the content
      }
      await Promise.all(promises); // Wait for all doors' animations to finish
    };


    const slideUpContent = async (slideDuration, delayBetweenDoors) => {
      for (let i = 0; i < doors.length; i++) {
        const door = doors[i];
        const boxes = door.querySelector(".boxes");
        boxes.style.transition = `none`; // Disable transition temporarily
        boxes.style.transform = `translateY(0)`;
        // Trigger reflow
        boxes.offsetHeight; // This line forces a reflow, which is necessary to apply the next transition smoothly
        boxes.style.transition = `transform ${slideDuration / 1000}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        boxes.style.transform = `translateY(-${boxes.clientHeight}px)`;
        await new Promise((resolve) => setTimeout(resolve, delayBetweenDoors));
      }
      // Wait for the last animation to finish before resolving
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

            const transformValue = window.getComputedStyle(boxes).getPropertyValue("transform");

            if (transformValue && transformValue !== "none") {
              const translateY = parseInt(transformValue.split(',')[5].trim());

              const visibleBoxIndex = Math.round(Math.abs(translateY / door.clientHeight));

              const visibleBox = boxes.children[visibleBoxIndex];
              if (visibleBox) {

                let type, value, slug;
                if (visibleBox.querySelector("img")) {
                  type = "image";
                  const imgSrc = visibleBox.querySelector("img").src;
                  const correspondingStateItem = state.find(item => item.file === imgSrc);
                  slug = correspondingStateItem ? correspondingStateItem.Slug : "";
                  value = { type: "image", src: imgSrc, slug };
                } else {
                  const text = visibleBox.textContent.trim();

                  type = "text" + (i === 1 ? 1 : 2);
                  const correspondingStateItem = state.find(item => item[type] === text);
                  slug = correspondingStateItem ? correspondingStateItem.Slug : "";

                  value = text;
                  console.log(slug, "Gggggggggggggggggg")
                }
                visibleContent.push({ type, value, slug });
              }
            }
          } catch (error) {
            console.error("Error while getting visible content:", error);
          }
        }
        console.log(visibleContent, "comeetettet")
        for (let j = 0; j < visibleContent.length; j++) {
          const currentItem = visibleContent[j];
          const currentSlug = currentItem.slug;

          // Check the type of the current item
          if (currentItem.type === 'text1' || currentItem.type === 'text2') {
            setAllSlug((prevSlugs) => {
              if (prevSlugs === "") {
                return currentItem.value; // Set value if prevSlugs is empty
              }
              return `${prevSlugs}-${currentItem.value}`; // Concatenate value
            });
          } else {
            setAllSlug((prevSlugs) => {
              if (prevSlugs === "") {
                return currentSlug; // Set slug if prevSlugs is empty
              }
              return `${prevSlugs}-${currentSlug}`; // Concatenate slug
            });
          }
        }

      }, 5000);


    };




    const init = (firstInit = true, groups = 1, duration = 1) => {
      for (let i = 0; i < doors.length; i++) {
        const door = doors[i];
        if (firstInit) {
          door.dataset.spinned = "0";
        } else if (door.dataset.spinned === "1") {
          return;
        }

        const boxes = door.querySelector(".boxes");
        const boxesClone = boxes.cloneNode(false);

        let pool;
        if (i === 1) {
          // Only text for 2nd and 4th door
          pool = items?.filter((item) => item.type === "text1");
        } else if (i === 3) {
          pool = items?.filter((item) => item.type === "text2");

        }
        else {
          // Images/emojis for other doors
          pool = items?.filter((item) => item.type == "image");
        }

        // Shuffle the pool to randomize content
        pool = shuffle(pool);

        for (let i = pool.length - 1; i >= 0; i--) {
          const box = document.createElement("div");
          box.classList.add("box");
          box.style.width = `${door.clientWidth / 5}px`;
          box.style.height = door.clientHeight + "px";
          if (pool[i].type === "emoji") {
            box.textContent = pool[i].value;
          } else if (pool[i].type === "image") {
            const image = document.createElement("img");
            image.src = pool[i].value;
            image.alt = "Image";
            image.style.width = "100%";
            image.style.height = "100%";
            box.appendChild(image);
          } else if (pool[i].type === "text1") {
            box.textContent = pool[i].value;
          }
          else if (pool[i].type === "text2") {
            box.textContent = pool[i].value;
          }
          boxesClone.appendChild(box);
        }
        boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
        boxesClone.style.transform = `translateY(-${door.clientHeight * (pool.length - 1)
          }px)`;
        door.replaceChild(boxesClone, boxes);
      }
    };

    const shuffle = (arr) => {
      let currentIndex = arr && arr.length;
      let temporaryValue, randomIndex;
      console.log(arr, "arrr")
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
      }

      return arr;
    };

    const handleClickSpinner = () => {
      spin();
      playAudio();
      setTimeout(() => {
        setClicked(true)
      }, 5000)
    };

    const handleClickReset = () => {
      init();
    };

    document
      .querySelector("#spinner")
      ?.addEventListener("click", handleClickSpinner);
    // document.querySelector("#reseter").addEventListener("click", handleClickReset);

    // Clean up event listeners on unmount
    return () => {
      document
        .querySelector("#spinner")
        ?.removeEventListener("click", handleClickSpinner);
      // document.querySelector("#reseter").removeEventListener("click", handleClickReset);
    };
  }, [final]);

  const downloadSnapshot = () => {
    if (snapshot) {
      const link = document.createElement("a");
      link.href = snapshot;
      link.download = "snapshot.png"; // You can change the filename here
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      return;
    }
  };
  return (
    <div  >
      <div className="doors" id="mainDiv">
        <div className="door-w">
          <div className="door">
            <div className="boxes">
              <div className="box">
                <img src={loadingFile[0]?.file1} />
              </div>
            </div>
          </div>
        </div>
        <div className="door-w">
          <div className="door">
            <div className="boxes">
              <div className="box">word slot 1</div>
            </div>
          </div>
        </div>
        <div className="door-w">
          <div className="door">
            <div className="boxes">
              <div className="box">
                <img src={loadingFile[0]?.file3} />
              </div>
            </div>
          </div>
        </div>
        <div className="door-w">
          <div className="door">
            <div className="boxes">
              <div className="box">word slot 2</div>
            </div>
          </div>
        </div>
        <div className="door-w">
          <div className="door">
            <div className="boxes">
              <div className="box">
                <img src={loadingFile[0]?.file5} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="buttons">
        <button id="spinner">Spin</button>
        <button
          onClick={(e) => {
            console.log(e, "Eeeeeeeeeeeee");
            // if (!(e instanceof MouseEvent.isTrusted
            //   )) {
            //   return;
            // }
            handleButtonClick(e);
          }}

        >
          Admin
        </button>
        {clicked &&
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
        }
        {clicked &&
          <button

            onClick={takeSnapImage}
          >
            Share Image
          </button>
        }

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
  );
};

export default Spinner;
