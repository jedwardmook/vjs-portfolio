document.addEventListener("DOMContentLoaded", () => {
 

    let initial_hero_project = projects[0]

    function renderHeroProject(project){
        const { project_name, url} = project
        const heroContainer = document.getElementById("hero_project_container")
        const heroProject = document.createElement("div");
        heroProject.id = "hero_project";
        heroProject.innerHTML =`<h3>${project_name}<h3>`;
    
    heroContainer.append(heroProject);
    } 
    
    renderHeroProject(initial_hero_project)
    
})

const projects = [
    {
        project_name : "Spot Check: Chicago",
        url : "https://spotcheckchicago.onrender.com/"
    }
]






