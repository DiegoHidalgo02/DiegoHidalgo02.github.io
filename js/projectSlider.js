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