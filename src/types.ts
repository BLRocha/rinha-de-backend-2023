export type PessoaBody = {
  apelido: string
  nome: string
  nascimento: string
  stack: Array<string> | null
}

export type QueryTermo = {
t: string | null
[key: string]: any
}