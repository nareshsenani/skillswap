import { useState } from "react"

function ContactModal({ recipient, onClose }) {
  const [message, setMessage] = useState("")

  const handleSend = () => {
    console.log(`Message sent to ${recipient.email}:`, message)
    alert(`Message sent to ${recipient.username}!\n\nMessage:\n${message}`)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-900 p-6 rounded w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Contact {recipient.username}</h2>

        <textarea
          rows="5"
          className="w-full p-2 rounded bg-gray-700 text-white"
          placeholder="Write your message here..."
          value={message}
          onChange={e => setMessage(e.target.value)}
        ></textarea>

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContactModal
