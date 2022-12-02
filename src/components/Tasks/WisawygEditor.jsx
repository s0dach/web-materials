import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState, convertFromRaw } from "draft-js";
import { markdownToDraft, draftToMarkdown } from "markdown-draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export const TextEditor = ({ value, setFieldValue, handleSubmit, addTask }) => {
  // Получаем содержимое
  const prepareDraft = (value) => {
    const draft = markdownToDraft(value);
    const contentState = convertFromRaw(draft);
    const editorState = EditorState.createWithContent(contentState);
    return editorState;
  };

  const [editorState, setEditorState] = React.useState(
    value ? prepareDraft(value) : EditorState.createEmpty()
  );

  const onEditorStateChange = (editorState) => {
    const forFormik = draftToMarkdown(
      convertToRaw(editorState.getCurrentContent())
    );
    setFieldValue(forFormik);
    setEditorState(editorState);
  };

  //Функция добавления картинки (imgur.com)
  // const uploadImageCallBack = async (file) => {
  //   return new Promise((resolve, reject) => {
  //     const formData = new FormData();
  //     formData.append("image", file);
  //     fetch("https://api.imgur.com/3/image", {
  //       method: "POST",
  //       headers: {
  //         Authorization: "Client-ID ed6e53ec921452e",
  //         Accept: "application/json",
  //       },
  //       body: formData,
  //     })
  //       .then(resolve)
  //       .catch(reject);
  //   });
  // };

  function uploadImageCallBack(file) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://api.imgur.com/3/image");
      xhr.setRequestHeader("Authorization", "Client-ID ed6e53ec921452e");
      const data = new FormData();
      data.append("image", file);
      xhr.send(data);
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        console.log(response);
        resolve({ data: { link: response.url } });
      });
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText);
        console.log(error);
        reject(error);
      });
    });
  }
  // клик по текстовому полю.
  const [isClose, setIsClose] = React.useState(true);

  return (
    <div style={{ marginTop: "10px" }}>
      <div
        // className={isClose ? classes.editor : undefined}
        onClick={() => setIsClose(false)}
      >
        <Editor
          toolbarHidden={isClose}
          readOnly={isClose}
          editorState={editorState}
          // editorClassName={!isClose ? classes.customEditor : undefined}
          onEditorStateChange={onEditorStateChange}
          onBlur={() => {
            // addTask();
            setIsClose(true);
          }}
          toolbar={{
            options: ["inline", "blockType", "link", "image"],
            image: {
              uploadCallback: uploadImageCallBack,
              alt: { present: true, mandatory: true },
            },
          }}
          localization={{
            locale: "ru",
          }}
        />
      </div>
    </div>
  );
};
