const gallery_container = document.querySelector(".gallery-container");

gallery_container.addEventListener("click", (e) => {

    const button =  e.target.classList.contains("button")
    const card = e.target.parentNode;

    if (button){ 
        const modal_title = document.querySelector("#exampleModalLongTitle");
        modal_title.textContent = card.dataset.title

        const modal_img = document.querySelector(".card-img-top")
        modal_img.src = card.dataset.img;

        const modal_description = document.querySelector("#modal-description")
        modal_description.textContent = card.dataset.description;

        const modal_git_link = document.querySelector("#modal-git-link");
        modal_git_link.href = card.dataset.github;
    }

})