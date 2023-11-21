document.addEventListener("DOMContentLoaded", () => {

    let initial_hero_project = projects[0]
    const heroProject = document.createElement("div");
    heroProject.id = "hero_project";

    const projectsContainer = document.getElementById('projects_container')

    const face = document.getElementById('face')
    face.addEventListener('click', () => meOrNotToggle())
    let meOrNot = false

    function renderHeroProject(project){
        const { projectName, links, description, technologysUsed, image} = project
        const heroContainer = document.getElementById("hero_project_container")
        heroProject.innerHTML =`
            <div id="hero_project_info">
              <h4 id="hero_project_key">Project Name:</h4><p class="hero_project_value"> ${projectName}<p>
              <h4 id="hero_project_key">Link:</h4><a href="${links}" class="hero_project_value">${links}</a>
              <h4 id="hero_project_key_desc">Description:</h4><p class="hero_project_value"> ${description}<p>
              <h4 id="hero_project_key">Technologies Used:</h4><p class="hero_project_value"> ${technologysUsed}<p>
            </div>
            <div>
                <img src=${image} alt="${projectName}" id="hero_project_image"/>
            </div>`;
        heroContainer.append(heroProject);
    } 
    
    renderHeroProject(initial_hero_project)

    function renderProject(project){
        const {image, projectName} = project
        const projectCard = document.createElement("div")
        projectCard.id = "project_card";
        projectCard.addEventListener('click', () => {
            initial_hero_project = project
            renderHeroProject(initial_hero_project)
        })
        projectCard.innerHTML = `
            <img src=${image} alt="${projectName}" id="project_card_image" />
            <h4 id="project_card_name">${projectName}</h4>
        `;
        projectsContainer.append(projectCard);
    }


    let projectsStart = 0
    let projectsEnd = 3

    const decreaseButton = document.getElementById("decrease_scroll_button")
    const increaseButton = document.getElementById("increase_scroll_button")
    decreaseButton.addEventListener("click", () => decreaseProjects())
    increaseButton.addEventListener("click", () => increaseProjects())

    function decreaseProjects(){
        if (projectsStart !== 0){
            projectsContainer.innerHTML= ''
            projectsStart = projectsStart - 1
            projectsEnd = projectsEnd - 1
            projects.slice(projectsStart,projectsEnd).forEach(renderProject)
        }
        
    }

    function increaseProjects(){
        console.log(projectsEnd)
        console.log(projects.length)
        if (projectsEnd !== projects.length){
            projectsContainer.innerHTML= ''
            projectsStart = projectsStart + 1
            projectsEnd = projectsEnd + 1
            projects.slice(projectsStart,projectsEnd).forEach(renderProject)
        }
        
    }
    
    projects.slice(projectsStart,projectsEnd).forEach(renderProject)

    function meOrNotToggle(){
        const meOrNotImg = document.getElementById("meOrNot")
        if (!meOrNot) {
            meOrNot = true
            meOrNotImg.attributes.src.value = "images/me.png"
        } else {
            meOrNot = false
            meOrNotImg.attributes.src.value = "images/me.svg"
        }

    }

    const contact = document.getElementById("contact")
    contact.addEventListener('click', () => scrollToContact())

    function scrollToContact(){
        const contact = document.getElementById("contact_reach_out")
        contact.scrollIntoView()
    }

})

const projects = [
    {
        projectName : "Spot Check: Chicago",
        links : "https://spotcheckchicago.onrender.com/",
        description : "Application that utilizes google-maps-api to allow users to add, favorite, and review skatespots usings their real lattitude and longitude.",
        technologysUsed : [" Javascript", " React", " Ruby on Rails", " Sass", " Google Maps Api"],
        image : "images/spot_check-2.png",
    },
    {
        projectName : "HeirBnb",
        links : "https://www.youtube.com/watch?v=TOzLQ-lzTz8",
        description : "HeirBnb is a full-stack project spoofing AirBnb through the lens of A Song of Ice and Fire by George RR Martin.",
        technologysUsed : [" Javascript", " React", " Ruby on Rails"],
        image : "images/logo.jpg",
    },
    {
        projectName : "4LW Notes",
        links : "https://github.com/jedwardmook/phase-3-sinatra-react-project-frontend",
        description : "An application to keep daily notes at 4LW coffee shop. Employees can create and log notes of day to day activities at a coffee shop.",
        technologysUsed : [" Javascript", " React", " Sinatra"],
        image : "images/home.gif",
    },
    {
        projectName : "Spot Check",
        links : "https://www.youtube.com/watch?v=hpDgLU6HpMg&t=1s",
        description : "Application that utilizes google-maps-api to allow users to add, favorite, and review skatespots usings their real lattitude and longitude.",
        technologysUsed : [" Javascript", " React"],
        image : "images/spot_check.png",
    }
]






