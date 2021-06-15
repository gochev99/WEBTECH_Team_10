const addProject = event => {
    event.preventDefault();

    const nameProject = document.querySelector('#pname').value;
    const startDate = document.querySelector('#st-date').value;
    const endDate = document.querySelector('#end-date').value;


    const projects = {
        nameProject,
        startDate,
        endDate
    };

    const options = {
        method: 'POST',
        mode: 'cors',
        withCredentials: true,
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(projects)
    };

   // const url = 'http://localhost:3002/login';

   // router.get('/:email', projectController.getAllProjects);
};


/*function createElement(text) {
    console.log("create")
    let parentNode = document.getElementById("projects-container");
    let refNode = document.getElementById("add")
    let newNode = document.createElement("li")
    newNode.classList.add("project")
    let label = document.createElement("label")
    label.classList.add("project-name")
    label.innerText = text;
    newNode.appendChild(label)
    parentNode.insertBefore(newNode, refNode);

    newNode.addEventListener("click", (event) => {
        event.preventDefault();
        const tar = event.currentTarget;
        const projectName = tar.firstChild.innerText

        console.log(projectName);
        localStorage.setItem('projectName', projectName)
        window.location = 'viewByTasks.html';
    });
}


function addProjectsToDOM(projects) {
    console.log(projects)

    Array.from(projects.projects).slice(1).forEach(project => createElement(project.name))
}

function getProjects() {
    const email = localStorage.getItem('email');
    console.log(email);

    const url = `http://localhost:3000/projects/${email}`
    console.log(`URL:${url}`);

    const options = {
        method: 'GET',
        mode: 'cors',
        withCredentials: true,
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(url, options)
        .then(response => response.json())
        .then(response => addProjectsToDOM(response))
        .catch(err => console.error(err))
};
*/
function createProject() {
    const nameProject = document.querySelector('#pname').value;
    const startDate = document.querySelector('#st-date').value;
    const endDate = document.querySelector('#end-date').value;

    const project = {
        'projectName': nameProject.value,
        'startDate': startDate.value,
        'targetEndDate': endDate.value
        
    }
  
    const url = `http://localhost:3002/projects/`;

    const options = {
        method: 'POST',
        mode: 'cors',
        withCredentials: true,
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
    };

    fetch(url, options)
        .then(res => console.log(res))
        //.then(getProjects())
        .then(location.reload())
        .catch(err => console.log(err))
}

(function() {
    let doneBtn = document.querySelector("#done");
    //let btnClose = document.getElementById("deleteProject");

    /*window.addEventListener('load', (event) => {
        getProjects();
    });*/

    doneBtn.onclick = event => {
        console.log("done");
        event.preventDefault();
        createProject();
    }

    /*btnClose.onclick = event => {
        event.preventDefault();
        modal.style.display = "none";
    }*/
})();