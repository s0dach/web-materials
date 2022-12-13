import React, { useState } from "react";
import axios from "axios";
import addSvg from "../../assets/img/add.svg";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css"; // ES6
import "../styles.css";
import { ImageUpload } from "quill-image-upload";
import { htmlToMarkdown } from "../Parser/Parser";

Quill.register("modules/imageUpload", ImageUpload);

const AddTaskForm = ({ list, onAddTask }) => {
  const [visibleForm, setFormVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const toggleFormVisible = () => {
    setFormVisible(!visibleForm);
    setInputValue("");
  };

  const editorRef = React.useRef();

  const modules = React.useMemo(
    () => ({
      toolbar: [["image"]],
      //["bold"],
      clipboard: {
        matchVisual: false,
      },
      imageUpload: {
        url: "https://api.imgur.com/3/image",
        method: "POST",
        name: "image",
        withCredentials: false,
        headers: {
          Authorization: "Client-ID ed6e53ec921452e",
        },
        callbackOK: (serverResponse, next) => {
          next(serverResponse.data.link);
        },
        callbackKO: (serverError) => {
          alert(serverError);
        },
        checkBeforeSend: (file, next) => {
          console.log(file);
          next(file);
        },
      },
    }),
    []
  );

  const addTask = () => {
    const htmlTooMarkdown = htmlToMarkdown(inputValue);
    const boldText = htmlTooMarkdown.replace("**", "*");
    const firstFinishedTextTest = boldText.split("![](").join("<img src=");
    const lastFinishedTextTest = firstFinishedTextTest
      .split(".png)")
      .join(".png>");
    const firstFinishedText = lastFinishedTextTest
      .split("![](")
      .join("<img src=");
    const lastFinishedText = firstFinishedText.split(".jpg)").join(".jpg>");

    const obj = {
      listId: list.id,
      text: lastFinishedText,
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
