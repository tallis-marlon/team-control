// Elementos

const notesContainer = document.querySelector("#notes-container");

const noteInput = document.querySelector("#note-content");

const addNoteBtn = document.querySelector(".add-note");

const exportBtn = document.querySelector("#exports-notes");

const searchInput = document.querySelector("#search-input");

// Functions
function showNotes(notes) {
    cleanNotes();

    notes.forEach((note) => {
        const noteElement = createNote(note.id, note.content, note.fixed);
        notesContainer.appendChild(noteElement);
    });
}

function cleanNotes() {
    notesContainer.replaceChildren([]);
}

function addNote() {
    const notes = getNotes();

    const noteObject = {
        id: generatedId(),
        content: noteInput.value,
        fixed: false,
    };

    const noteElement = createNote(noteObject.id, noteObject.content);

    notesContainer.appendChild(noteElement);

    notes.push(noteObject);

    saveNotes(notes);

    noteInput.value = "";
}

function generatedId() {
    return Math.floor(Math.random() * 5000);
}

function createNote(id, content, fixed) {
    const element = document.createElement("div");

    element.classList.add("note");

    const textarea = document.createElement("textarea");

    textarea.value = content;

    textarea.placeholder = "Adicione algum texto...";

    element.appendChild(textarea);

    const pinIcon = document.createElement("i");

    pinIcon.classList.add(...["bi", "bi-pin"]);

    element.appendChild(pinIcon);

    const deleteIcon = document.createElement("i");

    deleteIcon.classList.add(...["bi", "bi-x-lg"]);

    element.appendChild(deleteIcon);

    const duplicateIcon = document.createElement("i");

    duplicateIcon.classList.add(...["bi", "bi-file-earmark-plus"]);

    element.appendChild(duplicateIcon);

    if (fixed) {
        element.classList.add("fixed");
    }

    // Eventos do elemento
    element.querySelector(".bi-pin").addEventListener("click", () => (toggleFixNote(id)));
    element.querySelector(".bi-x-lg").addEventListener("click", () => (deleteNote(id, element)));
    element.querySelector(".bi-file-earmark-plus").addEventListener("click", () => (CopyNote(id, element)));


    return element;
}

function toggleFixNote(id) {
    const notes = getNotes();

    const targetNote = notes.filter((note) => note.id === id)[0]

    targetNote.fixed = !targetNote.fixed;

    saveNotes(notes);

    showNotes(getNotes());
}

function deleteNote(id, element) {
    const notes = getNotes().filter((note) => note.id !== id);

    saveNotes(notes);

    notesContainer.removeChild(element);
}

function CopyNote(id) {

    const notes = getNotes();
    const targetNote = notes.filter((note) => note.id === id)[0];
    const noteObject = {
        id: generatedId(),
        content: targetNote.content,
        fixed: false
    };

    const noteElement = createNote(noteObject.id, noteObject.content, noteObject.fixed);

    notesContainer.appendChild(noteElement);

    notes.push(noteObject);

    saveNotes(notes);
}

function exportNotesToCSV() {
    const notes = getNotes();
    let csvContent = "data:text/csv;charset=utf-8," + "Note ID,Content,Fixed\n";
    notes.forEach((note) => {
        csvContent += note.id + "," + note.content.replace(/,/g, ";") + "," + note.fixed + "\n";
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "notes.csv");
    document.body.appendChild(link);
    link.click();
}

function searchNotes(searchTerm) {
    const notes = getNotes();
    const filteredNotes = notes.filter((note) => note.content.includes(searchTerm));
    return filteredNotes;
}


// Local Storage
function getNotes() {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");

    const orderedNotes = notes.sort((a, b) => (a.fixed > b.fixed ? -1 : 1));

    return notes;
}

function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Events
addNoteBtn.addEventListener("click", () => addNote());

exportBtn.addEventListener("click", exportNotesToCSV);

searchInput.addEventListener("input", (event) => {
    const searchTerm = event.target.value;
    const filteredNotes = searchNotes(searchTerm);
    showNotes(filteredNotes);
});

// Inicialização
showNotes(getNotes());
