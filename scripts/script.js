let listaDeProcessosDigitadosPeloUsuario = [];
let listaDeProcessosEmExecução = []

const botaoEnviarProcessos = document.querySelector("#botaoEnviarProcessos");
const botaoLinhaDeTempo = document.querySelector("#botaoLinhaDeTempo");
const inputProcessos = document.querySelector(".inputProcessos");
const divLinhaTempo = document.querySelector(".divLinhaTempo");

botaoEnviarProcessos.onclick = () => {
    usuarioEnvioProcessos()
    atualizarProcessosNaLinhaDeTempo();
};

botaoLinhaDeTempo.onclick = () => {
    retirarProcessoDosQueEstãoEsperando();
};

function usuarioEnvioProcessos() {
    const conteudoInput = inputProcessos.value;
    listaDeProcessosDigitadosPeloUsuario = conteudoInput.split("");
}

function atualizarProcessosNaLinhaDeTempo() {
    listaDeProcessosDigitadosPeloUsuario.forEach(element => {
        divLinhaTempo.innerHTML += `<button type="button" class="btn btn-secondary">${element}</button>`;
    });
}

function retirarProcessoDosQueEstãoEsperando() {
    const primeiroDaFila = document.querySelector(".divLinhaTempo>button:first-child");
    primeiroDaFila.remove();
}

