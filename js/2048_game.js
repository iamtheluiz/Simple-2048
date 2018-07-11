//Variáveis Globais do Jogo
var y = 4;  //Define o número de quadrados na altura 
var x = 4;  //Define o número de quadrados na largura (caso esse número seja alterado, é necessário modificar no arquivo 'css/style.css' o width da class '.quadrado', onde se encontra um calc com divisão pelo número de quadrados de largura (100%/4), só é necessária a modificação do denominador)
var tabuleiro = document.getElementById('tabuleiro');

function inicializar_tabuleiro(){
    //Inicializa um laço que passa por todos os quadrados
    for(var c = 1; c <= y; c++){
        for(var i = 1; i <= x; i++){
            //Cria um novo elemento div
            var quadrado = document.createElement('div');

            //Coloca os atributos que essa div possuirá
            quadrado.setAttribute('id','q'+c+'_'+i);
            quadrado.setAttribute('class','quadrado');

            //Adiciona a div dentro do tabuleiro
            tabuleiro.appendChild(quadrado);

            //Adicionar span para o quadrado
            var span = document.createElement('span');

            //Coloca os atributos da tag span
            span.setAttribute('id','n'+c+'_'+i);
            span.setAttribute('class','numeros');
            span.setAttribute('value','0');

            //Adiciona o span dentro do quadrado
            quadrado.appendChild(span);
        }
    }
}

function redimencionar_quadrados(){
    //Inicializa um laço que passa por todos os quadrados
    for(var c = 1; c <= y; c++){
        for(var i = 1; i <= x; i++){
            //Pega o quadrado atual em que o laço está passando
            var quadrado = document.getElementById('q'+c+"_"+i);

            //Escreve o value do span dentro do mesmo
            var span = document.getElementById('n'+c+"_"+i);
            span.innerHTML = span.getAttribute('value');

            //Guarda o width do quadrado e declara que o height é igual ao width
            var width = quadrado.style.width;
            quadrado.style.height = width;
        }
    }
}