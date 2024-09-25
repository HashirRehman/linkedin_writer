function App() {
  return (
    <div className="flex items-center justify-center rounded bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 text-center">
          LinkedIn Writer
        </h1>
        <p className="text-lg text-gray-600 mb-6 text-center">
          This extension helps you streamline your LinkedIn messaging experience.
        </p>
        <div className="flex flex-col space-y-4">
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-600 transition duration-300 w-full text-center"
          >
            Open LinkedIn
          </a>
          <a
            href="https://www.linkedin.com/messaging/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-600 transition duration-300 w-full text-center"
          >
            Open LinkedIn Inbox
          </a>
        </div>
      </div>
    </div>
  )
}

export default App
