"use client";

import { askQuestion } from "@/util/api";
import { useState } from "react";

const Question = () => {
  const [value, setValue] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const answer = await askQuestion(value);
    setResponse(answer);
    setValue("");
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="border border-gray-300 rounded-md p-2 text-lg"
          disabled={loading}
          placeholder="Ask a question..."
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-400 px-4 py-2 rounded-md"
        >
          Ask
        </button>
      </form>
      {loading && <div>...LOADING</div>}
      {response && <div>{response}</div>}
    </div>
  );
};

export default Question;
