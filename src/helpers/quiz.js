export const LIMIT_QUESTIONS = 100;


export const questions = [
    {
        id: 1,
        title: "Which is larget animal in the world?",
        options: ["Shark", "Blue whale", "Elephant", "Giraffe"],
        correct: "Blue whale"
    },
    {
        id: 2,
        title: "Wich is the smallest country in the world?",
        options: ["Vatican City", "Bhutan", "Nepal", "Shri Lanka"],
        correct: "Vatican City"
    },
    {
        id: 3,
        title: "Wich is the largest desert in the world?",
        options: ["Kalahari", "Gabi", "Sahara", "Antarctica"],
        correct: "Antarctica"
    },
    {
        id: 4,
        title: "Wich is the smallest continent in the world?",
        options: ["Asia", "Australia", "Arctic", "Africa"],
        correct: "Africa"
    },
]


export const randomQuestion = () => {
    return Math.floor(Math.random() * questions.length);
}