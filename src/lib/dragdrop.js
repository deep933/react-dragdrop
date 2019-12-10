import React, { useRef, useState, useEffect } from "react";
import "./dragdrop.css";
const DragDrop = props => {
  const dropRef = useRef();
  const fileInputRef = useRef();
  const [dragIn, setDragIn] = useState(false);
  const [filelist, setFileList] = useState([]);
  const [error, setError] = useState(null);

  const handleDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();
    console.log("drag in ...");
    e.dataTransfer.items && e.dataTransfer.items.length > 0 && setDragIn(true);
  };

  const handleDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();
    console.log("drag out ...");

    setDragIn(false);
  };

  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    setError(null);
    setDragIn(false);
    handleDroppedFiles(e.dataTransfer.files);
    
  };

  const handleDroppedFiles = files =>{

    if (files.length > 0) {
       handleFileTypeCheck(Array.from(files)) && handleNoFileCheck(Array.from(files)) && props.handleDrop(files);
    }
  }

  const handleNoFileCheck = files =>{
    if(props.noFiles){
      if(files.length <= props.noFiles) {
        return true
      }
      else{
        handleError("No of file limit exceed.")
        return false;
      }
    }
    else{
      return true;
    }
  }

  const handleFileTypeCheck = files => {
    let check = true;
    if(props.fileType && props.fileType.length>0){
    files.map(file => {
      if (!props.fileType.includes(file.type)) {
        check = false;
        handleError(
          "File Type not supported.Please upload only png/jpeg files."
        );
      }
    });
  }
    return check;
  };

  const handleError = error => {
    setError(error);
  };

  const handleClick = e => {
    const select = fileInputRef.current;
    select.click();
  };

  const handleSelect = e => {
    const select = fileInputRef.current;
    setError(null);
    const droppedfiles = Array.from(select.files);
    setDragIn(false);
    handleDroppedFiles(droppedfiles)
  };

  useEffect(() => {
    const dropZone = dropRef.current;
    dropZone.addEventListener("dragenter", handleDragEnter);
    dropZone.addEventListener("dragleave", handleDragLeave);
    dropZone.addEventListener("dragover", handleDragOver);
    dropZone.addEventListener("drop", handleDrop);

    return () => {
      dropZone.removeEventListener("dragenter", handleDragEnter);
      dropZone.removeEventListener("dragleave", handleDragLeave);
      dropZone.removeEventListener("dragover", handleDragOver);
      dropZone.removeEventListener("drop", handleDrop);
    };
  }, []);


  return (
    <div className="drag-drop" ref={dropRef} onClick={handleClick} >
      {error && <div className="error">{error}</div>}
      <input
        type="file"
        id="files"
        style={{ opacity: 0 }}
        ref={fileInputRef}
        onChange={handleSelect}
        multiple
      />
    </div>
  );
};

export default DragDrop;
