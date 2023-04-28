import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const deleteQuestion = (id) => {
    const updatedQuestions = questions.filter((question) => question.id !== id);
    setQuestions(updatedQuestions);
  };

  const updateQuestion = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        correctIndex: correctIndex
      })
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedQuestions = questions.map((question) => {
          if (question.id === id) {
            return {
              ...question,
              correctIndex: correctIndex
            };
          }
          return question;
        });
        setQuestions(updatedQuestions);
      })
      .catch((err) => console.error(err));
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => {
          return (
            <QuestionItem
              key={question.id}
              question={question}
              onDelete={deleteQuestion}
              onCorrectAnswerChange={(correctIndex) => updateQuestion(question.id, correctIndex)}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default QuestionList;
