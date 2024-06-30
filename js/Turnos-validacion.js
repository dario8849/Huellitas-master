const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input'); //esta constante almacenará un arraeglo de todos los inputs y ahora accedo a ellos
const select = document.getElementById('tipo-mascota');

const expresiones = {
	nombreApellido: /^[a-zA-ZÀ-ÿ\s]{3,30}$/,    // Letras y espacios, pueden llevar acentos.
	email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, //  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/              // 7 a 14 numeros.
};

// Inicializamos los campos con false por defecto 
const campos = {
    nombre: false,
    apellido: false,
    email: false,
    telefono: false,
    tipoMascota: false,
    fecha: false,
    hora:false
}

const validarFecha = (fecha) => {
    // Convierte la cadena de fecha en un objeto Fecha
    const fechaTurno = new Date(fecha);
    
    //obtenemos la fecha del día en que se esta solicitando el turno, es decir el día de hoy
    const diaDelTurno = fechaTurno.getDate()+1;
    console.log("día de la fecha del turno " + diaDelTurno);
    
    // Obtiene la fecha de mañana
    const fechaManana = new Date();
    fechaManana.setDate(fechaManana.getDate() + 1);

    const manana = fechaManana.getDate();

    console.log("fechaManana " + fechaManana.getDate());
    console.log("fechaTurno " + fechaTurno.getDate());
    console.log("manana " + manana);


    // Comprueba si la fecha seleccionada es posterior o igual a la fecha de mañana
    // ya que solo se será válido obtener turnos a partir del día posterior al día en que el usuario lo está solicitando
    if (diaDelTurno >= manana) {
        // Obtiene el día de la semana (0 para el Lunes, 1 para el martes, ..., 6 para el Domingo)
        const diaDeLaSemana = fechaTurno.getDay();
        console.log("dia de la semana " + diaDeLaSemana);
        // Comprobar si la fecha seleccionada es de lunes a sábado (diaDeLaSemana 0 a 5)
        return diaDeLaSemana !== 6;
    } else {
        console.log("fechaManana = " + fechaManana);
        console.log("fechaTurno = " + fechaTurno);
        //console.log("diaDeLaSenana = " + diaDeLaSemana);
        return false; // La fecha seleccionada es anterior al día siguiente, por lo que no es válida
    }
};

const validarHora = (hora) => {
    // separamos el string hora para obtener horas y minutos.
    const [horas, minutos] = hora.split(':').map(Number);
    // Comprobamos si los minutos son 0 o 30
    const minutosValidos = minutos === 0 || minutos === 30;

    // Comprobamos si las horas están dentro del rango permitido (9:00 a.m. - 7:30 p.m.)
    const horasValidas = (horas >= 9 && horas <= 19) && !(horas === 19 && minutos > 30);
    
    return minutosValidos && horasValidas;
};


console.log( "esto es campos.tipoMascota dentro de la funcion " + campos.tipoMascota);
document.addEventListener('DOMContentLoaded', function() {

    const validarSelect = (elementoSelect) => {
        elementoSelect.addEventListener('change', function() {
            const opcionSelecionada = this.options[this.selectedIndex]; 
            console.log("El opcionSelecionada.value tiene el valor de " + opcionSelecionada.value);
            
            if (opcionSelecionada.value !== "") {
                campos.tipoMascota = true;
                console.log("En este caso campos.tipoMascota asume el valor " + campos.tipoMascota + " es decir no está vacío");
            } else {
                campos.tipoMascota = false;
                console.log("En este caso campos.tipoMascota asume el valor " + campos.tipoMascota + " es decir Está vacío y el usuario no ha seleccionado nada");
                document.getElementById('grupo__mascota').classList.add('formulario__mensaje-error-texto-activo');
                document.getElementById('grupo__mascota').classList.add('formulario__campos-error');
            }
        });
    };

    validarSelect(select); // llamamos a la función
    
});
 
//console.log("En este caso campos.tipoMascota asume el valor " + campos.tipoMascota + " es decir  que si el valor no es una mascota en particular, el select estará vacío y el usuario no ha seleccionado nada");


const validarFormulario = (e) => {
    //para identificar cuál es el campo que queremos validar oportunamente
    switch(e.target.name){
        case "nombre":
            validarCampo(expresiones.nombreApellido, e.target, 'nombre');            
        break;
        case "apellido":
            validarCampo(expresiones.nombreApellido, e.target, 'apellido');  
        break;
        case "email":
            validarCampo(expresiones.email, e.target, 'email');
        break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono');
        break;
    };

        // Validación del Input fecha
    if (e.target.id === 'fecha') {
        if (!validarFecha(e.target.value)) {
            //console.log("!validarFecha(e.target.value) = " + !validarFecha(e.target.value));
            document.getElementById('grupo__fecha').classList.add('formulario__campos-error');
            document.getElementById('grupo__fecha').classList.add('formulario__mensaje-activo');
            campos['fecha'] = false;
            //console.log(" acá da falso la funcion fecha, es decir ha seleccionado un día domingo (0 = false)" + campos['fecha'] + " valor " + e.target.value);
            
        } else {
            document.getElementById('grupo__fecha').classList.remove('formulario__campos-error');
            document.getElementById('grupo__fecha').classList.remove('formulario__mensaje-activo');
            campos['fecha'] = true;
            //console.log(" acá da true la funcion fecha, es decir ha seleccionado un día hábil (1 a 6 = true)" + campos['fecha'] + " valor " + e.target.value);
        }
    }

    // Validación del Input Hora
    if (e.target.id === 'hora') {
        if (!validarHora(e.target.value)) {
            document.getElementById('grupo__hora').classList.add('formulario__campos-error');
            document.getElementById('grupo__hora').classList.add('formulario__mensaje-activo');
            campos['hora'] = false;
            //console.log(" acá da falso la funcion hora, es decir ha seleccionado un horario NO permitido, es decir q no es un horario en punto ni y media " + campos['hora'] + " valor " + e.target.value);
            console.log(campos);
        } else {
            document.getElementById('grupo__hora').classList.remove('formulario__campos-error');
            document.getElementById('grupo__hora').classList.remove('formulario__mensaje-activo');
            campos['hora'] = true;
            //console.log(" acá da VERDADERO la funcion hora, es decir ha seleccionado un horario PERMITIDO, es decir q es un horario en punto O media " + campos['hora'] + " valor " + e.target.value);
        }
    }

};


const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){   // acá se evalua si la expresión ingresada por el usurio es válida
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__campos-error'); //Esto es para que remueva la clase de error el el input luedo de haber habido un error(o sea es para "resetear el estado del campo" y mantiene lo actualizado para cada vez que borremos información que haya sido erronea en el enput y no tener que andar actualizando continuamente el navegador)
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__mensaje-activo');
        campos[campo] = true;
        console.log(campos);
    } else {  // esto ocurrirá si la expresión ingresada por el usuario NO es válida
        document.getElementById(`grupo__${campo}`).classList.add('formulario__campos-error'); //ojo acá ver si no falta alguna etiqueta!
        document.getElementById(`grupo__${campo}`).classList.add('formulario__mensaje-activo'); // ojo ver esto!! la función no agrega esta clase!!!
        campos[campo] = false;
        console.log(campos);
    }
};

//esta función se ejecutará por cada uno de los inputs de nuestra página. Es para comprobar cuando el usuario se encuentre escribiendo adentro de un input y salga del input o dé un click afuera del input.
//cuando el usuario esté ingresado datos en los input y deje de apretar la tecla se ejecutará la funcion validar formulario. O sea se ejecutará por cada letra que apriete o click que haga afuera de los campos(salga afuera de los mismos).
inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario); 
    input.addEventListener('blur', validarFormulario);
});


formulario.addEventListener('submit', (e)=> {
    e.preventDefault();    ////esta funcion es para que el usurio no envíe los datos dejando campos sin completar. Lo que hace es evitar que el formulario envíe los datos al apretar el boton si no se han completado todos los campos. O sea no deja que se envíen los datos al apretar el botón tipo submit
    if( campos.nombre && campos.apellido && campos.email && campos.telefono && campos.fecha && campos.hora && campos.tipoMascota) {
        formulario.reset()
        console.log("Se validó todo con éxito  !!!!");

        document.getElementById('grupo__mascota').classList.remove('formulario__mensaje-error-texto-activo');
        document.getElementById('grupo__mascota').classList.remove('formulario__campos-error'); //ojo acá ver si no falta alguna etiqueta!        //document.getElementById('grupo__mascota').classList.remove("formulario__campos-error-select");

        document.getElementById('formulario__mensaje-error').classList.remove('formulario__mensaje-error-texto-activo');
        document.getElementById('formulario-msj-exito').classList.add('formulario-msj-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario-msj-exito').style.display = 'none';
        }, 3000);
        console.log("campos.tipoMascota tiene el valor " + campos.tipoMascota);
    } else {
        console.log(" Algo no se validó correctante  !!!!");
        //document.getElementById('grupo__mascota').classList.add('formulario__campos-error-select');
        document.getElementById('grupo__mascota').classList.add('formulario__mensaje-error-texto-activo');
        document.getElementById('grupo__mascota').classList.add('formulario__campos-error');

        document.getElementById('formulario-msj-exito').classList.remove('formulario-msj-exito-activo');
        document.getElementById('formulario__mensaje-error').classList.add('formulario__mensaje-error-texto-activo');
        console.log("campos.tipoMascota tiene el valor " + campos.tipoMascota);
    }
});

