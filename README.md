## Dados de inscrição

### Nome: Jadson Matheus Bezerra de Lima

### E-mail: jadson.mblima@gmail.com

### Telefone: (65) 98124-9384

### Github: [https://github.com/JdsLima](JdsLima)

### Linkedin: [https://br.linkedin.com/in/jadson-matheus-bezerra-de-lima](JadsonLima)

## Inicializar usando Docker

#### Modo produção

- buildar a imagem

```bash
docker build -t projeto-pratico-desenvolve-mt:1.0.0 .
```

- Rodar o container

```bash
docker run -p 3000:3000 projeto-pratico-desenvolve-mt:1.0.0
```

#### Modo desenvolvimento

- Use o comando abaixo para usar o docker-compose para construir a imagem

```bash
docker-compose up --build
```

## Inicializar projeto usando npm

Garanta que você tenha o NodeJS e o npm instalado em sua máquina.

Instale todas as dependências

```bash
npm install
```

Inicialize o servidor de teste:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para vizualizar o resultado.
