import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");


  const [questions, setQuestions] = useState([])

  useEffect(()=>{
    fetch('http://localhost:4000/questions')
    .then(r => r.json())
    .then(setQuestions)
    }, [])

    function handleSubmit(e) {
      e.preventDefault()

      const configOBj = {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: {
            "prompt": "",
            "answers": [""],
            // "correctIndex": integer
        }
      }

      fetch('http://localhost:4000/questions', configOBj)
      .then(r => r.json())
      .then(questions =>setQuestions(questions))


    }
    
    function handleViewQuestions(e) {
      e.preventDefault()


      const configOBj2 = {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json"
          },
          body: {
            "prompt": "",
            "answers": [""],
            "correctIndex": 0
        }
      }

      fetch('http://localhost:4000/questions', configOBj2)
      .then(r => r.json())
      .then(questions =>setQuestions(questions))
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm /> : <QuestionList />}
    </main>
  );
}

export default App;
