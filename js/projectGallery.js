const gallery_container = document.querySelector(".gallery-container");

function createSvgIcons(card) {
    const techArray = card.dataset.technologies.split(",");
    const svgNS = "http://www.w3.org/2000/svg"; // Aggiungi namespace SVG
    const xlinkNS = "http://www.w3.org/1999/xlink"; // Aggiungi namespace xlink

    techArray.forEach(element => {
        // Create SVG
        const svg = document.createElementNS(svgNS, "svg");
        svg.classList.add("svgIcon", "svgIconLeftModal");
        
        //Create use
        const use = document.createElementNS(svgNS, "use");
        use.setAttributeNS(xlinkNS, "xlink:href", `#icon-${element}`);

        svg.appendChild(use);
        
        document.querySelector("#modal-technologies").appendChild(svg)
    });
}

gallery_container.addEventListener("click", (e) => {

    const button =  e.target.classList.contains("button")
    const card = e.target.parentNode;

    if (button){
        const modal_title = document.querySelector("#exampleModalLongTitle");
        modal_title.textContent = card.dataset.title

        const modal_img = document.querySelector(".card-img-top")
        modal_img.src = card.dataset.img;

        document.querySelector("#modal-technologies").innerHTML = '';
        createSvgIcons(card);
        
        const modal_description = document.querySelector("#modal-description")
        modal_description.textContent = card.dataset.description;

        const modal_git_link = document.querySelector("#modal-git-link");
        modal_git_link.href = card.dataset.github;
    }

})