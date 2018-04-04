class Interfaz {
     constructor(){
          this.construirSelect();
     }

     construirSelect(){
          cotizador.obtenerMonedasAPI()
               .then(data => {
                    //create options in Select
                    const arregloMonedas = data.monedas;
                    const select = document.getElementById('criptomoneda');

                    //Select from REST API
                    arregloMonedas.forEach(moneda => {
                         //Add ID & Value then move it to the Select
                         const option = document.createElement('option');
                         option.value = moneda.id;
                         option.appendChild(document.createTextNode(moneda.name));
                         select.appendChild(option);
                    });
               })
     }

     mostrarMensaje(mensaje, clases){
          const div = document.createElement('div');
          div.className = clases;
          div.appendChild(document.createTextNode(mensaje));
          //Div for msg in Html
          const divMensaje = document.querySelector('.mensajes');
          //Add Div into mensajes
          divMensaje.appendChild(div);
          //Remove alert after 3s
          setTimeout(() => {
               document.querySelector('.mensajes div').remove();
          }, 3000);
     }

     //Print comparision result 
     mostrarResultado(result, currency){

          //If there is a previous result remove
         const lastResult = document.querySelector('#resultado > div');
         if (lastResult) {
              lastResult.remove();
         }
          //Shows spinner
          this.ShowSpinner();
          // currency price
          const currencyTag = `price_${currency}`;
          // Read result value
          const value = result[currencyTag];
          const currencyUpper =  currency.toUpperCase();
          
          const hour = new Date(result.last_updated * 1000);
          const actualHour = `${hour.getHours()}: ${hour.getMinutes()}`;
          //Create template
          let templateHTML = '';
          templateHTML += `
               <div class="card cyan darken-3">
                    <div class="card-content white-text">
                         <span class="card-title"> Result: </span>
                         <p>The value of ${result.name} to currency ${currencyUpper} is:
                          ${value}</p>
                          <p>Last hour: ${result.percent_change_1h}</p>
                          <p>Last day: ${result.percent_change_24h}</p>
                          <p>Last 7 days: ${result.percent_change_1h}</p>
                          <p>Last hour: ${result.percent_change_7d}</p>
                          <p>Last actualization: ${actualHour}</p>
                          </div>
               </div>

               `;

          setTimeout(() => {
               //Shows result
               document.querySelector('#resultado').innerHTML = templateHTML;

               //Hide Spinner
               document.querySelector('.spinner img').remove();
          }, 3000);
          }

     //Shows spinner when finished
     ShowSpinner(){
          const spinnerGIF = document.createElement('img');
          spinnerGIF.src = 'img/spinner.gif';
          document.querySelector('.spinner').appendChild(spinnerGIF);
     }
}