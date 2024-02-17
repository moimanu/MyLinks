// Criação dos botões do launcher.
var novoBotaoForm = document.getElementById("novo_botao_form");
novoBotaoForm.addEventListener("submit", () => {

    var urlImagem = document.getElementById("url_imagem").value;
    var urlSite = document.getElementById("url_site").value;

    let linksAdicionados = new Array();
    if(localStorage.hasOwnProperty("linksAdicionados")){
        linksAdicionados = JSON.parse(localStorage.getItem("linksAdicionados"))
    }
    linksAdicionados.push({urlImagem, urlSite});
    localStorage.setItem("linksAdicionados", JSON.stringify(linksAdicionados));

    // Criação de uma referência entre os botões de excluir e seus respectivos elementos.
    let indicesBtExcluirCriados = new Array();
    if(localStorage.hasOwnProperty("indicesBtExcluirCriados")){
        indicesBtExcluirCriados = JSON.parse(localStorage.getItem("indicesBtExcluirCriados"))
    }
    indicesBtExcluirCriados.push(linksAdicionados.length - 1);
    localStorage.setItem("indicesBtExcluirCriados", JSON.stringify(indicesBtExcluirCriados));

    location.reload();
});

// "Renderização" dos botões já adicionados no launcher.
let linksAdicionados = JSON.parse(localStorage.getItem("linksAdicionados"));
for (let index = 0; index < linksAdicionados.length; index++) {
    document.getElementById("box_formulario").insertAdjacentHTML('beforebegin', `<li class="item_lista"><a target=”_blank” class="ancora" id="ancora_id" href="${linksAdicionados[index].urlSite}"><img class="ancora_imagem" src="${linksAdicionados[index].urlImagem}"></a></li><button class="bt_excluir" id="${index}"><img class="fundo" src="${linksAdicionados[index].urlImagem}"><div class="icone_lixo_box"><img class="icone_lixo" src="img/lixeira.png"></div></button>`); 
};

// Escondendo o formulário quando a quantidade de botões no launcher chegar ao limite.
var boxFormulario = document.getElementById("box_formulario");
if (linksAdicionados.length === 12) {
    boxFormulario.style.display = "none";
}

// Mecanismo para excluir um botão do launcher.
var indicesBtExcluir = JSON.parse(localStorage.getItem("indicesBtExcluirCriados"));


for (let i = 0; i < indicesBtExcluir.length; i++) {

    document.getElementById(indicesBtExcluir[i]).addEventListener("click", function() {

        if(indicesBtExcluir[i] === i) {
            linksAdicionados.splice(i, 1);
            indicesBtExcluir.pop();                     
            localStorage.setItem("indicesBtExcluirCriados", JSON.stringify(indicesBtExcluir));

            localStorage.setItem("linksAdicionados", JSON.stringify(linksAdicionados));

            location.reload();
        }   
    })

};