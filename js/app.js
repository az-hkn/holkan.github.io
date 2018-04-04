//instance classes

const cotizador = new Cotizador();
const ui = new Interfaz();

//Read box
const form = document.getElementById('formulario');
//Event Listener in submit form
form.addEventListener('submit',(e)=> {
     e.preventDefault();

     //read selected coin
     const monedaSelect  = document.getElementById('moneda');
     const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;

     //read selected coin
     const criptomonedaSelect  = document.getElementById('criptomoneda');
     const criptomonedaSeleccionada = criptomonedaSelect.options[criptomonedaSelect.selectedIndex].value;
     
     //Check its filled
     if(monedaSeleccionada === '' || criptomonedaSeleccionada === ''){
          ui.mostrarMensaje('Both spaces are required','deep-orange darken-4 card-panel');
     } else{
     // If everything is right, read values of selectt and start
     cotizador.obtenerValores(monedaSeleccionada,criptomonedaSeleccionada)
          .then(data => {
               ui.mostrarResultado(data.result[0],monedaSeleccionada.toLowerCase())
             
          })
     }

})