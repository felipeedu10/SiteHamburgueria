/*function cadPedido(nome, valor, lanche, qtd){

    var tb = document.getElementById("tabPedidos");
    var qtdLinhas = tb.rows.length;
    var linha = tb.insertRow(qtdLinhas);
    
    var cellNome = linha.insertCell(0);
    var cellValor = linha.insertCell(1);
    var cellLanche = linha.insertCell(2);
    var cellQtd = linha.insertCell(3);
    var cellTotal = linha.insertCell(4);

    cellNome.innerHTML = nome;
    cellValor.innerHTML = valor;
    cellLanche.innerHTML = lanche;
    cellQtd.innerHTML = qtd;
    cellTotal.innerHTML = calculaTotal(qtd, valor);

}*/

var botaoAdicionar = document.querySelector("#botao-form");

botaoAdicionar.addEventListener("click", function(event){

    event.preventDefault();

    //Captura o formulário da página
    var form = document.querySelector("#formulario");

    //Captura os dados da nova encomenda
    var encomenda = obtemEncomenda(form);

    //Valida os dados do formulário
    var validacao = validaEncomenda(encomenda);

    //Valida se a encomenda pode ser inserida
    if(validacao.length > 0) {
        //Há erros de preenchimento, informa para o usuário
        exibeMensagensErro(validacao);

        return;
    } else {
        //Insere a nova encomenda na tabela
        addEncomenda(encomenda);

        //Limpa o formulário
        form.reset();

        //Limpa a lista de erros
        document.querySelector("#mensagens-erro").innerHTML = "";
    }
  
});

//Função para capturar os dados da nova encomenda
function obtemEncomenda(dadosForm){

    var encomenda = {
        nome: dadosForm.nome.value,
        qtde: dadosForm.qtd.value,
        produto: dadosForm.lanche.value,
        unitario: dadosForm.valor.value,
    }

    return encomenda;
}

//Função para adicionar a nova encomenda na tabela
function addEncomenda(novaEncomenda){

    var tabela = document.querySelector("#tab-pedidos");
    
    // Cria uma nova linha
    var novaLinha = montaTR(novaEncomenda);

    // Adiciona a classe 'linhas' à nova linha
    novaLinha.classList.add('linhas');

    tabela.appendChild(novaLinha);
}

//Monta uma coluna nova
function montaTD(dado) {

    var td = document.createElement("td");
    td.textContent = dado;

    return td;
}

//Monta uma nova TR
function montaTR(novaEncomenda){

    var tr = document.createElement("tr");

    tr.appendChild(montaTD(novaEncomenda.nome));
    tr.appendChild(montaTD(novaEncomenda.produto));
    tr.appendChild(montaTD(conversao(parseFloat(novaEncomenda.unitario))));
    tr.appendChild(montaTD(novaEncomenda.qtde));
    total = calculaTotal(novaEncomenda.qtde, novaEncomenda.unitario);
    tr.appendChild(montaTD(conversao(total)));

    return tr;
}

//Função para validação da quantidade e do unitário
function validaEncomenda(encomenda){

    var erros =[];

    //Verifica se o nome foi informado
    if(encomenda.nome=="") {
        erros.push("O nome não pode ser vazio!");
    }

    if(encomenda.produto=="") {
        erros.push("Escolha um lanche!");
    }

    //Verifica se a quantidade é maior que zero e um número
    if(encomenda.qtde <= 0 || isNaN(encomenda.qtde)){
        erros.push("A quantidade deve ser numérica e maior que 0.");
    }

    //Verifica se o valor unitário é maior que zero e um número
    if(encomenda.unitario <=0 || isNaN(encomenda.unitario)){
        erros.push("O valor unitário deve ser numérico e maior que 0.");
    }

    return erros;
}

//Função para exibir os erros de preenchimento do formulário
function exibeMensagensErro(msgs){
    
    var ul = document.querySelector("#mensagens-erro");

    ul.innerHTML = "";

    msgs.forEach(function(erro){
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    })
}