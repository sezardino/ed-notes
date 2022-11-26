import React from "react";
import EditorComponent, { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { twMerge } from "tailwind-merge";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
];

interface Props extends ReactQuillProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const Editor: React.FC<Props> = (props) => {
  const { value, onValueChange, className, ...rest } = props;

  return (
    <EditorComponent
      {...rest}
      formats={formats}
      modules={modules}
      theme="snow"
      value={value}
      onChange={onValueChange}
      className={twMerge("bg-white text-black", className)}
    />
  );
};

export default Editor;
