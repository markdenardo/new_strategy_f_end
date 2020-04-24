class Card {
  constructor(id, strategy, notes) {
    this.id = id;
    this.strategy = strategy;
    this.notes = this.buildNotes(notes);
  }

  buildNotes(notes) {
    return notes.map(note => {
      return new Note(note.id, note.card_id, note.text, note.url,);
    });
  }
}
