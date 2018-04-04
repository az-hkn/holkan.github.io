class Cotizador {
     //call all JSON cryptocurrency
     async obtenerMonedasAPI(){
          //Fetch to the API
          const urlObtenerMonedas = await fetch('https://api.coinmarketcap.com/v1/ticker/');
          
          //response all cryptocurrency in JSON format 
          const monedas = await urlObtenerMonedas.json();
         
          return{
               monedas
          }

     }

     async obtenerValores(moneda, criptomoneda){
          const urlConvertir = await fetch(`https://api.coinmarketcap.com/v1/ticker/${criptomoneda}/?convert=${moneda}`);

          const result = await urlConvertir.json();

          return{
               result
          }
     }
}