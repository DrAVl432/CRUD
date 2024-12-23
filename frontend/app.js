// app.js
document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.getElementById('noteForm');
    const notesList = document.getElementById('notesList');
    const noteContentInput = document.getElementById('noteContent');

    const loadNotes = async () => {
        const response = await fetch('http://localhost:7070/notes');
        const notes = await response.json();
        notesList.innerHTML = notes.map(note => `
            <li>
                ${note.content} <button onclick="deleteNote(${note.id})">Удалить</button>
            </li>
        `).join('');
    };

    noteForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const content = noteContentInput.value.trim();
        if (!content) return;

        await fetch('http://localhost:7070/notes', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ content })
        });

        noteContentInput.value = '';
        await loadNotes();
    });

    window.deleteNote = async (id) => {
        await fetch(`http://localhost:7070/notes/${id}`, {
            method: "DELETE"
        });
        await loadNotes();
    };

    loadNotes();
});