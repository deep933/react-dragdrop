"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./dragdrop.css");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DragDrop = function DragDrop(props) {
  var dropRef = (0, _react.useRef)();
  var fileInputRef = (0, _react.useRef)();

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      dragIn = _useState2[0],
      setDragIn = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      filelist = _useState4[0],
      setFileList = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      error = _useState6[0],
      setError = _useState6[1];

  var handleDragEnter = function handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("drag in ...");
    e.dataTransfer.items && e.dataTransfer.items.length > 0 && setDragIn(true);
  };

  var handleDragLeave = function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("drag out ...");
    setDragIn(false);
  };

  var handleDragOver = function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
  };

  var handleDrop = function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setError(null);
    setDragIn(false);
    handleDroppedFiles(e.dataTransfer.files);
  };

  var handleDroppedFiles = function handleDroppedFiles(files) {
    if (files.length > 0) {
      handleFileTypeCheck(Array.from(files)) && handleNoFileCheck(Array.from(files)) && props.handleDrop(files);
    }
  };

  var handleNoFileCheck = function handleNoFileCheck(files) {
    if (props.noFiles) {
      if (files.length <= props.noFiles) {
        return true;
      } else {
        handleError("No of file limit exceed.");
        return false;
      }
    } else {
      return true;
    }
  };

  var handleFileTypeCheck = function handleFileTypeCheck(files) {
    var check = true;

    if (props.fileType && props.fileType.length > 0) {
      files.map(function (file) {
        if (!props.fileType.includes(file.type)) {
          check = false;
          handleError("File Type not supported.Please upload only png/jpeg files.");
        }
      });
    }

    return check;
  };

  var handleError = function handleError(error) {
    setError(error);
  };

  var handleClick = function handleClick(e) {
    var select = fileInputRef.current;
    select.click();
  };

  var handleSelect = function handleSelect(e) {
    var select = fileInputRef.current;
    setError(null);
    var droppedfiles = Array.from(select.files);
    setDragIn(false);
    handleDroppedFiles(droppedfiles);
  };

  (0, _react.useEffect)(function () {
    var dropZone = dropRef.current;
    dropZone.addEventListener("dragenter", handleDragEnter);
    dropZone.addEventListener("dragleave", handleDragLeave);
    dropZone.addEventListener("dragover", handleDragOver);
    dropZone.addEventListener("drop", handleDrop);
    return function () {
      dropZone.removeEventListener("dragenter", handleDragEnter);
      dropZone.removeEventListener("dragleave", handleDragLeave);
      dropZone.removeEventListener("dragover", handleDragOver);
      dropZone.removeEventListener("drop", handleDrop);
    };
  }, []);
  return _react["default"].createElement("div", {
    className: "drag-drop",
    ref: dropRef,
    onClick: handleClick
  }, error && _react["default"].createElement("div", {
    className: "error"
  }, error), _react["default"].createElement("input", {
    type: "file",
    id: "files",
    style: {
      opacity: 0
    },
    ref: fileInputRef,
    onChange: handleSelect,
    multiple: true
  }));
};

var _default = DragDrop;
exports["default"] = _default;