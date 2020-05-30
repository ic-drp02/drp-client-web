import React, { useState, useEffect, useRef } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./RichTextEditor.css";

export default function RichTextEditor({ onChange }) {
  const ref = useRef(null);
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
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  );
}
