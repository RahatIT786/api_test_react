import React, { useState } from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css"; // Import Draft.js styles

const RichTextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", minHeight: "200px" }}>
      <Editor editorState={editorState} onChange={setEditorState} />
    </div>
  );
};

export default RichTextEditor;
