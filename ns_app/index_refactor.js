const canvasDiv = document.getElementById('canvas')
const cardDiv = document.getElementById('card')

let noteId = document.getElementById('noteid')
let noteDiv = document.getElementById('note')
let urlDiv = document.getElementById('url')

const noteForm = document.getElementById('note-form')
let textInput = document.getElementById('text-input')
let urlInput = document.getElementById('url-input')
let randomCard = [];
let randomCardId;

//get randomCard + load new random card
let getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

canvasDiv.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(e.target.id)
  if (e.target.id === "random-card-button"){
    cardDiv.innerHTML = "loading card..."
    noteDiv.innerHTML = "loading note..."
    urlDiv.innerHTML = "loading url..."
    getRandomCard()
  }
  if (e.target.id === "url"){
    // console.log(randomCard.attributes.notes[0].url)
    window.open(randomCard.attributes.notes[0].url);
  }
  if (e.target.id === "delete-note-button"){
    deleteNote()
  }
})

let getRandomCard =(()=>{
  fetch('http://localhost:3000/cards')
  .then(r => r.json())
  .then(card => {
      //get random card
    var cardArray = card.data
    // debugger
    randomCard = cardArray[getRandomInt(cardArray.length)]
    randomCardId = randomCard.id;
    //assign css tags
    console.log('randomCard.id',randomCard.id);
    console.log('randomCardId',randomCardId);
    // debugger
    cardDiv.innerHTML = `${randomCard.attributes.strategy}`
    noteId.innerHTML = `note_id: ${randomCard.attributes.notes[0].id}`
    noteDiv.innerHTML = `${randomCard.attributes.notes[0].text}</br>`
    urlDiv.innerHTML = `${randomCard.attributes.notes[0].url}</br>`
  })

})

//end of random card

//add new note + url to card
noteForm.addEventListener("submit", (e)=>{
    e.preventDefault()
  if (e.target.text.value !== "" && e.target.url.value !== ""){
    // debugger
    // noteDiv.innerHTML += textInput
    // urlDiv.innerHTML += urlInput
    createNote(textInput,urlInput)
  }
})

let createNote = ((textInput,urlInput)=>{
  // debugger

  fetch(`http://localhost:3000/notes`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "card": `${randomCard.id}`,
      "text":`${textInput.value}`,
      "url":`${urlInput.value}`,
      "card_id": `${randomCard.id}`
      // "note_id":`${}`
    })
  })
  .then(r=>r.json())
  .then(cardNote=>{
    // debugger
    // var cardArray = card.data
    // var randomCard = cardArray[getRandomInt(cardArray.length)]
    noteId.innerHTML += `<br>note_id: ${cardNote.id}`
    noteDiv.innerHTML += `<br>${textInput.value}`
    urlDiv.innerHTML += `<br>${urlInput.value}`
  })
})

// end post note + url

let deleteNote = (()=>{
  return fetch(`http://localhost:3000/notes/${randomCard.attributes.notes[0].id}`, {
        method: "DELETE"
      }) //End of Fetch
      .then(data => {
        noteId.innerHTML = "note_id:"
        noteDiv.innerHTML = ""
        urlDiv.innerHTML = ""
      })
})


getRandomCard();
