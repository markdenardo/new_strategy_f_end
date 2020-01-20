
let getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

let getRandomCard = ((textInput,urlInput)=>{
  fetch('http://localhost:3000/cards')
  .then(r => r.json())
  .then(cards => {

    let allCards = cards.data.map(card => {
      return new Card(card.attributes.notes,
                      card.id,
                      card.attributes.strategy);
    });

    let singleCardInstance = allCards[getRandomInt(allCards.length)];

    let newSection = document.createElement('section');
    newSection.className = `section-${singleCardInstance.id}`;

    // Create header for section
    let header = document.createElement('h1');
    header.id = "strategy"
    header.innerHTML = `#${singleCardInstance.id} ${singleCardInstance.strategy}`;
    newSection.appendChild(header);
    document.querySelector("#canvas").appendChild(newSection);

    // Create unorderedList for notes
    let unorderedList = document.createElement("ul");
    document.querySelector(`.section-${singleCardInstance.id}`).appendChild(unorderedList);

    // For all notes in a card, create a list item and add it to the
    // unorderedList
    singleCardInstance.notes.forEach((note) => {
      // Add every note for each card

      let noteItem = document.createElement("li");
      let urlItem = document.createElement("li");
      let deleteNote = document.createElement("button");

      noteId = `${note.id}`
      cardId = `${note.cardId}`

      noteItem.id = `${note.id}`
      noteItem.className = "note-text"
      noteItem.innerHTML = `#${note.id} ${note.text}`

      urlItem.id = `${note.id}`
      urlItem.className = "note-url"
      urlItem.innerHTML =  `${note.url}`

      deleteNote.id = `${note.id}`
      deleteNote.className = "delete-note"
      deleteNote.innerHTML = "delete"

      unorderedList.appendChild(noteItem)
      unorderedList.appendChild(urlItem)
      unorderedList.appendChild(deleteNote)

      ul = unorderedList;
    });

  })

})

let createNote = ((textInput,urlInput)=>{

  fetch(`http://localhost:3000/notes`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "text":`${textInput.value}`,
      "url":`${urlInput.value}`,
      "card_id": `${cardId}`
    })
  })
  .then(r=>r.json())
  .then(note=>{
    let noteItem = document.createElement("li");
    let urlItem = document.createElement("li");
    let deleteButton = document.createElement("button");

    noteId = `${note.id}`
    cardId = `${note.cardId}`

    noteItem.id = `${note.id}`
    noteItem.className = "note-text"
    noteItem.innerHTML = `#${note.id} ${note.text}`

    urlItem.id = `${note.id}`
    urlItem.className = "note-url"
    urlItem.innerHTML =  `${note.url}`

    deleteButton.id = `${note.id}`
    deleteButton.className = "delete-note"
    deleteButton.innerHTML = "delete"

    ul.appendChild(noteItem)
    ul.appendChild(urlItem)
    ul.appendChild(deleteNote)

  })
})

let deleteNote = (()=>{
  // debugger
  return fetch(`http://localhost:3000/notes/${noteId}`,{method: "DELETE"})
    .then(note=>
    {let noteItem = document.getElementById(noteId)
    noteItem.remove();
    let urlItem = document.getElementById(noteId)
    urlItem.remove();
    let deleteButton = document.getElementById(noteId)
    deleteButton.remove();})
})
