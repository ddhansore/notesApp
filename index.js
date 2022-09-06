
let addBtn = document.getElementById("addBtn");

let addTxt = document.getElementById("addTxt");
let notes = localStorage.getItem("notes");
if (notes == null) {
  notesObj = [];
} else {
  notesObj = JSON.parse(notes);
}
show();

// add notes
addBtn.addEventListener("click", function (e) {
  notesObj.push(addTxt.value);

  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  show();
});

// show the note

function show() {
    let html = "";
  notesObj.forEach(function (element, index) {
    html += `
                <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">Note ${index + 1}</h5>
                            <p class="card-text"> ${element}</p>
                            <button id="${index}" onclick="remove(this.id)" class="btn btn-primary">Delete Note</button>
                        </div>
                    </div>`;
  });

  let notesEle = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesEle.innerHTML = html;
  } else {
    notesEle.innerHTML = "<h4> Add Notes BY click on Add Notes</h4>";
  }
}

// remove

function remove(index) {
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  show();
}

// for searching

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();

  let noteCards = document.getElementsByClassName("noteCard");

  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;

    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else element.style.display = "none";
  });
});
