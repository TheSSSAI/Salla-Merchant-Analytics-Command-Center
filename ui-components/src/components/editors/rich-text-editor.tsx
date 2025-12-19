import * as React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { cn } from "@/lib/utils";

export interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  modules?: any;
  formats?: string[];
  forwardedRef?: React.Ref<ReactQuill>;
}

const RichTextEditor = React.forwardRef<ReactQuill, RichTextEditorProps>(
  ({ value, onChange, placeholder, readOnly, className, modules, formats }, ref) => {
    // Default configuration for the editor
    const defaultModules = React.useMemo(
      () => ({
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "clean"],
        ],
      }),
      []
    );

    const defaultFormats = [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "list",
      "bullet",
      "link",
    ];

    return (
      <div className={cn("flex flex-col w-full", className)}>
        <ReactQuill
          ref={ref}
          theme="snow"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          modules={modules || defaultModules}
          formats={formats || defaultFormats}
          className={cn(
            "bg-background text-foreground rounded-md",
            "[&_.ql-toolbar]:border-input [&_.ql-toolbar]:bg-muted/20 [&_.ql-toolbar]:rounded-t-md",
            "[&_.ql-container]:border-input [&_.ql-container]:rounded-b-md [&_.ql-container]:text-base",
            "[&_.ql-editor]:min-h-[150px] [&_.ql-editor]:px-3 [&_.ql-editor]:py-2",
            "[&_.ql-editor.ql-blank::before]:text-muted-foreground",
            readOnly && "opacity-50 cursor-not-allowed"
          )}
        />
      </div>
    );
  }
);

RichTextEditor.displayName = "RichTextEditor";

export { RichTextEditor };