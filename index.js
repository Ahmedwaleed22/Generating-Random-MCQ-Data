const express = require("express");
const fastLoremIpsum = require("fast-lorem-ipsum");

const app = express();
const port = process.env.port || 8000;

function generateRandomQuestion() {
  const id_min = 1;
  const id_max = 100;
  const answer_min = 1;
  const answer_max = 5;

  const id = Math.floor(Math.random() * (id_max - id_min) + id_min);
  const answer_number = Math.floor(
    Math.random() * (answer_max - answer_min) + answer_min
  );
  const question = fastLoremIpsum(20, "w")
    .split(" ")
    .sort(() => 0.5 - Math.random())
    .join(" ");

  return {
    id,
    question,
    option1: "Answer 1",
    option2: "Answer 2",
    option3: "Answer 3",
    option4: "Answer 4",
    answer: `Answer ${answer_number}`,
  };
}

function generatingAllQuestions() {
  let data = [];

  for (let i = 0; i <= 10; i++) {
    data = [...data, generateRandomQuestion()];
  }

  return data;
}

app.get("/", function (req, res) {
  res.send(generatingAllQuestions());
});

console.log(`Server listening on port ${port}`);
app.listen(port);
