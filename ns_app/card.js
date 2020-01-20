class Card {
  constructor(notes, id, strategy) {
    this.notes = this.buildNotes(notes);
    this.id = id;
    this.strategy = strategy;
  }

  buildNotes(notes) {
    return notes.map(note => {
      return new Note(note.card_id, note.id, note.text, note.url);
    });
  }
}