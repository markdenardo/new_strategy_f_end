
let getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

let getRandomCard = (()=>{
  fetch('https://new-strategy.herokuapp.com/cards')
  .then(r => r.json())
  .then(cards => {

    let allCards = cards.data.map(card => {
      return new Card(card.id,
                      card.attributes.strategy,
                      card.attributes.notes);
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
      cardId = `${note.card_id}`

      noteItem.id = `${noteId}`
      noteItem.className = "note-text"
      noteItem.innerHTML = `#${noteId} ${note.text}`

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

let editCard = ((strategyInput)=>{
  fetch(`https://new-strategy.herokuapp.com/cards/${cardId}`,{
    method: "PATCH",
    body: JSON.stringify({
      strategy: `${strategyInput}`
    }),
    headers:{
      "Content-type": "application/json",
      "Accept": "application/json"
    }
  }).then(card => {
    console.log(card)
    // debugger
    let header = document.getElementById('strategy');
    header.innerHTML = `#${cardId} ${strategyInput}`
    n=0;
  })

})

let deleteNote = (()=>{

  return fetch(`https://new-strategy.herokuapp.com/notes/${noteId}`,{method: "DELETE"})

  })

let createNote = ((textInput,urlInput)=>{

  fetch(`https://new-strategy.herokuapp.com/notes`,{
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
    let deleteNote = document.createElement("button");

    noteId = `${note.id}`
    cardId = `${note.card_id}`

    noteItem.id = `${noteId}`
    noteItem.className = "note-text"
    noteItem.innerHTML = `#${noteId} ${note.text}`

    urlItem.id = `${note.id}`
    urlItem.className = "note-url"
    urlItem.innerHTML =  `${note.url}`

    deleteNote.id = `${note.id}`
    deleteNote.className = "delete-note"
    deleteNote.innerHTML = "delete"

    ul.appendChild(noteItem)
    ul.appendChild(urlItem)
    ul.appendChild(deleteNote)

  })
})
