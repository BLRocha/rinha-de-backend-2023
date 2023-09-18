import { Elysia } from "elysia";
import { validarPessoaHelper } from "./helpers/ValidarPessoaHelper";
import { count, findById, findByTermo, insertPessoa } from "./database/db";
import { SerializaPessoa } from "./helpers/SerializePessoaHelper";
import { cache } from "./database/cache";
import { _200, _201, _400, _404, _422, _headers } from "./helpers/RespostasHelper";

import { PessoaBody, QueryTermo } from "./types";

await cache.connect();
const app = new Elysia();

app.post('/pessoas', async ({ body }) => {
  const { apelido, nome, nascimento, stack } = body as PessoaBody;

  if (validarPessoaHelper(body)) {
    if (await cache.get(apelido)) return _422;
    Promise.all([cache.set(apelido, 1, {EX: 300})]);
    try {
      const uuid = crypto.randomUUID();
      const stackText = stack !== null ? stack.join(' ') : '';
      await insertPessoa(uuid, apelido, nome, nascimento, stackText);

      return _201([], { 'Location': `/pessoas/${uuid}` });
    } catch (e: any) {
      return _422;
    }
  }
  return _422;
});

app.get('/pessoas', async ({ query, set, headers }) => {
  const { t } = query as QueryTermo;

  if (!t) return _400;
  if(/\d/.test(t) || /\n/.test(t) || t?.indexOf(' ') == -1 ) return _200;

  const termo = t?.toLocaleLowerCase();

  const { rows } = await findByTermo(termo);
  _headers(set, headers);
  return SerializaPessoa(rows);
});

app.get('/pessoas/:id', async ({ params,set, headers }) => {
  const { id } = params;

  if (!id || id?.length !== 36) return _404;

  const { rows } = await findById(id);

  if (!rows[0]) return _404;

  _headers(set, headers);
  return SerializaPessoa( rows[0] ); 
});

app.get('/contagem-pessoas',async ({set, headers}) => {
  _headers(set, headers);
  const { rows } = await count();
  return rows[0]?.count ?? 0;
});

app.listen({port: process.env.PORT || 3000, hostname: process.env.HOST || '127.0.0.1'},async () => {
  console.log(`🦊 Elysia App ${app.server?.hostname}:${app.server?.port}`);
});

