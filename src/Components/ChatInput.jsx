import { useState } from 'react'

const ChatInput = ({ onSubmit }) => {
  const [question, setQuestion] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim()) {
      onSubmit(question);
      setQuestion("");
    }
  }

  return (
    <div className="container my-4">
  <form onSubmit={handleSubmit}>
    <div className="form-group flex flex-col gap-2">
      <label 
        htmlFor="question" 
        className="text-3xl text-amber-100"
      >
        Ask Anything
      </label>
      <input
        type="text"
        id="question"
        placeholder="Enter your Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full rounded-md border border-gray-500 bg-gray-900 p-3 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
      />
    </div>
    <button 
      type="submit" 
      className="btn btn-primary mt-4 px-6 py-3 text-lg font-semibold bg-cyan-900 hover:bg-emerald-600 rounded-md transition"
    >
      Submit
    </button>
  </form>
</div>

  )
}

export default ChatInput;
