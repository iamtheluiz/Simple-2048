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