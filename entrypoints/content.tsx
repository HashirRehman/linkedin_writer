import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import "./style.css"
import MySVGIcon from "../public/Frame.svg"
import Generate from "../public/generate.svg"
import Insert from "../public/insert.svg"
import Regenerate from "../public/regenerate.svg"

const LinkedInExtension: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [messages, setMessages] = useState<string[]>([])
  const [userInput, setUserInput] = useState("")
  const [stage, setStage] = useState<"prompt" | "chat">("prompt")

  useEffect(() => {
    console.log("Hello LinkedIn.")

    const observer = new MutationObserver(() => {
      const messageInput = document.querySelector(
        'div.msg-form__contenteditable[contenteditable="true"]'
      ) as HTMLElement

      if (messageInput) {
        console.log("Message input found")
        messageInput.addEventListener("focus", () => showSVGIcon(messageInput))
      }
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
    }
  }, [])

  const showSVGIcon = (targetElement: HTMLElement) => {
    let existingIcon = document.getElementById("focus-svg-icon")
    if (!existingIcon) {
      const svgContainer = document.createElement("div")
      svgContainer.id = "focus-svg-icon"
      svgContainer.className = "absolute right-2 bottom-1 cursor-pointer"

      svgContainer.innerHTML = `
        <img src=${MySVGIcon} alt="Icon" width="32" height="32" />
      `
      svgContainer.addEventListener("click", () => {
        setStage("prompt")
        setMessages([])
        setModalVisible(true)
      })
      targetElement.parentElement?.appendChild(svgContainer)
    }
  }

  const handleGenerate = () => {
    if (userInput.trim()) {
      setMessages((prev) => [...prev, `You ${userInput}`])
      setUserInput("")

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask",
        ])
      }, 1000)
      setStage("chat")
    }
  }

  const insertIntoLinkedIn = () => {
    const messageInput = document.querySelector(
      'div.msg-form__contenteditable[contenteditable="true"]'
    ) as HTMLDivElement

    if (messageInput) {
      console.log("Messages,", messages)
      messageInput.innerHTML = `<p>${messages[1]}</p>`
      const inputEvent = new Event("input", { bubbles: true })
      messageInput.dispatchEvent(inputEvent)
      messageInput.focus()
      hideModal()
    }
  }

  const hideModal = () => {
    setModalVisible(false)
  }

  const handleBackdropClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const modalContent = document.getElementById("modal-content")
    if (modalContent && !modalContent.contains(event.target as Node)) {
      hideModal()
    }
  }

  return (
    <>
      {modalVisible && (
        <div
          id="modal-backdrop"
          onClick={handleBackdropClick}
          className={`${
            modalVisible
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          } fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300`}
        >
          <div
            id="modal-content"
            className={`bg-white p-6 rounded-lg shadow-lg ${
              stage === "prompt" ? "h-[110px]" : "h-auto"
            } w-[500px] relative shadow-[0px_10px_15px_-3px_#0000001A]`}
          >
            {stage === "prompt" ? (
              <div>
                <input
                  type="text"
                  placeholder="Your Prompt"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="border w-full p-2 mb-4"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleGenerate}
                    className="bg-blue-500 text-white px-4 py-2 flex items-center gap-2 rounded-lg hover:bg-blue-600"
                  >
                    <img
                      className="inline-block"
                      src={Generate}
                      alt="Icon"
                      width="20"
                      height="20"
                    />
                    <span>Generate</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div
                  id="chat-window"
                  className="border h-64 mb-4 p-4 overflow-y-auto flex flex-col space-y-2"
                >
                  {messages.map((msg, index) => {
                    const isFromUser = msg.startsWith("You")
                    const strippedMsg = isFromUser
                      ? msg.replace(/^You\s*/, "")
                      : msg
                    const messageClass = isFromUser
                      ? "bg-gray-100 p-2 rounded-lg self-end text-gray-custom w-auto"
                      : "!bg-blue-100 p-2 rounded-lg self-start text-gray-custom w-5/6"

                    return (
                      <div key={index} className={messageClass}>
                        {strippedMsg}
                      </div>
                    )
                  })}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Your Prompt"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="border w-full p-2 mb-4"
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={handleGenerate}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    <img
                      className="inline-block"
                      src={Regenerate}
                      alt="Icon"
                      width="10"
                      height="10"
                    />
                    <span className="px-2">Regenerate</span>
                  </button>
                  <button
                    onClick={insertIntoLinkedIn}
                    className="bg-transparent border-[1px] border-solid border-[var(--Colors-Gray-500)] text-[rgba(102,109,128,1)] px-4 py-2 rounded-lg"
                  >
                    <img
                      className="inline-block"
                      src={Insert}
                      alt="Icon"
                      width="10"
                      height="10"
                    />
                    <span className="px-2">Insert</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default defineContentScript({
  matches: ["*://*.linkedin.com/*"],
  main() {
    const root = document.createElement("div")
    document.body.appendChild(root)
    ReactDOM.render(<LinkedInExtension />, root)
  },
})
