import React, { useState } from "react";
import axios from "axios";
import addSvg from "../../assets/img/add.svg";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css"; // ES6

import "../styles.css";
import { ImageUpload } from "quill-image-upload";

// const fontSizeArr = ["14px", "16px", "18px"];
Quill.register("modules/imageUpload", ImageUpload);

const AddTaskForm = ({ list, onAddTask }) => {
  const [visibleForm, setFormVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const toggleFormVisible = () => {
    setFormVisible(!visibleForm);
    setInputValue("");
  };

  // React.useMemo(() => {
  //   const Size = Quill.import("attributors/style/size");
  //   Size.whitelist = fontSizeArr;
  //   Quill.register(Size, true);
  //   Quill.register("modules/imageResize", ImageResize);
  // }, []);

  const editorRef = React.useRef();

  const modules = React.useMemo(
    () => ({
      toolbar: [["bold", "italic", "underline", "strike"], ["image"]],
      clipboard: {
        matchVisual: false,
      },
      // imageResize: {
      //   modules: ["Resize", "DisplaySize"],
      // },
      imageUpload: {
        url: "https://api.imgur.com/3/image", // server url. If the url is empty then the base64 returns
        method: "POST", // change query method, default 'POST'
        name: "image", // custom form name
        withCredentials: false, // withCredentials
        headers: {
          Authorization: "Client-ID ed6e53ec921452e",
        },
        // personalize successful callback and call next function to insert new url to the editor
        callbackOK: (serverResponse, next) => {
          next(serverResponse.data.link);
        },
        // personalize failed callback
        callbackKO: (serverError) => {
          alert(serverError);
        },
        // optional
        // add callback when a image have been chosen
        checkBeforeSend: (file, next) => {
          console.log(file);
          next(file); // go back to component and send to the server
        },
      },
    }),
    []
  );

  console.log(inputValue);
  const addTask = () => {
    const convertFirst = inputValue.replace(/<p>/g, "");
    const convertFirst1 = convertFirst.replace(/<br>/g, "\n");
    const convertLast = convertFirst1.split("</p>").join("");
    console.log("fenslf", convertLast);
    const obj = {
      listId: list.id,
      text: encodeURI(convertLast),
      completed: false,
    };
    setIsLoading(true);
    axios
      .post("https://narrow-gamy-chef.glitch.me/tasks", obj)
      .then(({ data }) => {
        onAddTask(list.id, data);
        toggleFormVisible();
      })
      .catch((e) => {
        alert("Ошибка при добавлении задачи!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="tasks__form">
      {!visibleForm ? (
        <div onClick={toggleFormVisible} className="tasks__form-new">
          <img src={addSvg} alt="Add icon" />
          <span>Новый материал</span>
        </div>
      ) : (
        <div className="tasks__form-block">
          {/* <input
            value={inputValue}
            className="field"
            type="text"
            placeholder="Текст материала"
            onChange={(e) => setInputValue(e.target.value)}
          /> */}
          <div className="App">
            <ReactQuill
              value={inputValue}
              onChange={(e) => setInputValue(e)}
              ref={editorRef}
              modules={modules}
              placeholder="Введите текст"
            />
          </div>
          <button disabled={isLoading} onClick={addTask} className="button">
            {isLoading ? "Добавление..." : "Добавить материал"}
          </button>
          <button onClick={toggleFormVisible} className="button button--grey">
            Отмена
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTaskForm;
