# Frete Rápido

Projeto desenvolvido para demonstrar proficiência no desenvolvimento Front-End para a empresa Frete Rápido.

## 📜 Especificações do Projeto

O projeto é uma aplicação de conversão de moedas que atende aos seguintes requisitos:

- Mostrar a quantia equivalente de uma unidade de cada moeda abaixo em Real Brasileiro (BRL):
  - Dólar Canadense (CAD)
  - Peso Argentino (ARS)
  - Libra Esterlina (GBP)
- Exibir a variação em porcentagem e a hora da última atualização.
- Formatar os valores:
  - Valores menores ou iguais a R$1,00 em vermelho.
  - Valores maiores que R$1,00 e menores ou iguais a R$5,00 em verde.
  - Valores maiores que R$5,00 em azul.
- Cache das informações no front-end por 3 minutos.
- Atualização automática a cada 3 minutos.
- Header fixo no topo da aplicação.
- Fontes utilizadas: “Poppins”, com fallback para “Arial” ou outra sem serifa.


## 📂 Estrutura do Projeto

- **app**
  - **core**: Componentes e configurações globais.
    - **components**: Componentes principais (ex.: header e home).
  - **shared**: Componentes, serviços e utilitários compartilhados.
    - **components**: Componentes reutilizáveis (ex.: alerta, card, loader).
    - **interfaces**: Interfaces de dados.
    - **pipes**: Pipes customizados.
    - **services**: Serviços compartilhados.
- **assets**: Arquivos como imagens.
  
## 🚀 Começando a usar o projeto

Siga as instruções abaixo para obter uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

### 📋 Pré-requisitos

Certifique-se de ter as seguintes versões dos pacotes instalados:

- **Node.js**: v21.7.1 ou superior
- **Angular CLI**: 18.0.4
- **Docker**: 26.1.4
- **nginx**: 1.26.1

Para verificar se os pré-requisitos estão instalados corretamente, execute os comandos:

```
node -v
npm -v
ng version
docker --version
```

### 🔧 Instalação

#### Versão local

1. **Instalando Node.js**
   
Baixe e instale o Node.js a partir do [site oficial](https://nodejs.org/en/download/package-manager). No exemplo abaixo, utilizaremos o Chocolatey, mas você pode usar o gerenciador de pacotes de sua preferência:

```
choco install nodejs --version="21.7.3"
```
2. **Instalando Angular CLI**
   
Instale o Angular CLI globalmente:

```
npm install -g @angular/cli@18.0.4
```

3. **Instalando dependências do projeto**

No diretório raiz do projeto, instale as dependências:

```
npm install
```
4. **Rodando a aplicação**
   
Para rodar a aplicação localmente, execute:

```
ng serve
```

A aplicação estará disponível em [localhost:4200](http://localhost:4200).

Assim você está rodando o projeto localmente na sua máquina.

#### Versão com Docker

1. **Preparando o ambiente**

Certifique-se de instalar o [Docker](https://www.docker.com/get-started/) .

2. **Construindo a imagem Docker**
   
No diretório raiz do projeto, construa a imagem Docker:

```
docker build -t angular-docker .
```

3. **Executando a aplicação com Docker**
   
Rode o comando:

```
docker run -p 8080:80 angular-docker
```
A aplicação estará disponível em [localhost:8080](http://localhost:8080).

## ⚙️ Executando os testes

Para executar os testes você deve utilizar o comando

```
ng test
```
Este comando executará os testes unitários configurados no projeto e exibirá os resultados no console.

## 🛠️ Construído com

* [Angular](https://angular.io) - Framework para desenvolvimento de aplicações web
* [Node.js](https://nodejs.org) - Ambiente de execução JavaScript
* [Docker](https://www.docker.com) - Plataforma para desenvolvimento, envio e execução de aplicações em containers
* [nginx](https://www.nginx.com) - Servidor web e proxy reverso
