"use strict";
import "./style.css";

const inputProjectNameEl = document.querySelector(".input-project-name");
const inputToDoNameEl = document.querySelector(".input-to-do-name");
const inputDateEl = document.querySelector(".input-to-do-date");

const addProjectEl = document.querySelector(".add-project-btn");
const addProjectForm = document.querySelector(".add-project-form");

const addToDoEl = document.querySelector(".add-to-do-btn");
const addToDoForm = document.querySelector(".add-to-do-form");

let inputProject;
let inputToDoName;
let inputDate;

inputProjectNameEl.addEventListener("input", function (e) {
  inputProject = e.target.value;
});
inputToDoNameEl.addEventListener("input", function (e) {
  inputToDoName = e.target.value;
});
inputDateEl.addEventListener("input", function (e) {
  inputDate = e.target.value;
});

addProjectEl.addEventListener("click", function (e) {
  addProjectForm.classList.remove("hidden");
});
addToDoEl.addEventListener("click", function (e) {
  addToDoForm.classList.remove("hidden");
});

class Project {
  constructor(projectName) {
    this.projectName = projectName;
    this.toDos = [];
  }
}

class ToDo {
  constructor(name, date) {
    this.name = name;
    this.date = date;
    this.isDone = false;
    this.isEditing = false;
  }
}

addProjectForm.addEventListener("submit", function (e) {
  e.preventDefault();
});

addToDoForm.addEventListener("submit", function (e) {
  e.preventDefault();
});
