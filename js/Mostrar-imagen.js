document.addEventListener("DOMContentLoaded", function() {
    const imagenInput = document.getElementById("foto-mascota");
    const imagenSubida = document.getElementById("imagen_subida");
    const verImagen = document.getElementById("ver_imagen");
    const label = document.querySelector('label[for="foto-mascota"]');

    imagenInput.addEventListener("change", function(event) {
        const archivo = event.target.files[0];
        if (archivo) {
            const leerArchivo = new FileReader();
            leerArchivo.onload = function(e) {
                imagenSubida.src = e.target.result;
                imagenSubida.style.display = "block";
                verImagen.style.display = "flex"; // Mostramos la imagen
                verImagen.style.justifyContent = "center";
                label.style.display = "none"; // Ocultamos el label
            };
            imagenSubida.classList.add("recuadroImagenSubida");
            leerArchivo.readAsDataURL(archivo);
        }
    });
});