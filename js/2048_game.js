// Copyright (C) 2018  Luiz Gustavo da Silva Vasconcellos

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PART ICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>. 
////////////////////////////////////////////////////////////////////////////


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

    gerar_primeiros_numeros();
}

function redimencionar_quadrados(){
    //Inicializa um laço que passa por todos os quadrados
    for(var c = 1; c <= y; c++){
        for(var i = 1; i <= x; i++){
            //Pega o quadrado atual em que o laço está passando
            var quadrado = document.getElementById('q'+c+"_"+i);

            //Escreve o value do span dentro do mesmo
            var span = document.getElementById('n'+c+"_"+i);

            //Caso seja zero, ele não escreve nada
            if(span.getAttribute('value') == 0){
                span.innerHTML = '&nbsp;';
            }else{
                span.innerHTML = span.getAttribute('value');
            }

            //Guarda o width do quadrado e declara que o height é igual ao width
            var width = quadrado.style.width;
            quadrado.style.height = width;
        }
    }
}

function gerar_primeiros_numeros(){
    var qt = 2;     //Deve gerar dois números
    var pote = '';  //Guarda o ultimo campo que foi sorteado

    for(var c = 1; c <= qt; c++){

        //Pega um campo aleatório para colocar um número
        var x_c = Math.floor(Math.random() * x + 1);
        var y_c = Math.floor(Math.random() * y + 1);
        var campo_c = 'n'+y_c+'_'+x_c;

        if(c > 1){
            //Já existe um campo no "pote"
            if(pote == campo_c){
                //Selecionou o mesmo campo, o que não pode ocorrer

                c--;    //Faz a função se repetir mais uma vez

            }else{
                definir_numero(campo_c,0);
            }
        }else{
            definir_numero(campo_c,0);
        }

        //Guarda o campo selecionado
        pote = campo_c;
        
    }
}

function definir_numero(campo,num){

    //Campo que receberá o número
    var campo_n = document.getElementById(campo);

    //Verifica se o número passado é 0
    if(num == 0){
        //Gerar número aleatoriamente (2 ou 4)
        var o = Math.floor(Math.random() * 10 + 1);

        if(o / 5 > 1){
            //Número será 4
            campo_n.setAttribute('value',4);
            campo_n.innerHTML = campo_n.getAttribute('value');
        }else{
            //Número será 2
            campo_n.setAttribute('value',2);
            campo_n.innerHTML = campo_n.getAttribute('value');
        }

    }else{
        //Coloca o número que foi passado
        campo_n.setAttribute('value',num);
        campo_n.innerHTML = campo_n.getAttribute('value');
    }


}
function zerar_div(campo){
    //Campo que receberá o número
    var campo_n = document.getElementById(campo);

    campo_n.setAttribute('value',0);
    campo_n.innerHTML = '&nbsp;';
}

function mover_tabuleiro(evt){
    var tecla = evt.key;

    if(tecla == 'ArrowUp' || tecla == 'w'){
        //Todas as peças devem ir para o topo
        for(var qt = 1; qt <= x; qt++){
            empurrar_numeros('up');
        }
    }else if(tecla == 'ArrowRight' || tecla == 'd'){
        //Todas as peças devem ir para a direita
        for(var qt = 1; qt <= x; qt++){
            empurrar_numeros('right');
        }
    }else if(tecla == 'ArrowDown' || tecla == 's'){
        //Todas as peças devem ir para baixo
        for(var qt = 1; qt <= x; qt++){
            empurrar_numeros('down');
        }
    }else if(tecla == 'ArrowLeft' || tecla == 'a'){
        //Todas as peças devem ir para a esquerda
        for(var qt = 1; qt <= x; qt++){
            empurrar_numeros('left');
        }
    }
    
    gerar_novo_numero();
}

function empurrar_numeros(direcao){ //Direção

    if(direcao == 'up'){

        //Precisa passar por cada um dos quadrados
        for(var i = 1; i <= x; i++){        //Passando por todas as Linhas
            for(var c = 1; c <= y; c++){    //Passando pelas colunas de cada linha

                //O quadrado em que estamos
                var quad = document.getElementById('n'+c+'_'+i);

                //Verifica se é o primeiro quadrado da ponta
                if(c != 1){     //Não precisa passar pelo primeiro quadrado

                    //Verifica o valor do quadrado acima
                    if((c-1) == 0){
                        //Quadrado de cima não existe
                    }else{
                        quad_up = document.getElementById('n'+(c-1)+'_'+i);

                        if(quad_up.getAttribute('value') == 0 && quad.getAttribute('value') != 0){
                            //Mudam de lugar

                            definir_numero(quad_up.getAttribute('id'),quad.getAttribute('value'));

                            zerar_div(quad.getAttribute('id'));

                        }else if(quad_up.getAttribute('value') == quad.getAttribute('value') && quad.getAttribute('value') != 0){
                            //Faz a soma dos valores dos dois quadrados

                            definir_numero(quad_up.getAttribute('id'),parseInt(quad.getAttribute('value'))*2);

                            zerar_div(quad.getAttribute('id'));

                        }
                    }
                }
            }
        }
    }
    if(direcao == 'down'){

        //Precisa passar por cada um dos quadrados
        for(var i = 1; i <= x; i++){        //Passando por todas as Linhas
            for(var c = 4; c >= 1; c--){    //Passando pelas colunas de cada linha

                //O quadrado em que estamos
                var quad = document.getElementById('n'+c+'_'+i);
                console.log(quad);

                //Verifica se é o primeiro quadrado da ponta
                if(c != 4){     //Não precisa passar pelo primeiro quadrado

                    //Verifica o valor do quadrado acima
                    if((c+1) == 5){
                        //Quadrado de cima não existe
                    }else{
                        quad_up = document.getElementById('n'+(c+1)+'_'+i);

                        if(quad_up.getAttribute('value') == 0 && quad.getAttribute('value') != 0){
                            //Mudam de lugar

                            definir_numero(quad_up.getAttribute('id'),quad.getAttribute('value'));

                            zerar_div(quad.getAttribute('id'));

                        }else if(quad_up.getAttribute('value') == quad.getAttribute('value') && quad.getAttribute('value') != 0){
                            //Faz a soma dos valores dos dois quadrados

                            definir_numero(quad_up.getAttribute('id'),parseInt(quad.getAttribute('value'))*2);

                            zerar_div(quad.getAttribute('id'));
                            
                        }
                    }
                }
            }
        }
    }
    if(direcao == 'left'){

        //Precisa passar por cada um dos quadrados
        for(var c = 1; c <= y; c++){        //Passando por todas as colunas
            for(var i = 1; i <= x; i++){    //Passando pelas linhas de cada coluna

                //O quadrado em que estamos
                var quad = document.getElementById('n'+c+'_'+i);
                console.log(quad);

                //Verifica se é o primeiro quadrado da ponta
                if(i != 1){     //Não precisa passar pelo primeiro quadrado

                    //Verifica o valor do quadrado acima
                    if((i-1) == 0){
                        //Quadrado de cima não existe
                    }else{
                        quad_up = document.getElementById('n'+c+'_'+(i-1));

                        if(quad_up.getAttribute('value') == 0 && quad.getAttribute('value') != 0){
                            //Mudam de lugar

                            definir_numero(quad_up.getAttribute('id'),quad.getAttribute('value'));

                            zerar_div(quad.getAttribute('id'));

                        }else if(quad_up.getAttribute('value') == quad.getAttribute('value') && quad.getAttribute('value') != 0){
                            //Faz a soma dos valores dos dois quadrados

                            definir_numero(quad_up.getAttribute('id'),parseInt(quad.getAttribute('value'))*2);

                            zerar_div(quad.getAttribute('id'));
                            
                        }
                    }
                }
            }
        }
    }
    if(direcao == 'right'){

        //Precisa passar por cada um dos quadrados
        for(var c = 1; c <= y; c++){        //Passando por todas as colunas
            for(var i = y; i >= 1; i--){    //Passando pelas linhas de cada coluna

                //O quadrado em que estamos
                var quad = document.getElementById('n'+c+'_'+i);
                console.log(quad);

                //Verifica se é o primeiro quadrado da ponta
                if(i != 4){     //Não precisa passar pelo primeiro quadrado

                    //Verifica o valor do quadrado acima
                    if((i+1) == 5){
                        //Quadrado de cima não existe
                    }else{
                        quad_up = document.getElementById('n'+c+'_'+(i+1));

                        if(quad_up.getAttribute('value') == 0 && quad.getAttribute('value') != 0){
                            //Mudam de lugar

                            definir_numero(quad_up.getAttribute('id'),quad.getAttribute('value'));

                            zerar_div(quad.getAttribute('id'));

                        }else if(quad_up.getAttribute('value') == quad.getAttribute('value') && quad.getAttribute('value') != 0){
                            //Faz a soma dos valores dos dois quadrados

                            definir_numero(quad_up.getAttribute('id'),parseInt(quad.getAttribute('value'))*2);

                            zerar_div(quad.getAttribute('id'));
                            
                        }
                    }
                }
            }
        }
    }

}