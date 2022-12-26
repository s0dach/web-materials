import React, { useState } from "react";
import axios from "axios";
import ReactQuill, { Quill } from "react-quill";
import addSvg from "../../assets/img/add.svg";
import "react-quill/dist/quill.snow.css"; // ES6
import "../styles.css";
import { ImageUpload } from "quill-image-upload";
import { htmlToMarkdown } from "../Parser/Parser";

Quill.register("modules/imageUpload", ImageUpload);

const AddTaskForm = ({ list, onAddTask }) => {
  const [visibleForm, setFormVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = React.useState("Вложений нет");

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const toggleFormVisible = () => {
    setFormVisible(!visibleForm);
    setInputValue("");
  };

  const editorRef = React.useRef();

  const modules = React.useMemo(
    () => ({
      toolbar: [["bold", "|"], ["image"]],
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
          next(file);
        },
      },
    }),
    []
  );
  // const onSubmit = (e) => {

  // };
  const addTask = async (e) => {
    setIsLoading(true);
    const htmlTooMarkdown = htmlToMarkdown(inputValue);
    // const boldText = htmlTooMarkdown.replace("**", "*");
    const firstFinishedTextTest = htmlTooMarkdown
      .split("![](")
      .join("<img src=");
    const lastFinishedTextTest = firstFinishedTextTest
      .split(".png)")
      .join(".png>");
    const firstFinishedText = lastFinishedTextTest
      .split("![](")
      .join("<img src=");
    const lastFinishedText = firstFinishedText.split(".jpg)").join(".jpg>");

    const obj = {
      listId: list.id,
      text:
        file === "Вложений нет"
          ? lastFinishedText
          : lastFinishedText + `<p><strong>Вложения:</strong>${file.name}</p>`,
      documentId: 0,
      completed: false,
    };
    let id = 0;
    await axios
      .post("http://95.163.234.208:3500/tasks", obj)
      .then(({ data }) => {
        id = data.id;

        onAddTask(list.id, data);
        toggleFormVisible();
      })
      .catch((e) => {
        alert("Ошибка при добавлении задачи!");
      });
    setTimeout(() => {
      const date = new FormData();
      date.append("file", file);
      date.append("data", id);
      axios
        .post("http://95.163.234.208:8000/upload-file-to-google-drive", date)
        .then((e) => console.log("ok"))
        .catch((e) => console.log("Ошибка"));
      setFormVisible(visibleForm);
      setFile("Вложений нет");
      setIsLoading(false);
    }, "2000");
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button disabled={isLoading} onClick={addTask} className="button">
              {isLoading ? "Добавление..." : "Добавить материал"}
            </button>
            {/* <button onClick={onSubmit}>ssads</button> */}
            <input
              type="file"
              onChange={onFileChange}
              className="custom-file-input"
            />
            {/* <input type="file" onChange={onFileChange} /> */}
          </div>
          <button onClick={toggleFormVisible} className="button button--grey">
            Отмена
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTaskForm;
