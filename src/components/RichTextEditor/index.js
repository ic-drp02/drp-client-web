import React, { useState, useEffect, useRef } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./RichTextEditor.css";

export default function RichTextEditor(props) {
  const ref = useRef(null);
  const [value, setValue] = useState("");
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    if (!!ref) {
      const quill = ref.current.querySelector(".quill");
      if (focus) {
        quill.classList.add("active");
      } else {
        quill.classList.remove("active");
      }
    }
  });

  return (
    <div ref={ref}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  );
}
