const headers = {
    'Content-Type':' application/json'
  };

type Set = {
  headers: {
      [header: string]: string;
  } & {
      ['Set-Cookie']?: string | string[];
  };
  status?: number;
  redirect?: string;
}

export const _404 = new Response(null, {
  headers,
  status: 404
});
  
export const _422 = new Response(null, {
  headers,
  status: 422
});
  
export const _400 = new Response(null, {
  headers,
  status: 400
});
  
export const _200 = new Response(null, {
  headers,
  status: 200
});

export const _201 = (
    body?:
    | ReadableStream
    | BlobPart
    | BlobPart[]
    | FormData
    | URLSearchParams
    | null,
    headersOpts?: HeadersInit 
    ) => new Response(body,
    {
        headers: {...headers, ...headersOpts},
        status: 201
    });

export const _headers = (set: Set, headers?: Record<string, string | null>, Status = '200') => {
  set.headers = {
    ...headers,
    'Content-Type': 'application/json',
    Status }
  };