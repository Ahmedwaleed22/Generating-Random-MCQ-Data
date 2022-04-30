const express = require("express");
const fastLoremIpsum = require("fast-lorem-ipsum");

const app = express();
const port = process.env.port || 8000;

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function generateRandomQuestion() {
  const id = generateRandomNumber(1, 100);
  const answer_number = generateRandomNumber(1, 5);
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
  const number_of_questions = generateRandomNumber(2, 15);

  let data = [];

  for (let i = 0; i <= number_of_questions; i++) {
    data = [...data, generateRandomQuestion()];
  }

  return data;
}

app.get("/", function (req, res) {
  res.send(generatingAllQuestions());
});

console.log(`Server listening on port ${port}`);
app.listen(port);
