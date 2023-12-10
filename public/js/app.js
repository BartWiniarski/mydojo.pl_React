
// welcome logo fade out
document.addEventListener("DOMContentLoaded", (event) => {
    document.addEventListener("click", function () {
        const welcomeLogoEl = document.querySelector("#welcomelogo");
        const columnLeftEl = document.querySelector("#column-left");
        const columnRightEl = document.querySelector("#column-right");

        welcomeLogoEl.classList.add("logo-hide");
        setTimeout(function () {
            welcomeLogoEl.classList.add("d-none");
            columnLeftEl.classList.remove("d-none");
            columnRightEl.classList.remove("d-none");
            columnLeftEl.classList.add("text-hide");
            columnRightEl.classList.add("text-hide");
        }, 400);

        setTimeout(function (){
            columnLeftEl.classList.add("text-unhide");
            columnRightEl.classList.add("text-unhide");
            columnLeftEl.classList.remove("text-hide");
            columnRightEl.classList.remove("text-hide");
        },450);
    });
});