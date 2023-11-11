document.addEventListener("DOMContentLoaded", () => {

    let initial_hero_project = projects[0]

    function renderHeroProject(project){
        const { project_name, url, description, technologysUsed, image} = project
        const heroContainer = document.getElementById("hero_project_container")
        const heroProject = document.createElement("div");
        heroProject.id = "hero_project";
        heroProject.innerHTML =`
            <div id="hero_project_info">
              <h4 id="hero_project_key">Project Name:</h4><p class="hero_project_value"> ${project_name}<p>
              <h4 id="hero_project_key">Link:</h4><a href="${url}" class="hero_project_value">${url}</a>
              <h4 id="hero_project_key_desc">Description:</h4><p class="hero_project_value"> ${description}<p>
              <h4 id="hero_project_key">Technologies Used:</h4><p class="hero_project_value"> ${project.technologysUsed}<p>
            </div>
            <div>
                <img src=${image} alt="${project_name} logo" id="hero_project_image"/>
            </div>`;
    
    heroContainer.append(heroProject);
    } 
    
    renderHeroProject(initial_hero_project)
    
})

const projects = [
    {
        project_name : "Spot Check: Chicago",
        url : "https://spotcheckchicago.onrender.com/",
        description : "Application that utilizes google-maps-api to allow users to add, favorite, and review skatespots usings their real lattitude and longitude.",
        technologysUsed : [" Javascript", " React", " Ruby on Rails", " Sass", " Google Maps Api"],
        image : "images/spot_check-2.png",
    }
]






