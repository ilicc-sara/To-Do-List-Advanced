"use strict";
import "./style.css";
// prettier-ignore
import {inputProjectNameEl, inputToDoNameEl, inputDateEl, addProjectEl, addProjectForm, addToDoEl, addToDoForm, projectsList, toDoList} from "./helpers";

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

function updateUI(id, name, date) {
  const toDoItem = document.createElement("li");
  toDoItem.setAttribute("data-id", id);

  toDoItem.innerHTML = `<p class="title-text"> Title: <span class="title"> ${name} </span> </p>
            <div class="to-do-info">
              <p class="date-text"> Date: <span class="date"> ${date} </span></p>
              <div class="btn-cont"> <button class="edit-to-do-btn">edit</button> <button class="delete-to-do-btn">delete</button> </div>
              <input class="check" type="checkbox" />
            </div>`;

  toDoItem.className = "to-do-item";

  toDoList.appendChild(toDoItem);
}

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

  addProjectForm.classList.add("hidden");
});

projectsList.addEventListener("click", function (e) {
  // prettier-ignore
  if (!e.target.classList.contains("delete-project-btn") && !e.target.classList.contains('project-item')) return;
  const target = e.target.closest(".project-item");

  if (e.target.classList.contains("project-item")) {
    projectManager.setActiveProject(target.dataset.id);

    toDoList.innerHTML = "";
    projectManager.activeProject.toDos.forEach((toDo) => {
      updateUI(toDo.id, toDo.name, toDo.date);
    });
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

  updateUI(toDo.id, inputToDoName, inputDate);

  console.log(projectManager.projects);

  inputToDoNameEl.value = "";
  inputDateEl.value = "";

  addToDoForm.classList.remove("hidden");
});

toDoList.addEventListener("click", function (e) {
  // prettier-ignore
  if (!e.target.classList.contains("delete-to-do-btn")) return;
  const target = e.target.closest(".to-do-item");

  if (e.target.classList.contains("delete-to-do-btn")) {
    target.remove();
    projectManager.activeProject.removeToDo(target.dataset.id);
  }
});
