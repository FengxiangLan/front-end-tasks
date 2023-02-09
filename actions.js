const navbarToggle = document.querySelector('.navbar-toggle');
const navbarItems = document.querySelectorAll('.navbar-menu a');


navbarItems.forEach(item => {
  item.addEventListener("click", () => {
    navbarItems.forEach(item => {
      item.style.backgroundColor = "";
    });
    item.style.backgroundColor = "red";
  })
});


const display = document.querySelector(".display");
const buttons = document.querySelectorAll("input[type='button']");

let displayValue = "";
let pendingValue;
let evaluation;

for (const button of buttons) {
  button.addEventListener("click", (e) => {
    const value = e.target.value;

    if (isNaN(value)) {
      handlerOperator(value);
    } else {
      handlerNumber(value);
    }

    rerender();
  });
}

function handlerNumber(value) {
  if (displayValue === "") {
    displayValue = value;
  } else {
    displayValue += value;
  }
}

function handlerOperator(value) {
  switch (value) {
    case "/":
    case "*":
    case "-":
    case "+":
      pendingValue = displayValue;
      displayValue = "";
      evaluation = value;
      break;
    case "=":
      displayValue = strEval(pendingValue + evaluation + displayValue);
      pendingValue = undefined;
      evaluation = undefined;
      break;
    case "clear":
      displayValue = "";
      pendingValue = undefined;
      evaluation = undefined;
      break;
    default:
      break;
  }
}

function strEval(expression) {
  try {
    return eval(expression).toString();
  } catch (error) {
    return "Error";
  }
}

function rerender() {
  display.value = displayValue;
}