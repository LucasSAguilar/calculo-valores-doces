interface Ingrediente {
    nome_ingrediente: string,
    quantidade_comprada: number,
    valor_pago: number,
    quantidade_usada_por_unidade: number,
    // Gerado
    quantidade_que_pode_ser_produzida: number,
    custo_por_unidade: number,
}