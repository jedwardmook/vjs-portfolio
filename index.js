document.addEventListener("DOMContentLoaded", () => {

    let initial_hero_project = projects[0]
    const heroProject = document.createElement("div");
    heroProject.id = "hero_project";
    const heroProjectViewer = document.createElement("div");
    heroProjectViewer.id = "none"


    const projectsContainer = document.getElementById('projects_container')

    const face = document.getElementById('face')
    face.addEventListener('click', () => meOrNotToggle())
    let meOrNot = true

    function renderHeroProject(project){
        const { projectName, links, description, technologysUsed, images} = project

        function heroProjectImageOnClick (){
            heroProjectViewer.id = "hero_project_viewer"
            heroProjectViewer.innerHTML = `
            <div id="viewer_image_background">
                <div><button id="close_button">&#10006</button></div>
                <div id="viewer_image_main>
                    <div id="viewer_image_div">
                        ${displayLargeImage(images[0])}
                    </div>
                    <div id="hero_project_images" >
                        ${displayAllImages(images)} 
                    </div>
                </div>
            </div>
            `
            heroProjectViewer.addEventListener('click', handleViewerContainerClick)
            heroContainer.append(heroProjectViewer)

            function displayLargeImage(image){
                const largeImageDiv = document.createElement("div")
                largeImageDiv.id = "viewer_image_div"
                largeImageDiv.innerHTML = `
                    <img src=${image.link} alt=${image.imageDescription} id="hero_project_viewer_image" />
                    <figcaption id="hero_project_viewer_description">${image.imageDescription}</figcaption>
                    <br />
                `
                return largeImageDiv.outerHTML;
            }
                
            function handleViewerContainerClick(e){
                if (e.target.id === 'close_button'){
                    heroProjectViewer.remove()
                }else if (e.target.id === "viewer_image_image"){
                    const largeImageDiv = document.getElementById('viewer_image_div');
                    largeImageDiv.innerHTML = displayLargeImage({
                        link: e.target.src, 
                        imageDescription: e.target.alt
                    })
                }
            }

            function displayAllImages(arr){
                let imagesHTML = ''
                arr.forEach(obj => {
                    const img = document.createElement('img');
                    img.id = "viewer_image_image";
                    img.src = obj.link;
                    img.alt = obj.imageDescription
                    imagesHTML += img.outerHTML
                })
                return imagesHTML
            }
        }

        const heroContainer = document.getElementById("hero_project_container")
        heroProject.innerHTML =`
            <div id="hero_project_info">
              <h4 id="hero_project_key">Project Name:</h4><p class="hero_project_value"> ${projectName}<p>
              <h4 id="hero_project_key_links">Links:</h4>
                <div id="links"></div>
              <h4 id="hero_project_key_desc">Description:</h4><p class="hero_project_value"> ${description}<p>
              <h4 id="hero_project_key">Technologies Used:</h4><p class="hero_project_value"> ${technologysUsed}<p>
            </div>
            <div id="hero_project_image_div">
                <img src=${images[0].link} alt="${projectName}" id="hero_project_image"/>
                <p id="more_photos">More images...</p>
            </div>`;
        heroContainer.append(heroProject);
        const linksContainer = document.getElementById('links')
        const heroProjectImage =  document.getElementById('hero_project_image_div')
        heroProjectImage.addEventListener('click', () => heroProjectImageOnClick())
        createList(links)
        function createList(arr){
            arr.forEach(obj => {
                const link = document.createElement('p');
                link.id = "project_link"
                for (const [key, value] of Object.entries(obj)){
                    link.innerHTML = `<p>${key}: <a href=${value}>${value}</a></p>`
                }
                linksContainer.append(link)
            })   
        }
        
    } 
    renderHeroProject(initial_hero_project)

    function renderProject(project){
        const {images, projectName} = project
        const projectCard = document.createElement("div")
        projectCard.id = "project_card";
        projectCard.addEventListener('click', () => {
            initial_hero_project = project
            renderHeroProject(initial_hero_project)
        })
        projectCard.innerHTML = `
            <img src=${images[0].link} alt="${projectName}" id="project_card_image" />
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
            meOrNotImg.attributes.src.value = "images/me_sketch.png"
        }
    }

    const contact = document.getElementById("contact")
    contact.addEventListener('click', () => scrollToContact())
    const contact2 = document.getElementById("nav_reach_out")
    contact2.addEventListener('click', () => scrollToContact())

    function scrollToContact(){
        const contact = document.getElementById('contactgram')
        contact.scrollIntoView({block:"end"})
    }

    document.getElementById("submit_button").addEventListener('click', sendMail())

    function sendMail(){
        document.getElementById("contact_form").addEventListener('submit', function(event) {
            event.preventDefault()
            const params = {
                contactName: document.getElementById('contactName').value,
                contactEmail: document.getElementById('contactEmail').value,
                messageSubject: document.getElementById('messageSubject').value,
                messageBody: document.getElementById('messageBody').value
            }
            const serviceID = "service_9s7vueh"
            const templateID = "template_9kwp1h4"
            if(params.contactName, params.contactEmail, params.messageSubject, params.messageBody !== ''){
            emailjs.send(serviceID, templateID, params)
                .then((response) => {
                    document.getElementById('contactName').value = '';
                    document.getElementById('contactEmail').value = '';
                    document.getElementById('messageSubject').value = '';
                    document.getElementById('messageBody').value = '';
                    console.log(response);
                    alert("Your message sent successfully");
                })
                .catch((err) => console.log(err));
            } else {
                console.log("Params needed")
                alert("All fields required");
            }
        })
    }

})

const projects = [
    {
        projectName : "Spot Check: Chicago",
        links : [
            {Website: "https://spotcheckchicago.onrender.com/"}, 
            {Walkthrough: "https://www.youtube.com/watch?v=QobCGprINfw&t=10s"}, 
            {Repo: "https://github.com/jedwardmook/spot-check-app-clone"}],
        description : "Application that utilizes google-maps-api to allow users to add, favorite, and review skatespots usings their real lattitude and longitude.",
        technologysUsed : [" Javascript", " React", " Ruby on Rails", " Sass", " Google Maps Api"],
        images : [
            {link: "images/SCC-main.jpg", imageDescription: "Collage of components of Spot Check - Chicago"}, 
            {link: "images/SCC-home.jpg", imageDescription: "Home page featuring spot markers and spot info div"}, 
            {link: "images/SCC-spot_page.jpg", imageDescription: "Spot page featuring info and images of spot"}, 
            {link: "images/SCC-reviews.jpg", imageDescription: "Close up of review section of spot page"}, 
            {link: "images/SCC-addspot.jpg", imageDescription: "UI of the add spot form"}]
    },
    {
        projectName : "HeirBnb",
        links : [{Walkthrough: "https://www.youtube.com/watch?v=TOzLQ-lzTz8"}, {Repo: "https://github.com/jedwardmook/phase-4-project"}],
        description : "HeirBnb is a full-stack project spoofing AirBnb through the lens of A Song of Ice and Fire by George RR Martin.",
        technologysUsed : [" Javascript", " React", " Ruby on Rails"],
        images : [
            {link: "images/HBNB-main.jpg", imageDescription : "Collage of components for HeirBnb"}, 
            {link: "images/HBNB-home.jpg", imageDescription : "Home pages featuring for cards for castle locations"}, 
            {link: "images/HBNB-location.jpg", imageDescription : "A location's page featuring its amenities and reviews"}, 
            {link: "images/HBNB-profile.jpg", imageDescription : "A user's profile page"}, 
            {link: "images/HBNB-editprofile.jpg", imageDescription : "UI for editing a user's profile page"}
        ]
    },
    {
        projectName : "4LW Notes",
        links : [{Walkthrough: "https://www.youtube.com/watch?v=--u0uSF--3I&t=25s"}, {Repo: "https://github.com/jedwardmook/phase-3-sinatra-react-project-frontend"}],
        description : "An application to keep daily notes at 4LW coffee shop. Employees can create and log notes of day to day activities at a coffee shop.",
        technologysUsed : [" Javascript", " React", " Sinatra"],
        images : [
            {link: "images/4LW-main.jpg", imageDescription : "Collage of components for 4LW Notes"},
            {link: "images/4LW-home.jpg", imageDescription : "Home page showing most recent notes and filtering abilities"},
            {link: "images/4LW-note.jpg", imageDescription : "Form for adding a not to the database"},
            {link: "images/4LW-employee.jpg", imageDescription : "Form for adding an employee to the database"},
        ]
    },
    {
        projectName : "Spot Check",
        links : [{Walkthrough: "https://www.youtube.com/watch?v=hpDgLU6HpMg&t=1s"}, {Repo: "https://github.com/jedwardmook/phase-2-project"}],
        description : "Application that utilizes google-maps-api to allow users to add, favorite, and review skatespots usings their real lattitude and longitude.",
        technologysUsed : [" Javascript", " React"],
        images : [{link: "images/SC-main.jpg", imageDescription : "Home page and logo"},
                {link: "images/SC-home.jpg", imageDescription : "Home page showing spots and filter options"},
                {link: "images/SC-spot.jpg", imageDescription : "Detailed view of a spot's page"},
                {link: "images/SC-add.jpg", imageDescription : "Add form for adding a spot"},
        ]
    },
    {
        projectName : "Simple Record Collector",
        links : [{Walkthrough: "https://www.youtube.com/watch?v=v9wsrlNCvCo&t=1s"}, {Repo: "https://github.com/jedwardmook/phase-1-project"}],
        description : "Simple Record Collector allows users to add albums to a virtual collection using the album's name, cover image, artist, genre, and year released. Users can search through their collection using the same attributes.",
        technologysUsed : [" Vanilla Javascript", " HTML", " CSS"],
        images : [{link: "images/SRC-home.jpg", imageDescription : "Home page showing record collection"},
                {link: "images/SRC-add.jpg", imageDescription : "Home page featuring the add album component"},
                {link: "images/SRC-search.jpg", imageDescription : "Home page featuring the search component"},
        ]
    }
]






