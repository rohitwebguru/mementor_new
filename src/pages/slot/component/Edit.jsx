import React, { useState } from "react";
import axios from "axios";
import Notification from "./Notification";
// import { render } from "react-dom";
interface EditProps {
    setIsModalOpen: (isOpen: boolean) => void;
    editableData: {
      _id: string;
      file?: string;
      text1?: string;
      text2?: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  }
//@ts-ignore
const Edit: React.FC<EditProps> = ({ setIsModalOpen, editableData, setState }) => {
  const [editedText, setEditedText] = useState(editableData.text1 || editableData.text2 ||""); 
  const [selectedImage, setSelectedImage] = useState<string | null>(
    editableData.file || null
  ); 
  const [message,setMessage]=useState("")
  const [updatedFile,setUpdatedFile]=useState()
const _id=editableData._id
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedText(e.target.value); 
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    //@ts-ignore
    setUpdatedFile(file)
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
          console.log(reader.result,"Rende4rrrr")
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleClickImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const fetchData = async () => {
    try {
      const allData = await axios.post("/api/getdata/image");
      if (allData?.data?.allData.length > 0) {
        setState(allData?.data?.allData);
      }
    } catch (error) {}
  };
  const fetchTextData = async () => {
    try {
      const allData = await axios.post("/api/getdata");
      if (allData?.data?.allData.length > 0) {
        setState(allData?.data?.allData);
      }
    } catch (error) {}
  };
  const Submit = async () => {
    
    if(updatedFile){
        const form = new FormData();
        //@ts-ignore
        form.append('upload', updatedFile); 
        form.append('_id', _id);
        const res=  await axios.put("/api/admin/updateFile", form);
        setMessage(res.data.message)
       fetchData()
       setTimeout(()=>{

         closeModal()
       },2000)
    }else if(editedText){
      
        const apiCall=await axios.put("/api/admin/updateText",{
            _id,editedText
        })
        console.log(apiCall,"apiCallapiCall")
        setMessage(apiCall.data.message)
        fetchTextData()
        setTimeout(()=>{

          closeModal()
        },2000)
    }
    closeModal()
  };
  const fileInputRef = React.createRef<HTMLInputElement>(); 
  return (
    <>
    {message && <Notification message={message}/>}
      <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-lg p-6 w-full sm:w-96 justify-center text-center">
          <span
            className="absolute top-0 right-0 p-2 cursor-pointer"
            onClick={closeModal}
          >
            &times;
          </span>
          <h2 className="text-2xl mb-2 text-start">Detail</h2>
          <hr className="mt-1 mb-4" />
          {selectedImage ? ( 
            <div className="mb-4 text-center edit-img-wrap">
              <img
                src={selectedImage}
                alt="Image"
                className="max-w-full h-auto mx-auto"
              />
            </div>
          ) : (
            <div className="mb-4">
              <input
                type="text"
                value={editedText} 
                onChange={handleTextChange} 
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>
          )}
          {editableData.file && ( 
            <button
              onClick={handleClickImage} 
              className="text-black-500 bg-sky-400 hover:bg-sky-500  rounded-lg  font-medium  text-sm px-5 py-2.5 text-center  mb-2"
            >
              Select Image
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }} 
          />
          <div>
           <hr className="my-2" /> 
          <button
            onClick={closeModal}
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Cancel
          </button>
          <button
            onClick={Submit}
            className="text-white bg-pink-900 hover:bg-pink-950 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 shadow-lg"
            
          >
            Continue
          </button>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default Edit;
