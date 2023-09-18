FROM bun:local

WORKDIR /app

COPY . /app

RUN rm -rf /app/node_modules && cd /app && bun install

ENV PORT=80 HOST='0.0.0.0'

EXPOSE 80 3000

ENTRYPOINT bun run src/index.ts