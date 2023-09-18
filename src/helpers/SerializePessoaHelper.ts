type Pessoa = {
    id: string
    apelido: string
    nome: string
    nascimento: string
    stack: string | null
}

export const SerializaPessoa = (pessoa: Pessoa | Array<Pessoa>) => {
    if (Array.isArray(pessoa)) return pessoa.map(
        pessoa => (
            {...pessoa, stack: pessoa.stack == '' ? null : pessoa.stack?.split(' ')}
    ));
    return {...pessoa, stack: pessoa.stack == '' ? null : pessoa.stack?.split(' ')};
}