const gallery_container = document.querySelector(".gallery-container");

function createSvgIcons(card) {
    const techArray = card.dataset.technologies.split(",");
    const svgNS = "http://www.w3.org/2000/svg"; // Aggiungi namespace SVG
    const xlinkNS = "http://www.w3.org/1999/xlink"; // Aggiungi namespace xlink
    const modal_technologies = document.querySelector("#modal-technologies");
    const modal_technologies_svg_container = document.createElement("div");
    techArray.forEach(element => {
        // Create SVG
        const svg = document.createElementNS(svgNS, "svg");
        svg.classList.add("svgIcon", "svgIconLeftModal");
        
        //Create use
        const use = document.createElementNS(svgNS, "use");
        use.setAttributeNS(xlinkNS, "xlink:href", `#icon-${element}`);

        svg.appendChild(use);

        modal_technologies_svg_container.append(svg)
        
        modal_technologies.append(modal_technologies_svg_container);


    });
}

const project = document.createElement("span");

gallery_container.addEventListener("click", (e) => {

    const button =  e.target.classList.contains("button")
    const card = e.target.parentNode;
    const modal_technologies = document.querySelector("#modal-technologies");
    const projectTypeText = document.querySelector("#ProjectType");


    if (button){
        const modal_title = document.querySelector("#exampleModalLongTitle");
        modal_title.textContent = card.dataset.title

        project.innerHTML = "";
        project.textContent = card.dataset.projectype;
        projectTypeText.append(project);

        const modal_img = document.querySelector(".card-img-top")
        modal_img.src = card.dataset.img;
        modal_img.alt = card.dataset.alt;

        modal_technologies.innerHTML = '';

        const technologiesTitle = document.createElement("p")
        technologiesTitle.textContent = "Technologies";
        modal_technologies.append(technologiesTitle);
        
        createSvgIcons(card);
        
        const modal_description = document.querySelector("#modal-description")
        modal_description.textContent = card.dataset.description;

        const modal_git_link = document.querySelector("#modal-git-link");
        modal_git_link.href = card.dataset.github;
    }

})