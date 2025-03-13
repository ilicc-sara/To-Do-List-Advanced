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
const toDoList = document.querySelector(".to-do-list");

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

  addToDo(toDo) {
    this.toDos.push(toDo);
  }

  removeToDo(id) {
    this.toDos = this.toDos.filter((item) => item.id !== id);
  }
}

class ToDo {
  constructor(name, date) {
    this.name = name;
    this.date = date;
    this.id = crypto.randomUUID();
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
    // toDoList.innerHTML = "";

    // const toDoItem = document.createElement("li");
    // toDoItem.setAttribute("data-id", projectManager.activeProject.id);

    // toDoItem.innerHTML = `<p class="title-text"> Title: <span class="title"> ${projectManager.activeProject.name} </span> </p>
    //           <div class="to-do-info">
    //             <p class="date-text"> Date: <span class="date"> ${projectManager.activeProject.date} </span></p>
    //             <div class="btn-cont"> <button class="edit-to-do-btn">edit</button> <button class="delete-to-do-btn">delete</button> </div>
    //             <input class="check" type="checkbox" />
    //           </div>`;

    // toDoItem.className = "to-do-item";

    // toDoList.appendChild(toDoItem);
  }

  if (e.target.classList.contains("delete-project-btn")) {
    target.remove();
    projectManager.removeProject(target.dataset.id);
  }
});

addToDoForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const toDo = new ToDo(inputToDoName, inputDate);
  // projectManager.addProjects();
  projectManager.activeProject.addToDo(toDo);

  // console.log(projectManager.activeProject.toDos);

  const toDoItem = document.createElement("li");
  toDoItem.setAttribute("data-id", toDo.id);

  toDoItem.innerHTML = `<p class="title-text"> Title: <span class="title"> ${inputToDoName} </span> </p>
            <div class="to-do-info">
              <p class="date-text"> Date: <span class="date"> ${inputDate} </span></p>
              <div class="btn-cont"> <button class="edit-to-do-btn">edit</button> <button class="delete-to-do-btn">delete</button> </div>
              <input class="check" type="checkbox" />
            </div>`;

  toDoItem.className = "to-do-item";

  toDoList.appendChild(toDoItem);

  console.log(projectManager.projects);

  inputToDoNameEl.value = "";
  inputDateEl.value = "";
});

toDoList.addEventListener("click", function (e) {
  // prettier-ignore
  if (!e.target.classList.contains("delete-to-do-btn")) return;
  const target = e.target.closest(".to-do-item");

  if (e.target.classList.contains("delete-to-do-btn")) {
    target.remove();
    // projectManager.removeProject(target.dataset.id);
    projectManager.activeProject.removeToDo(target.dataset.id);
  }
});
