const slider_vs_container = document.querySelector(".slider-vs-container");
const slider_container = document.querySelectorAll(".slider-container");

const gallery_visualization = document.querySelector(".gallery-visualization");
const galleryOption = document.getElementById("gallery");

const sliderOption = document.getElementById("slider");
sliderOption.checked = true;


slider_vs_container.addEventListener("click", (e)=>{

    if(e.target.tagName.toLowerCase() === "input"){

        if(e.target.id === "gallery"){

            sliderOption.checked = false;
            slider_container.forEach(element => {
                element.style.display = "none";
            })
            gallery_visualization.style.display = "block";

        }else{

            gallery_visualization.style.display = "none";

            galleryOption.checked = false;

            slider_container.forEach(element => {
                element.style.display = "grid";
            })

        }


    }

})


const projects_content = document.getElementById("projects-content");

projects_content.addEventListener("click", e =>{

    const card_slider = e.target.parentNode;

    if(card_slider.classList.contains("slide")){

        const id_card_slider = card_slider.dataset.idformodal;

        console.log(id_card_slider);

        const card_gallery = document.getElementById(`gc-${id_card_slider}`);

        modal_compilation(card_gallery);

    }

})

