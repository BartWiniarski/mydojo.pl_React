
// welcome logo fade out
document.addEventListener("DOMContentLoaded", (event) => {
    document.addEventListener("click", function () {
        const welcomeLogoEl = document.querySelector("#welcomelogo");
        const columnLandingEl = document.querySelector("#column-landing");

        welcomeLogoEl.classList.add("logo-hide");
        setTimeout(function () {
            welcomeLogoEl.classList.add("d-none");
            columnLandingEl.classList.remove("d-none");
            columnLandingEl.classList.add("text-hide");
        }, 400);

        setTimeout(function (){
            columnLandingEl.classList.add("text-unhide");
            columnLandingEl.classList.remove("text-hide");
        },450);
    });
});