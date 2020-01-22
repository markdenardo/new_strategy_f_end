const uiDiv = document.getElementById('ui-prompt')
const canvasDiv = document.getElementById('canvas')
const noteForm = document.getElementById('note-form')
let textInput = document.getElementById('text-input')
let urlInput = document.getElementById('url-input')

let cardId;
let noteId;

let strategyForm;
let strategyInput;
let ul;
let n = 0;

document.addEventListener("DOMContentLoaded", (e) => {

  getRandomCard();

  uiDiv.addEventListener("click",(e) => {
  console.log("clicked")
  if (e.target.id === "newcard"){
      canvasDiv.innerHTML = ""
      getRandomCard()
    }

})

  canvasDiv.addEventListener("click", (e) => {
    e.preventDefault();

    if (e.target.id === "strategy" && n === 0){
      n = 1;
      strategyForm = document.createElement("form")
      strategyForm.innerHTML =
      `<input type="text" name="strategyinput" id="strategyinput" cols="30" rows="10" placeholder="${e.target.innerHTML.replace(/[^a-zA-Z ]+[0-9]/g, '')}">
      <button id='submit'>edit strategy</button>`
      e.target.append(strategyForm)
    }

    if (e.target.id === "submit"){
      let input = document.getElementById("strategyinput")
      strategyInput = input.value
      console.log(strategyInput)
      if (strategyInput !== ""){

        editCard(strategyInput);
      }
    }

    if (e.target.className === "note-url"){
      window.open(e.target.innerHTML);
    }

    if (e.target.className === "delete-note"){

      deleteNote(noteId);
    }

  })

  noteForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    console.log("submit")

    if (e.target.text.value !== "" && e.target.url.value !== ""){
      createNote(textInput,urlInput);
    }
  })

})
