import React, { useState } from "react";
import axios from "axios";
import {
  LexicalComposer,
  RichTextPlugin,
  ContentEditable,
  HistoryPlugin,
  OnChangePlugin,
} from "@lexical/react/LexicalComposer";
import { $getRoot, $getSelection } from "lexical";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import "./editor.css"; // we'll style it simply

const editorConfig = {
  namespace: "HintEditor",
  onError(error) {
    throw error;
  },
  theme: {
    // Simple theme for editor (you can customize more here)
    paragraph: "editor-paragraph",
  },
  editorState: null,
};

const HintForm = () => {
  const Base_URL = "https://code-hunt-m9vq.onrender.com";
  const [code, setCode] = useState("");
  const [hint, setHint] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!code || !hint) {
      setError("Both fields are required");
      return;
    }

    try {
      const response = await axios.post(`${Base_URL}/cc-club/create/hint`, {
        code,
        hint,
      });
      setMessage(`Hint created successfully for code: ${response.data.code}`);
      setCode("");
      setHint("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong while creating hint."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Add a New Hint
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-lg"
          />

          <LexicalComposer initialConfig={editorConfig}>
            <div className="border border-gray-300 rounded-lg p-2 min-h-[150px] bg-white">
              <RichTextPlugin
                contentEditable={<ContentEditable className="editor-input" />}
                placeholder={<div className="text-gray-400">Write your hint here...</div>}
                ErrorBoundary={LexicalErrorBoundary}
              />
              <HistoryPlugin />
              <OnChangePlugin
                onChange={(editorState) => {
                  editorState.read(() => {
                    const htmlString = $getRoot().getTextContent();
                    setHint(htmlString);
                  });
                }}
              />
            </div>
          </LexicalComposer>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Hint
          </button>
        </form>

        {message && <p className="text-green-600 mt-4 text-center">{message}</p>}
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default HintForm;
