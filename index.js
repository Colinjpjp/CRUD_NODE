const { custom } = require("format-logs");
const { LocalStorage } = require("node-localstorage");
const { stdin, stdout } = require("process");
const readline = require("readline");
let List = [];
const localStorage = new LocalStorage("./localStorage");

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});

function addItems(text) {
  // if (isNaN(text) === false) { \\ Descomentar esta Linea si no QUieres números en tu CRUD
  //   console.log(`> ${custom("No es un texto", "red")}`);
  //   return;
  if (text.trim() === "") {
    console.log(`> ${custom("No es un texto", "red")}`);
    return;
  }
  List.push(text);
  localStorage.setItem("CACHE_KEY", JSON.stringify(List));
}

function main() {
  const key = localStorage.getItem("CACHE_KEY");
  if (key === null || key.length <= 0 || key === undefined) {
    List = [];
    localStorage.CACHE_KEY = [];
  } else {
    const parse = JSON.parse(key);
    List = parse;
  }
}
main();

function rendering(elements) {
  console.log(`${custom("---------------------", "green").repeat(5)}`);
  if (elements.length <= 0) {
    console.log(`> ${custom("No hay elementos", "red")}`);
    return;
  }
  elements.forEach((element) => {
    console.log(`> ${custom(element, "cyan")}`);
  });
}

function questionAll() {
  rl.question(
    `> ${custom(
      "¿Que quieres hacer? \n 1.Agregar ua cosa por hacer \n 2.Borrar la lista de cosas\n 3.Ver la Lista  ",
      "green"
    )}`,
    (answer) => {
      if (answer.trim() === "1") {
        question1();
      } else if (answer.trim() === "2") {
        question2();
      } else if (answer.trim() === "3") {
        question3();
      } else if (answer.trim() === "n") {
        rl.close();
      } else {
        questionAll();
      }
    }
  );
}

function question1() {
  rl.question(
    `> ${custom("¿Que Quieres agregar ala lista? : ", "underline")}`,
    (answer) => {
      if (answer.trim() === "n" || answer.trim() === "nd") {
        rl.close();
        return;
      }
      addItems(answer);
      rendering(List);
      questionAll();
    }
  );
}

function question2() {
  localStorage.CACHE_KEY = [];
  List = [];
  console.log(custom("Se borraron los datos", "red"));
  questionAll();
}

function question3() {
  rendering(List);
  questionAll();
}
main();
questionAll();
