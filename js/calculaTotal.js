//Captura todas as encomendas
var pedidos = document.querySelectorAll(".pedido");

for (var i = 0; i < pedidos.length; i++){

    //captura a quantirade encomendada
    var quantidade = pedidos[i].querySelector(".quant").textContent;

    //Captura o valor unitário da encomenda
    var unitario =  pedidos[i].querySelector(".valor").textContent;   

    //Verifica se a quantidade é válida
    var quantOk = validaQuant(quantidade);
    var uniOk = validaUni(unitario);
    
    if(quantOk == false){
        //Quantidade inválida, avisa o usuário
        pedidos[i].querySelector(".quant").textContent = "Qtde inválida";
        pedidos[i].querySelector(".quant").style.color = "red";
        pedidos[i].querySelector(".total").textContent = "-"
    }else{
        //O valor total da encomenda
        total = calculaTotal(quantidade, unitario);
        pedidos[i].querySelector(".total").textContent = total;
        var totalFormat = conversao(parseFloat(total));
        pedidos[i].querySelector(".total").textContent = totalFormat;
    }

    if(uniOk == false){
        pedidos[i].querySelector(".valor").textContent = "VALOR INVÁLIDO";
        pedidos[i].style.background = "red"
        pedidos[i].querySelector(".total").textContent = "-"
    }else{
        //Converte o valor de string para float
        var precoFormat = conversao(parseFloat(unitario));
        //Aplica a função que coloca o R$
        pedidos[i].querySelector(".valor").textContent = precoFormat;
    }
}

//Função para cálculo do valor total
function calculaTotal(quantPedidos, unidProduto){
    var total = 0;

    total = quantPedidos * unidProduto;

    return total;
}

function validaQuant(qntde){
    
    if(qntde < 1 || isNaN(qntde)){
        var valid = false;  
        return valid;
    }else{
        var valid = true;
        return valid;
    }
}

function validaUni(uni){
    
    if(uni < 1 || isNaN(uni)){
        var valid = false;
        return valid;
    }else{
        var valid = true;
        return valid;
    }
}

function conversao(preco){
    var preco = preco.toLocaleString('pr-BR', {style: 'currency', currency: 'BRL'});
    return preco;
}
