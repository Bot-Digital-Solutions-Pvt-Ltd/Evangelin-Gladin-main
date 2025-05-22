import { useEffect, useState } from "react";

export default function QuizPopup() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    if (showQuiz) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const timer = setTimeout(() => setShowMessage(false), 3000);

    return () => {
      document.body.style.overflow = "";
      clearTimeout(timer);
    };
  }, [showQuiz]);

  return (
    <>
      {showMessage && (
        <div className="fixed bottom-20 right-6 sm:right-28 bg-white text-black px-4 py-2 rounded-lg shadow-lg animate-slide-in z-40">
          Need help scaling? Try the quiz!
        </div>
      )}

      <button
        onClick={() => setShowQuiz(true)}
        className="fixed bottom-4 right-4 p-4 bg-blue-600 text-white rounded-full shadow-lg z-50"
      >
        <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-green-400 animate-ping"></span>
        <span className="text-3xl">❓</span>
      </button>

      {showQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="relative w-[95%] max-w-[600px] rounded-lg shadow-lg">
            <button
              onClick={() => setShowQuiz(false)}
              className="absolute top-32 right-10 sm:top-10 sm:right-14  w-8 h-8 bg-red-500 text-white rounded-full text-xl font-bold flex items-center justify-center shadow-lg z-10"
            >
              &times;
            </button>

            <iframe
              src="https://growth-quiz-demo.netlify.app/"
              title="Quiz App"
              className="w-full h-[75vh] sm:h-[400px] border-none rounded-lg"
              scrolling="no"
            />
          </div>
        </div>
      )}
    </>
  );
}
