// import React, { useRef, useState } from "react";
// import ReactQuill from "react-quill"; // ES6
// import "react-quill/dist/quill.snow.css"; // ES6
// // import ImageResize from "quill-image-resize-module-plus";

// import "../styles.css";

// // const fontSizeArr = ["14px", "16px", "18px"];

// export default function TextEditor({ inputValue, onChange }) {
//   // const [blog, setBlog] = useState("");
//   // console.log(inputValue);
//   // useMemo(() => {
//   //   const Size = Quill.import("attributors/style/size");
//   //   Size.whitelist = fontSizeArr;
//   //   Quill.register(Size, true);
//   //   Quill.register("modules/imageResize", ImageResize);
//   // }, []);

//   const editorRef = useRef();

//   return (
//     <div className="App">
//       <ReactQuill
//         value={inputValue}
//         onChange={(v) => onChange(v)}
//         ref={editorRef}
//         modules={{
//           toolbar: [["bold", "italic", "underline", "strike"], ["image"]],
//           clipboard: {
//             matchVisual: false,
//           },
//           // imageResize: {
//           //   modules: ["Resize", "DisplaySize"],
//           // },
//         }}
//         placeholder="Your new awesome Huspy blog"
//       />
//       {/* <div dangerouslySetInnerHTML={{ __html: blog }} /> */}

//       {/* <ReactQuill value={blog} readOnly theme={"bubble"} /> */}
//     </div>
//   );
// }
