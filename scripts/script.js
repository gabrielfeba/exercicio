const botaoEnviarProcessos = document.querySelector("#botaoEnviarProcessos");
const botaoLinhaDeTempo = document.querySelector("#botaoLinhaDeTempo");
const inputProcessos = document.querySelector(".inputProcessos");
const divLinhaTempo = document.querySelector(".divLinhaTempo");
const COSTANT_ESPACO_VAZIO = "?";

let listaDeProcessosDigitadosPeloUsuario = [];
let processoEntranoNaMemoria;
let processou;

botaoEnviarProcessos.onclick = () => {
    usuarioEnvioProcessos()
    atualizarProcessosNaLinhaDeTempo();
};

botaoLinhaDeTempo.onclick = () => {
    retirarProcessoDosQueEstaoEsperando();
    processarProcesso();
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

function retirarProcessoDosQueEstaoEsperando() {
    const primeiroDaFila = document.querySelector(".divLinhaTempo>button:first-child");
    processoEntranoNaMemoria = primeiroDaFila.innerHTML;
    primeiroDaFila.remove();
}

function processarProcesso() {
    const listaDeVagasNaMemoria = document.querySelectorAll(".vagaMemoria");
    processou = false;
    verifificarSeProcessoEstaNaMemoriaJa(listaDeVagasNaMemoria, processoEntranoNaMemoria);
    inserirEmMemoriaVazia(listaDeVagasNaMemoria, processoEntranoNaMemoria);
    inserirSePossuiAlgumProcessoQueNaoSeraExecutadoNovamente(listaDeVagasNaMemoria, processoEntranoNaMemoria);
    inserirNoRegistroQueMaisVaiDemorar(listaDeVagasNaMemoria, processoEntranoNaMemoria);
}

function verifificarSeProcessoEstaNaMemoriaJa(listaDeVagasNaMemoria, processoEntranoNaMemoria) {
    listaDeVagasNaMemoria.forEach(item => {
        if(item.innerHTML === processoEntranoNaMemoria) {
            console.log("Fluxo Verificar Se Processo Esta Na Memoria Ja");
            processou = true;
        }
    });
}

function inserirEmMemoriaVazia(listaDeVagasNaMemoria, processoEntranoNaMemoria) {
    if(!processou) {
        for(let item of listaDeVagasNaMemoria) {
            if(!processou && item.innerHTML === COSTANT_ESPACO_VAZIO) {
                console.log("Fluxo Inserir Em Memória Vazia " + item.innerHTML + " para " + processoEntranoNaMemoria);
                item.innerHTML = processoEntranoNaMemoria;
                processou = true;
                return;
            }
        }
    }
}

function inserirSePossuiAlgumProcessoQueNaoSeraExecutadoNovamente(listaDeVagasNaMemoria, processoEntranoNaMemoria) {
    if(!processou) {
        for(let item of listaDeVagasNaMemoria) {
            if(!verificaSeExisteProcessoNaFila(item.innerHTML)) {
                console.log("Fluxo Nao Sera Executado Novamente " + item.innerHTML + " para " + processoEntranoNaMemoria);
                item.innerHTML = processoEntranoNaMemoria;
                processou = true;
                return;
            }
        }
    }
}

function verificaSeExisteProcessoNaFila(processoFila) {
    const fila = document.querySelectorAll(".divLinhaTempo>button");
    for(let item of fila) {
        if(item.innerHTML === processoFila) {
            return true;
        }
    };
    return false;
}

function inserirNoRegistroQueMaisVaiDemorar(listaDeVagasNaMemoria, processoEntranoNaMemoria) {
    if(!processou) {
        let listaDeIndices = []
        for(let indice in listaDeVagasNaMemoria) {
            listaDeIndices.concat(verificarNaFilaOndeEstaProximoProcesso(listaDeVagasNaMemoria[indice], indice));
        }

        let valorIndiceMaior = listaDeIndices[0];
        let indiceIndice = 0;
        for(let indice in listaDeIndices) {
            if(valorIndiceMaior < listaDeIndices[indice]) {
                valorIndiceMaior = listaDeIndices[indice];
                indiceIndice = indice;
            }
        }
        listaDeVagasNaMemoria[indiceIndice].innerHTML = processoEntranoNaMemoria;
        processou = true;
        console.log("Fluxo Inserir No Registro que Mais Vai Demorar " + listaDeVagasNaMemoria[indiceIndice].innerHTML + " para " + processoEntranoNaMemoria);
    }
}

function verificarNaFilaOndeEstaProximoProcesso(valorVagaNaMemoria, indiceNaMemoria) {
    const fila = document.querySelectorAll(".divLinhaTempo>button");
    for(let indice in fila) {
        if(fila[indice].innerHTML === valorVagaNaMemoria) {
            return indiceNaMemoria;
        }
    }
}