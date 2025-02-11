import { deleteNote, getNote, saveNote, updateNote } from "./sockets.client.js";

const notesSection = document.querySelector("#notesSection");
const title = document.querySelector("#title");
const description = document.querySelector("#description");

let savedId = "";

const noteUI = (note) => {
  const article = document.createElement("article");
  article.classList.add(
    "card",
    "card-body",
    "rounded-0",
    "mb-2",
    "animate__animated",
    "animate__fadeInUp",
  );

  article.innerHTML = `
    <div class="d-flex justify-content-between">
      <h2>${note.title}</h2>
      <div>
      <button class="btn btn-danger btn-sm delete" data-id="${note._id}">Delete</button>
      <button class="btn btn-secondary btn-sm update" data-id="${note._id}">Update</button>
    </div>
    
    </div>
    <p>${note.description}</p>
  `;

  const btnDelete = article.querySelector(".delete");
  const btnUpdate = article.querySelector(".update");

  btnDelete.addEventListener("click", () => deleteNote(btnDelete.dataset.id));
  btnUpdate.addEventListener("click", () => getNote(btnUpdate.dataset.id));

  return article;
};

export const renderNotes = (notes) => {
  notesSection.innerHTML = "";
  notes.forEach((note) => notesSection.append(noteUI(note)));
};

export const fillForm = (note) => {
  title.value = note.title;
  description.value = note.description;
  savedId = note._id;
};

export const appendNote = (note) => {
  notesSection.append(noteUI(note));
};

export const onHandleSubmit = (e) => {
  e.preventDefault();

  if (savedId) {
    updateNote(savedId, title.value, description.value);
  } else {
    saveNote(title.value, description.value);
  }

  title.value = "";
  description.value = "";
  savedId = "";
};
