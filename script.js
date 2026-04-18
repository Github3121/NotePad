const openNote = () => {
    document.getElementById("note").style.display = "flex";
}

const closeNote = () => {
    document.getElementById("note").style.display = "none";
}

const clearInputs = () => {
    document.getElementById("title").value = "";
    document.getElementById("txt").value = "";
}

const noteSave = () => {
    const title = document.getElementById("title").value;
    const txt = document.getElementById("txt").value;

    if (title.trim() === "" || txt.trim() === "") {
        alert("Please write something before saving!");
        return;
    }

    createNoteUI(title, txt);

    const allNotes = JSON.parse(localStorage.getItem("allNotes")) || [];
    allNotes.push({ h1: title, text: txt });
    localStorage.setItem("allNotes", JSON.stringify(allNotes));

    document.getElementById("notFound").style.display = "none";

    clearInputs();
    closeNote();
}

const createNoteUI = (title, text) => {
    const container = document.querySelector(".card-container");
    const newDiv = document.createElement("div");

    newDiv.innerHTML = `
        <h2>${title}</h2>
        <p>${text}</p>
    `;
    
    container.appendChild(newDiv);
}

window.onload = function() {
    const allNotes = JSON.parse(localStorage.getItem("allNotes")) || [];
    const notFoundMsg = document.getElementById("notFound");

    if (allNotes.length > 0) {
        notFoundMsg.style.display = "none";
        allNotes.forEach(note => createNoteUI(note.h1, note.text));
    } else {
        notFoundMsg.style.display = "block";
    }
}