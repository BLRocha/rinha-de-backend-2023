FROM ubuntu:23.10 as main
RUN apt update && apt install curl unzip -y &&\
    apt autoremove -y &&\
    curl -sSLO https://github.com/oven-sh/bun/releases/latest/download/bun-linux-x64-baseline.zip &&\
    unzip bun-linux-x64-baseline.zip &&\
    cp bun-linux-x64-baseline/bun usr/local/bin &&\
    rm -rf bun-linux-x64-baseline bun-linux-x64-baseline.zip
##---------------------------------------------------------------------
FROM main
WORKDIR /app
COPY . /app
RUN rm -rf /app/node_modules && cd /app && bun install
ENV PORT=80 HOST='0.0.0.0'
EXPOSE 80 3000
ENTRYPOINT bun run src/index.ts