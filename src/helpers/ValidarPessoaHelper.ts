type Pessoa = {
    apelido: string
    nome: string
    nascimento: string
    stack: Array<string> | null
}

const validarData = (dateString: string) => isNaN(new Date(dateString).getTime());
const type = (a: any) => typeof a !== 'string';

export const validarPessoaHelper = (pessoa: Pessoa | unknown) => {
    const { apelido, nome, nascimento, stack } = pessoa as Pessoa;
    if (type(apelido) || apelido.length > 32)
        return false;
    if (typeof stack === 'string' || typeof stack == 'number')
        return false
    if ( type(nome) || nome.length > 100)
        return false;
    if (validarData(nascimento)) return false;
    return (stack == null || stack.every( stkItem => (stkItem.length < 33 && !/\d|null|false|true|undefined/.test(stkItem))))
}
