"use strict";
import "./style.css";

const inputProjectNameEl = document.querySelector(".input-project-name");
const inputToDoNameEl = document.querySelector(".input-to-do-name");
const inputDateEl = document.querySelector(".input-to-do-date");

const addProjectEl = document.querySelector(".add-project-btn");
const addProjectForm = document.querySelector(".add-project-form");

const addToDoEl = document.querySelector(".add-to-do-btn");
const addToDoForm = document.querySelector(".add-to-do-form");

const projectsList = document.querySelector(".projects-list");

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

class ProjectManager {
  constructor() {
    this.projects = [];
    this.activeProject = null;
  }

  addProjects(project) {
    this.projects.push(project);
  }

  removeProject(id) {
    this.projects = this.projects.filter((item) => item.id !== id);
  }

  setActiveProject(id) {
    this.activeProject = this.projects.find((project) => project.id === id);
  }
}

class Project {
  constructor(projectName) {
    this.projectName = projectName;
    this.id = crypto.randomUUID();
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

const projectManager = new ProjectManager();

addProjectForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const project = new Project(inputProject);
  projectManager.addProjects(project);

  const projectItem = document.createElement("li");
  projectItem.setAttribute("data-id", project.id);
  projectItem.innerHTML = `${inputProject} <button class="delete-project-btn">X</button>`;
  projectItem.className = "project-item";

  projectsList.appendChild(projectItem);
  inputProjectNameEl.value = "";
});

projectsList.addEventListener("click", function (e) {
  // prettier-ignore
  if (!e.target.classList.contains("delete-project-btn") && !e.target.classList.contains('project-item')) return;
  const target = e.target.closest(".project-item");

  if (e.target.classList.contains("project-item")) {
    projectManager.setActiveProject(target.dataset.id);
  }

  if (e.target.classList.contains("delete-project-btn")) {
    target.remove();
    projectManager.removeProject(target.dataset.id);
  }
});

addToDoForm.addEventListener("submit", function (e) {
  e.preventDefault();
});
