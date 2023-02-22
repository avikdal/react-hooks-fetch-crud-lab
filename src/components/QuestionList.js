import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([])
  
 useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(r => r.json())
    .then(question => setQuestions(question))
  }, [])

  function handleDelete(id){
    console.log("handle delete question id", id)
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(() => {
      const leftOverQuestions = questions.filter((question) => question.id !== id);
      setQuestions(leftOverQuestions);
    })
  }

  function changeAnswer(id, correctIndex){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ correctIndex })
    })
    .then(r => r.json())
    .then((fixedAnswer) => {
      const updatedQuestions = questions.filter((q) => {
        if(q.id === fixedAnswer.id) return fixedAnswer
        return q
      })
      setQuestions(updatedQuestions)
    })
  }

  const questionItem = questions.map((question) => (
    <QuestionItem 
      key={question.id} 
      question={question} 
      onDeleteClick={handleDelete} 
      changeAnswer={changeAnswer} 
    /> 
    ))


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItem}</ul>
    </section>
  );
}

export default QuestionList;
