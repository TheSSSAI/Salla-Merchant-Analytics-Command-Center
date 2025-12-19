import * as React from "react";
import ReactQuill from "react-quill";
import { RichTextEditor as BaseEditor } from "@/components/editors/rich-text-editor";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

export interface RichTextEditorCompositeProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  placeholder?: string;
  className?: string;
  availableVariables?: { key: string; label: string; description?: string }[];
}

export function RichTextEditor({
  value,
  onChange,
  label,
  error,
  placeholder,
  className,
  availableVariables = [],
}: RichTextEditorCompositeProps) {
  const quillRef = React.useRef<ReactQuill>(null);

  const handleInsertVariable = (variableKey: string) => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const cursorPosition = quill.getSelection()?.index || 0;
    // Insert variable in handlebars format or similar
    const variableText = `{{${variableKey}}}`;
    quill.insertText(cursorPosition, variableText, "user");
    // Move cursor after inserted text
    quill.setSelection(cursorPosition + variableText.length, 0);
  };

  return (
    <div className={cn("space-y-2 w-full", className)}>
      <div className="flex items-center justify-between">
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        
        {availableVariables.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground hidden sm:inline-block">
              Insert Variable:
            </span>
            <Select onValueChange={handleInsertVariable}>
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue placeholder="Select variable..." />
              </SelectTrigger>
              <SelectContent>
                {availableVariables.map((variable) => (
                  <SelectItem key={variable.key} value={variable.key}>
                    <div className="flex flex-col items-start">
                      <span>{variable.label}</span>
                      {variable.description && (
                        <span className="text-xs text-muted-foreground">
                          {variable.description}
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div
        className={cn(
          "rounded-md ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          error ? "ring-2 ring-destructive ring-offset-2" : ""
        )}
      >
        <BaseEditor
          ref={quillRef}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>

      {error && (
        <p className="text-sm font-medium text-destructive">{error}</p>
      )}
    </div>
  );
}