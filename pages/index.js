import { useState, useEffect } from "react";

export default function QuizApp() {
  const [quizData, setQuizData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState("");
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://samhallskunskap-quiz-test.onrender.com";

  const fetchQuiz = async () => {
    try {
      console.log("Hämtar data från:", `${API_URL}/quiz/?category=demokrati`);
  
      const response = await fetch(`${API_URL}/quiz/?category=demokrati`);
      console.log("Response status:", response.status);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Hämtad data:", data);
  
      setQuizData(data);
      setSelectedAnswer(null);
      setFeedback("");
    } catch (error) {
      console.error("Kunde inte hämta data från API:", error);
    }
  };
  
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Quiz i Samhällskunskap</h1>
      <button onClick={fetchQuiz}>Hämta fråga</button>
      {quizData && (
        <div>
          <p>{quizData.question}</p>
          {quizData.options.map((option, index) => (
            <button key={index} onClick={() => setSelectedAnswer(option[0])}>
              {option}
            </button>
          ))}
          <button onClick={() => setFeedback(selectedAnswer === quizData.answer ? "Rätt!" : "Fel!")}>Svara</button>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
}