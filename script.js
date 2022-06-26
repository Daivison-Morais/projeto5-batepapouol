let listaDados;
let nome;
let novoNome;
let e = 0;

perguntaNome()
function perguntaNome() {
    nome = prompt("Qual o seu nome?")
    salvarNome()
}

function salvarNome() {
     novoNome =
    {
        name: nome
    }

    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", novoNome)
    promise.then(alertaAcerto)
    promise.catch(alertarErro)
}

function alertaAcerto(acerto){
    console.log("nome cadastrado")
    
    conexaoSistema()   
buscarMensagens()
}

function alertarErro(error){
    if(error.response.status === 400){
        alert("Nome já existente");
        perguntaNome()
    }
perguntaNome()
}


function buscarMensagens() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    console.log(promise)
    promise.then(popularMensagens);
    setTimeout(buscarMensagens, 3000)
}

function popularMensagens(resposta){
   listaDados = resposta.data
   renderizarMensagens();
  
}

function renderizarMensagens() {
    const ulareaconversa = document.querySelector(".areaconversa");
    ulareaconversa.innerHTML = "";
    let i;
    for (i = 0; i < listaDados.length; i++) {
        
        if (listaDados[i].type === "status") {
            ulareaconversa.innerHTML += `
        <li class="corcinza caixaconversa">
        <div class="tempo">${listaDados[i].time}</div>
        <div class="textoconversa">
            <span class="nomeetodos"> ${listaDados[i].from}</span>
            <span class="">${listaDados[i].text}</span>
        </div>
        </li>
        `;
        }

        if(listaDados[i].type === "message"){
            ulareaconversa.innerHTML += `
        <li class="caixaconversa">
        <div class="tempo">${listaDados[i].time}</div>
        <div class="textoconversa">
            <span class="nomeetodos"> ${listaDados[i].from}</span>
            <span class="margin">para</span>
            <span class="nomeetodos"> ${listaDados[i].to}:</span>
            <span class="">${listaDados[i].text}</span>
        </div>
        </li>
        `;
        }
        if(listaDados[i].type === "private_message"){
            ulareaconversa.innerHTML += `
        <li class="corrosa caixaconversa">
        <div class="tempo">(${listaDados[i].time})</div>
        <div class="textoconversa">
            <span class="nomeetodos"> ${listaDados[i].from}</span>
            <span class="margin">reservadamente para</span>
            <span class="nomeetodos"> ${listaDados[i].to}:</span>
            <span class="quebra">${listaDados[i].text}</span>
        </div>
        </li>
        `;
        }
    }
    mostraPrimeiraMensagem()    
}

function mostraPrimeiraMensagem() {
    e = e + 1;
    if (e <= 1) {
        const element = document.body
        element.scrollIntoView(!true)
    }

}

function conexaoSistema() {
    novoNome =
    {
        name: nome
    }
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", novoNome)
    promise.then(estaConectado)
    promise.catch(desconectado)
    setTimeout(conexaoSistema, 5000)

}
function estaConectado() {
    console.log("ainda conectado")
}
function desconectado() {
    console.log("ainda conectado")
}

function postarMensagem(elemento) {
    const mensagemEscrita = document.querySelector(".input").value;
    const mensagemObjeto =
    {
        from: nome,
        to: "cirilo",
        text: mensagemEscrita,
        type: "message",   
    }
    //message
    //private_message
    
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagemObjeto)
    promise.then(envioConfirmado)
    promise.catch(naoEnviado)
}

function envioConfirmado(resposta) {
    const input = document.querySelector(".input").value = ""
    buscarMensagens()
}

function naoEnviado(resposta) {
    console.log("Não enviada")
    window.location.reload()
}

function telaescolha(elemento){
const conteudo = document.querySelector(".telaestado2")
conteudo.classList.remove("escondido")
}