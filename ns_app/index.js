const canvasDiv = document.getElementById('canvas')
const noteForm = document.getElementById('note-form')
let textInput = document.getElementById('text-input')
let urlInput = document.getElementById('url-input')
let cardId;
let noteId;
let ul;

document.addEventListener("DOMContentLoaded", (e) => {

  getRandomCard();

  canvasDiv.addEventListener("click", (e) => {
    e.preventDefault();

    if (e.target.id === "strategy"){
      canvasDiv.innerHTML = ""
      getRandomCard()
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
