$(document).ready(function() {
    //espera a que el DOM se cargue




    let contador;
    let velocidad;
    let cronometro;
    let segundos;
    let bolas = 0
    let domPanel = $('.panel h3');
    let eliminadas = 0;
    let txtBolasCreadas = $('#bolasCreadas');
    let txtBolasEliminadas = $('#bolasEliminadas');


    //jquery selector agrega un escuchador de eventos
    // y ejecuta la funcion de callback
    $('#poner').click(() => {
        bolas++;
        txtBolasCreadas.text(`Bolas Creadas : ${bolas}`);
        generarAdorno(getRandomArbitrary(100, 350));
    })


    $('#mover').click(function() {
        $(this).attr('disabled', 'true');
        $('#arbol').effect({
            effect: 'shake',
            duration: 1000,
            complete: function() {}
        })
        setTimeout(function() { borrarAleatorio() }, 100)
    })

    $('#jugar').click(function() {

        borrarTodo();

        $('#bolasCreadas').hide();
        $('#bolasEliminadas').hide();
        $('h3').text("");
        $('h3').show();



        $(this).attr('disabled', 'true');
        $('#dificultad').attr('disabled', 'true');
        cuentaAtras();
        setTimeout(function() { empezar() }, 6000)

    })

    //recarga la pagina.
    $('#reset').click(() => location.reload());

    //hay 10 imagenes
    function generarAdorno(num) {

        let d = new Date;

        let imgNueva = document.createElement('img')
        imgNueva.setAttribute('src', `./img/adorno${getRandomArbitrary(1, 11)}.png`);

        console.log(imgNueva);

        imgNueva.setAttribute('width', '50px')
        imgNueva.setAttribute('class', 'adorno')

        const id = d.getTime();
        imgNueva.setAttribute('id', `${id}`)

        document.querySelector('.contenedor').appendChild(imgNueva)

        let adorno = document.getElementById(`${id}`);
        adorno.addEventListener('click', pinchar);

        let top;
        if (num > 190 && num < 210) {
            // console.log('if1');
            top = `${getRandomArbitrary(5,85)}%`

        } else if (num > 150 && num < 220) {
            // console.log('if2');

            top = `${getRandomArbitrary(20,75)}%`

        } else if (num > 200 && num < 280) {
            // console.log('if3');

            top = `${getRandomArbitrary(40,75)}%`

        } else {
            // console.log('else');
            top = `${getRandomArbitrary(45,85)}%`
        }

        const imgDom = $(`#${id}`)
        imgDom.css({
            left: num
        }).animate({
            top: top

        }, 2000)



    }

    //genera un numero aleatorio pasados por parametros
    function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    //borra todo para inicio del juego
    function borrarTodo() {
        let img = document.querySelectorAll('.adorno');
        for (let i = 0; i < img.length; i++) {
            img.item(i).remove()
        }
        bolas = 0
        eliminadas = 0;
        txtBolasCreadas.text(`Bolas Creadas : ${bolas}`);
        txtBolasEliminadas.text(`Bolas Eliminadas : ${eliminadas}`);

    }

    //cuando muueves arbol,se caen un numero alatorio de bolas minimo 1, de las bolas que hay en el arbol.
    function borrarAleatorio() {
        let img = document.querySelectorAll('.adorno');
        let randomEliminar = getRandomArbitrary(1, img.length);

        for (let i = 0; i < randomEliminar; i++) img[i].setAttribute('value', 'borrar')


        let imgBorrar = document.querySelectorAll('.adorno[value="borrar"]');
        let length = imgBorrar.length;
        txtBolasEliminadas.text(`Bolas Eliminadas : ${eliminadas+=randomEliminar}`);

        const borrar = $('[value="borrar"]');
        borrar.animate({ top: '90%', }, 450);



        setTimeout(() => {
            for (let i = 0; i < length; i++) imgBorrar.item(i).remove();
            $('#mover').removeAttr('disabled');
        }, 1000)
    }

    //cuando pinchas la imagen la remueve del DOM y suma.
    function pinchar(e) {

        document.getElementById(e.target.id).remove();
        txtBolasEliminadas.text(`Bolas Eliminadas : ${eliminadas+=1}`);
    }

    function empezar() {

        contador = 450;
        const jugar = setInterval(() => {

            $('#poner').trigger('click');

            contador--;
            if (contador == 0 || cronometro === 0) clearInterval(jugar);
        }, velocidad)
    }

    function cuentaAtras() {

        dificultad();
        contador = 5;
        let panel = setInterval(() => {
                switch (contador) {
                    case 4:
                        domPanel.text('¡ Preparados !');
                        break;
                    case 3:
                        domPanel.text('¡ 3 !');
                        break;
                    case 2:
                        domPanel.text('¡ 2 !');
                        break;
                    case 1:
                        domPanel.text('¡ 1 !');
                        break;
                    case 0:
                        domPanel.text('¡ PINCHA LOS ADORNOS  Y MUEVE EL ARBOL !');
                        contador = 0;
                        clearInterval(panel);
                        tiempo();
                        break;
                }
                contador--;
            },
            1000)
    }

    function tiempo() {
        cronometro = 46;
        segundos = cronometro;

        let cuenta = setInterval(function() {
            cronometro--;

            if (cronometro < 0) {
                clearInterval(cuenta);

                domPanel.text(`Has Eliminado ${eliminadas} adornos en ${segundos} segundos`)
                borrarTodo();
                setTimeout(function() {


                    $('#bolasCreadas').show();
                    $('#bolasEliminadas').show();

                    $('h3').hide();

                }, 4000)

                $('#jugar').removeAttr('disabled');
                $('#dificultad').removeAttr('disabled');

            } else
                domPanel.text(`Quedan ${cronometro} segundos`);

        }, 1000)


    }

    function dificultad() {

        let nivel = document.getElementById('dificultad');

        switch (nivel.value) {
            case 'facil':
                velocidad = 800;
                break;
            case 'medio':
                velocidad = 550;
                break;
            case 'dificil':
                velocidad = 420;
                break;
            case 'imposible':
                velocidad = 235;
                break;
        }


    }


})