function updateClock () {
  var now = dayjs().format('MMM D, YYYY h:mm:ss A');
  $('#date-time').text(now);
}
$(document).ready(function() {
setInterval(updateClock, 1000);
});

function readProjectsFromStorage() {
  var projects = localStorage.getItem('projects');
  if (projects) {
    projects = JSON.parse(projects);
  } else {
    projects = [];
  }  return projects;
}
function saveProjectsToStorage(projects) {
  localStorage.setItem('projects', JSON.stringify(projects));
}

var displayBoxEl = $('#display-box');
var popUpEl = $('#popUpForm');
var projectNameEl = $('#nameInput');
var projectTypeEl = $('#typeInput');
var projectDateEl = $('#dateInput');


function printProjectData() {
  displayBoxEl.empty();
  var projects = readProjectsFromStorage();
  for (var i = 0; i < projects.length; i += 1) {
    var project = projects[i];
    var projectDate = dayjs(project.date);
    var today = dayjs().startOf('day');
    var rowEl = $('<tr>');
    var nameEL = $('<td>').text(project.name);
    var typeEl = $('<td>').text(project.type);
    var dateEl = $('<td>').text(projectDate.format('MM/DD/YYYY'));
    var deleteEl = $(
      '<td><button class="btn btn-sm btn-delete-project" data-index="' +
        i +
        '">X</button></td>'
    );
    if (projectDate.isBefore(today)) {
      rowEl.addClass('project-late');
    } else if (projectDate.isSame(today)) {
      rowEl.addClass('project-today');
    }
    rowEl.append(nameEL, typeEl, dateEl, deleteEl);
    displayBoxEl.append(rowEl);
  }
}

function handleDeleteProject() {
  var projectIndex = parseInt($(this).attr('data-index'));
  var projects = readProjectsFromStorage();
  projects.splice(projectIndex, 1);
  saveProjectsToStorage(projects);
  printProjectData();
}

function handleProjectFormSubmit(event) {
  event.preventDefault();
  var projectNameEl = projectNameEl.val().trim();
  var projectType = projectTypeEl.val(); 
  var projectDate = projectDateEl.val();
  var newProject = {
    name: projectNameEl,
    type: projectType,
    date: projectDate,
  };
  var projects = readProjectsFromStorage();
  projects.push(newProject);
  saveProjectsToStorage(projects);
  printProjectData();
  projectNameEl.val('');
  projectTypeEl.val('');
  projectDateEl.val('');
}

popUpEl.on('submit', handleProjectFormSubmit);

displayBoxEl.on('click', '.btn-delete-project', handleDeleteProject);

printProjectData();
