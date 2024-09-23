let porcentagem_lucro: number = 30;
let valor_produto: number = 0;
let valor_lucro: number = 0;
let valor_produto_com_lucro: number = 0;
const listaIngredientes: Ingrediente[] = [];
const buttonAdd = document.getElementById("button-add");
// ================================================
// ================================================
// ================================================

const adicionarIngredienteNaLista = () => {
    
  const nome = document.getElementById("input-nome") as HTMLInputElement;
  const quantidadeComprada = document.getElementById(
    "input-quantidade-comprada"
  ) as HTMLInputElement;
  const quantidadeUsadaPorUnidade = document.getElementById(
    "input-quantidade-usada-por-unidade"
  ) as HTMLInputElement;
  const valorPago = document.getElementById(
    "input-valor-pago"
  ) as HTMLInputElement;


  
  const ingrediente: Ingrediente = {
    nome_ingrediente: nome.value,
    quantidade_comprada: Number(quantidadeComprada.value),
    quantidade_usada_por_unidade: Number(quantidadeUsadaPorUnidade.value),
    valor_pago: Number(valorPago.value),
    quantidade_que_pode_ser_produzida: 0,
    custo_por_unidade: 0,
  };

  listaIngredientes.push(ingrediente);

  nome.value = "";
  quantidadeComprada.value = "";
  quantidadeUsadaPorUnidade.value = "";
  valorPago.value = "";
  geraValoresRestantesIngrediente();
  carregarListaTela();
};

buttonAdd?.addEventListener("click", adicionarIngredienteNaLista);

const carregarListaTela = () => {
    const lista = document.getElementById("lista-ingredientes") as HTMLElement;
    lista.innerHTML = "";
    listaIngredientes.forEach((ingrediente) => {
        const li = document.createElement("li");

        const criarElementoP = (conteudo: string) => {
          const p = document.createElement("p");
          p.className = "dados-item-lista";
          p.textContent = conteudo;
          return p;
        };
        console.log(ingrediente.valor_pago);
        
        li.appendChild(criarElementoP(ingrediente.nome_ingrediente));
        li.appendChild(criarElementoP(ingrediente.quantidade_comprada.toString()));
        li.appendChild(criarElementoP("R$" + ingrediente.valor_pago.toString()));
        li.appendChild(criarElementoP(ingrediente.quantidade_usada_por_unidade.toString()));
        li.appendChild(criarElementoP(ingrediente.quantidade_que_pode_ser_produzida.toFixed(2).toString()));
        li.appendChild(criarElementoP("R$" + ingrediente.custo_por_unidade.toFixed(2).toString()));
        
        lista?.appendChild(li);
        exibirCustoFinal();
    });
  };

// ======================

const defineQuantidadeQuePodeSerProduzida = (
  quantidadeComprada: number,
  quantidade_usada_por_unidade: number
): number => {
  return quantidadeComprada / quantidade_usada_por_unidade;
};

const defineCustoPorUnidade = (
  valor_pago: number,
  quantidade_que_pode_ser_produzida: number
): number => {
  return valor_pago / quantidade_que_pode_ser_produzida;
};

const geraValoresRestantesIngrediente = () => {
  listaIngredientes.forEach((ingrediente) => {
    ingrediente.quantidade_que_pode_ser_produzida =
      defineQuantidadeQuePodeSerProduzida(
        ingrediente.quantidade_comprada,
        ingrediente.quantidade_usada_por_unidade
      );

    ingrediente.custo_por_unidade = defineCustoPorUnidade(
      ingrediente.valor_pago,
      ingrediente.quantidade_que_pode_ser_produzida
    );
  });
};

const defineCustoProduto = (listaIngredientes: Ingrediente[]): number => {
  let custoProduto: number = 0;

  listaIngredientes.forEach((ingrediente) => {
    custoProduto = custoProduto + ingrediente.custo_por_unidade;
  });

  return custoProduto;
};
const defineCustoProdutoComLucroDe30 = (listaIngredientes: Ingrediente[]): number => {
  let custoProduto: number = 0;

  listaIngredientes.forEach((ingrediente) => {
    custoProduto = custoProduto + ingrediente.custo_por_unidade;
  });

  return custoProduto + (custoProduto * porcentagem_lucro) / 100;
};

const exibirCustoFinal = () => {
  const HTMLCustoFinal = document.getElementById("custo-final") as HTMLInputElement;
  const custoProduto = defineCustoProduto(listaIngredientes);
  HTMLCustoFinal.textContent = "Valor do produto: R$" + custoProduto.toFixed(2).toString() + " | Valor com lucro de 30%: R$" + defineCustoProdutoComLucroDe30(listaIngredientes).toFixed(2).toString();
}
