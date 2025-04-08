import React, { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
        err.response?.data?.message || "Something went wrong while creating hint."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Add a New Hint</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-lg"
          />

          <ReactQuill
            value={hint}
            onChange={setHint}
            placeholder="Write your hint here..."
            className="bg-white"
            theme="snow"
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"],
              ],
            }}
            formats={[
              "header",
              "bold",
              "italic",
              "underline",
              "strike",
              "list",
              "bullet",
              "link",
              "image",
            ]}
          />

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
