window.addEventListener('scroll', function() {
    var btnWatsapp = document.getElementById('btn-watsapp');
    var btnUp = this.document.getElementById('btn-up');


    // Obtenemos la resolución de la pantalla del usuario.
    var screenWidth = window.screen.width;
    var screenHeight = window.screen.height;

    // Solo para mostrar la resolución en la consola.
    console.log("Ancho de la pantalla: " + screenWidth);
    console.log("Alto de la pantalla: " + screenHeight);


    // Obtenemos la posición actual en el eje Y del scroll y la almacenamos en una variable.
    var scrollY = window.scrollY || window.pageYOffset;

    // Determinamos en qué punto deseamos mostrar cada botón.
    //var showPositionWatsApp = 4850;
    var showPositionWatsApp = 1000;
    var showPositionUp = 200;

    if(screenWidth < 1300){
        // En base al ancho de la pantalla, agregamos o quitamos la clase al botón Wats App, según la posición del scroll.
        if (scrollY > showPositionWatsApp) {
            btnWatsapp.classList.add('mostrarWatsApp');
        } else {
            btnWatsapp.classList.remove('mostrarWatsApp');           
        }
    } else {
            // Agregamos o quitamos la clase al botón Wats App, según la posición del scroll.
        if (scrollY > showPositionWatsApp) {
            btnWatsapp.classList.add('mostrar');
        } else {
            btnWatsapp.classList.remove('mostrar');
        }
    }
    //Botón Up
    // Agregamos o quitamos la clase al botón Up, según la posición del scroll.
    if(scrollY > showPositionUp){
        btnUp.classList.add('mostrar');
    } else {
        btnUp.classList.remove('mostrar');
    } 
});