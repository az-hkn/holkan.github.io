class Interfaz{

     constructor() {
          this.init();
     }
     init() {
          this.construirSelect();
     }


     construirSelect() {
          cotizador.obtenerMonedasAPI()
               .then(monedas => {
                    // Crear un select con las opciones
                    const arregloMonedas = monedas.monedas;
                    const select = document.getElementById('criptomoneda');

                    // Construir SELECT desde la REST API
                    arregloMonedas.forEach(moneda => {
                         // añadir el ID y el valor, despues asignarlo al select
                         const option = document.createElement('option');
                         option.value = moneda.id;
                         option.appendChild(document.createTextNode(moneda.name));
                         select.appendChild(option);
                    })
               })
     }
     mostrarMensaje(mensaje, clases) {
          const div = document.createElement('div');
          div.className = clases;
          div.appendChild(document.createTextNode(mensaje));
          // Div para mensajes del html
          const divMensaje = document.querySelector('.mensajes');
          // agregamos el div a mensajes
          divMensaje.appendChild(div);

          // Desaparecer alerta despues de 3s
          setTimeout(() => {
               document.querySelector('.mensajes div').remove();
          }, 3000);
     }
     // Imprime el resultado de la Cotizacion
     mostrarResultado(resultado, moneda) {

          // En caso de que haya un resultado anterior borrarlo
          const resultadoAnterior = document.querySelector('#resultado > div');
          if(resultadoAnterior) {
               resultadoAnterior.remove();
          }

          // Muestra el spinner
          this.mostrarSpinner();
         
          // construir la etiqueta de precio segun la moneda
          const etiquetaMoneda = `price_${moneda}`;
          // leer el valor del resultado
          const valor = resultado[etiquetaMoneda];
          // Convierte el texto de la moneda a mayuscula
          const monedaUpper = moneda.toUpperCase();
          // Convierte la hora de UNIX a horas y minutos
          const hora = new Date(resultado.last_updated * 1000);
          const horaActualizada = `${hora.getHours()}:${hora.getMinutes()}`; 


          // Construir el Template
          let templateHTML = '';
          templateHTML += `
               <div class="card cyan darken-3">
                    <div class="card-content white-text">
                         <span class="card-title">Results:</span>
                         <p>The price of ${resultado.name} to ${monedaUpper} is: $ ${valor}</p>
                         <p>Last hour: ${resultado.percent_change_1h}</p>
                         <p>Last day: ${resultado.percent_change_24h}</p>
                         <p>Last 7 days: ${resultado.percent_change_7d}</p>
                         <p>Last update: ${horaActualizada} hours</p>
                    </div>
               </div>
          `;

          // Oculta el spinner y muestra el resultado
          setTimeout(() => {
               // Imprimir el resultado
               document.querySelector('#resultado').innerHTML = templateHTML;

               // Ocultar el spinner
               document.querySelector('.spinner img').remove();
          }, 3000);
     }

     // Muestra un spinner cuando se cotiza
     mostrarSpinner() {
          const spinnerGIF = document.createElement('img');
          spinnerGIF.src = 'img/spinner.gif';
          document.querySelector('.spinner').appendChild(spinnerGIF);
     }
}