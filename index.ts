const listaIngredientes: Ingrediente[] = [
  {
    nome_ingrediente: "Farinha",
    quantidade_comprada: 1000,
    valor_pago: 5,
    quantidade_usada_por_unidade: 100,
    // Gerado
    quantidade_que_pode_ser_produzida: 0,
    custo_por_unidade: 0,
  },
  {
    nome_ingrediente: "Leite",
    quantidade_comprada: 1000,
    valor_pago: 8,
    quantidade_usada_por_unidade: 200,
    // Gerado
    quantidade_que_pode_ser_produzida: 0,
    custo_por_unidade: 0,
  },
];

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

geraValoresRestantesIngrediente();

const porcentagem_lucro = 30;
const valor_produto: number = defineCustoProduto(listaIngredientes);
const valor_lucro: number = 
  (valor_produto / 100) * porcentagem_lucro;
const valor_produto_com_lucro: number = valor_produto + valor_lucro;
// ======================

console.log("=========== Valores ===========");
console.log(`Valor do produto: R$${valor_produto}`);
console.log(`A margem de lucro é de ${porcentagem_lucro}%, gerando um lucro de R$${valor_lucro}`);
console.log(
  `Valor do produto com lucro é: R$${valor_produto_com_lucro}`
);
