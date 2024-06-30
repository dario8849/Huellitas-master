// scripts.js
document.addEventListener("DOMContentLoaded", function() {
    const popups = document.querySelectorAll(".popup");
    const popupOverlay = document.querySelector(".popup-overlay");
    const popupImage = document.querySelector(".popup-image");
    const closeBtn = document.querySelector(".close-btn");

    popups.forEach(popup => {
        popup.addEventListener("click", function() {
            const imageSrc = popup.getAttribute("data-image");
            popupImage.setAttribute("src", imageSrc);
            popupOverlay.style.display = "block";
        });
    });

    closeBtn.addEventListener("click", function() {
        popupOverlay.style.display = "none";
    });
});