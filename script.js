let listaDados;

buscarMensagens()

function buscarMensagens(){
const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
console.log(promise)
promise.then(popularMensagens);
}
function popularMensagens(resposta){
   listaDados = resposta.data
   renderizarMensagens();

}
function renderizarMensagens(){
    const ulareaconversa = document.querySelector(".areaconversa");
    ulareaconversa.innerHTML = "";
    for(let i=0; i < listaDados.length; i++){
        ulareaconversa.innerHTML += `
        <li class="caixaconversa">
        <div class="tempo">${listaDados[i].time}</div>
        <div class="textoconversa">${listaDados[i].text}</div>
        </li>
        `;
    }

   
}
