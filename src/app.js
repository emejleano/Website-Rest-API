import './styles.css';
import anime from 'animejs/lib/anime.es.js'; // Import anime.js

// Custom Element Definitions
class NoteForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <form id="noteForm">
        <input type="text" id="title" placeholder="Note Title" required />
        <textarea id="body" placeholder="Note Body" required></textarea>
        <button type="submit">Add Note</button>
      </form>
    `;

    const form = this.querySelector('#noteForm');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = this.querySelector('#title').value;
      const body = this.querySelector('#body').value;

      try {
        await fetch('https://notes-api.dicoding.dev/v2/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, body }),
        });
        alert('Note added!');
        loadNotes();
      } catch (error) {
        alert('Failed to add note');
      }
    });
  }
}

class NoteList extends HTMLElement {
  connectedCallback() {
    this.innerHTML = '<ul id="noteList"></ul>';
    loadNotes();
  }
}

customElements.define('note-form', NoteForm);
customElements.define('note-list', NoteList);

// Load Notes Function
async function loadNotes() {
  const loading = document.getElementById('loading');
  const noteList = document.getElementById('noteList');

  loading.style.display = 'block';
  try {
    const response = await fetch('https://notes-api.dicoding.dev/v2/notes');
    const result = await response.json();

    noteList.innerHTML = '';
    result.data.forEach((note) => {
      addNoteToUI(note);
    });
  } catch (error) {
    alert('Failed to load notes');
  }
  loading.style.display = 'none';
}

// Add Note to UI Function
function addNoteToUI(note) {
  const noteElement = document.createElement('li');
  noteElement.classList.add('note');
  noteElement.innerHTML = `
    <h3>${note.title}</h3>
    <p>${note.body}</p>
    <button onclick="archiveNote('${note.id}', true)">Archive</button>
    <button onclick="deleteNote('${note.id}')">Delete</button>
  `;

  document.getElementById('noteList').appendChild(noteElement);
  anime({
    targets: noteElement,
    opacity: [0, 1],
    translateY: [-50, 0],
    duration: 500,
    easing: 'easeOutQuad'
  });
}

// Archive Note Function
window.archiveNote = async function(id, archive) {
  const url = archive
    ? `https://notes-api.dicoding.dev/v2/notes/${id}/archive`
    : `https://notes-api.dicoding.dev/v2/notes/${id}/unarchive`;

  try {
    await fetch(url, {
      method: 'POST',
    });
    alert(archive ? 'Note archived!' : 'Note unarchived!');
    loadNotes();
  } catch (error) {
    alert('Failed to update note');
  }
}

// Delete Note Function
window.deleteNote = async function(id) {
  try {
    await fetch(`https://notes-api.dicoding.dev/v2/notes/${id}`, {
      method: 'DELETE',
    });
    alert('Note deleted!');
    loadNotes();
  } catch (error) {
    alert('Failed to delete note');
  }
}

// Add Loading Indicator
document.addEventListener('DOMContentLoaded', () => {
  const loadingIndicator = document.createElement('loading-indicator');
  document.body.appendChild(loadingIndicator);

  setTimeout(() => {
    document.body.removeChild(loadingIndicator);
  }, 5000);
});

window.archiveNote = async function(id, archive) {
    const url = archive
      ? `https://notes-api.dicoding.dev/v2/notes/${id}/archive`
      : `https://notes-api.dicoding.dev/v2/notes/${id}/unarchive`;
  
    await fetch(url, {
      method: 'POST',
    });
    alert(archive ? 'Note archived!' : 'Note unarchived!');
    loadNotes();
  }