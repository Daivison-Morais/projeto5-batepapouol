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
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants")
    promise.then(participantes)
    promise.catch(semParticipantes)
    conexaoSistema()   
    buscarMensagens()
}

function participantes(resposta){
    console.log("participantes carregados!")
}
function semParticipantes (resposta){
    alert("Não foi possível carregar lista de participantes")
    perguntaNome()
}

function alertarErro(error){
    if(error.response.status === 400){
        alert("Nome já existente");
        perguntaNome()
    }
}


function buscarMensagens() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    console.log(promise)
    promise.then(popularMensagens);
    
}
setInterval(buscarMensagens, 3000)


function popularMensagens(resposta){
   listaDados = resposta.data
   renderizarMensagens();
}

function renderizarMensagens() {
    const ulareaconversa = document.querySelector(".areaconversa");
    ulareaconversa.innerHTML = "";

    for (let i = 0; i < listaDados.length; i++) {
        //cor cinza
        if (listaDados[i].type === "status") {
            ulareaconversa.innerHTML += `
        <li class="corcinza caixaconversa">
        <div class="textoconversa">
            <span class="tempo">(${listaDados[i].time})</span>
            <span class="nomeetodos"> ${listaDados[i].from}</span>
            <span>${listaDados[i].text}</span>
        </div>
        </li>
        `;
        }

        //cor branca
        if (listaDados[i].type === "message") {
            ulareaconversa.innerHTML += `
        <li class="caixaconversa">
        <div class="textoconversa">
            <span class="tempo">(${listaDados[i].time})</span>
            <span class="nomeetodos"> ${listaDados[i].from}</span>
            <span class="margin">para</span>
            <span class="nomeetodos"> ${listaDados[i].to}:</span>
            <span class="quebra">${listaDados[i].text}</span>
        </div>
        </li>
        `;
        }

        //cor rosa
        if (listaDados[i].type === "private_message" && listaDados[i].to === nome) {
                ulareaconversa.innerHTML += 
                `
                <li class="corrosa caixaconversa">
                    <div class="textoconversa">
                        <span class="tempo">(${listaDados[i].time})</span>
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

function postarMensagem(elemento) {
    const mensagemEscrita = document.querySelector(".input").value;
    const mensagemObjeto =
    {
        from: nome,
        to: "Todos",
        text: mensagemEscrita,
        type: "message",
    }
    //message
    //private_message

    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagemObjeto)
    promise.then(envioConfirmado)
    promise.catch(naoEnviado)
   notificacaoEnvio()
}

function notificacaoEnvio(){
    const notf = document.querySelector(".notificacaoenvio")
    notf.classList.remove("escondido")
}

function tempoNotificacao(){
    const notf = document.querySelector(".notificacaoenvio")
    notf.classList.add("escondido")
}

function envioConfirmado(resposta) {
    console.log("foi enviado")
    const input = document.querySelector(".input").value = ""
    e = 0;
    buscarMensagens()
    tempoNotificacao()
}

function naoEnviado(resposta) {
    alert()
    console.log("Não enviada")
    window.location.reload()
}

function telaescolha(elemento){
const conteudo = document.querySelector(".telaestado2")
conteudo.classList.remove("escondido")
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
    console.log("desconectado")
    alert("Você foi desconectado")
    perguntaNome()
}