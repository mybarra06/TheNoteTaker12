const util = require("util");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');


// define read file and write file async functions
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    // read note -- from database, not doing anything to client
    read() {
        return readFileAsync("./db/db.json", "utf-8");
    }
    // write note -- not handling client
    write(note) {
        return writeFileAsync("./db/db.json", JSON.stringify(note));
    }

    // get all notes
    getNotes() {
        return this.read().then(notes => {
            let parsedNotes;

            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }

            return parsedNotes;
        });
    }

    // add note
    saveNote(note) {
        const { title, text } = note;

        if (!title || !text) {
            throw new Error("Note must have title and text");
        }

        const newNote = { title, text, id: uuidv4()}

        return this.getNotes()
            .then((notes => [...notes, newNote]))
            .then(updatedNotes => this.write(updatedNotes)
            .then(() => newNote))
    }

    // remove note
}
module.exports = new Store();

