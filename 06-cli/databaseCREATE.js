const { writeFile, readFile } = require('fs');//trabalha com callbacks
const { promisify } = require('util');
const [writeFileAsync, readFileAsync] = [
    promisify(writeFile),//para manipular arquivos no js
    promisify(readFile),//agora com promise
];

class Database {
    constructor() {
        this.FILENAME = 'heroes.json';
    }

    async obterArquivo() {
        const arquivo = await readFileAsync(this.FILENAME);//outra forma '= require ('heroes.json') estamos simulando outro tipo de arquivo e ficaria pra sempre no cach
        return JSON.parse(arquivo.toString());
    }

    async escreverArquivo(dados) {
        await writeFileAsync(this.FILENAME, JSON.stringify(dados))
        return true
    }

    async cadastrar(heroi) {
        const dados = await this.obterArquivo();
        //workaround para simular um id
        const id = heroi.id <= 2 ? heroi.id : Date.now();
        const heroiComId = {
            ...heroi,
            id,
        };

        return await this.escreverArquivo([...dados, heroiComId]);
    }

    async listar(id) {
        const dados = await this.obterArquivo()
        const dadosFiltrados = dados.filter(item => (id ? item.id == id : true));//si for passado um id use-o, si não retorne a lista inteira
        return dadosFiltrados
    }

}

module.exports = new Database();


// const { writeFile, readFile } = require('fs');//trabalha com callbacks
// const { promisify } = require('util');
// const [writeFileAsync, readFileAsync] = [
//   promisify(writeFile),
//   promisify(readFile),
// ];//agora com promise

// class Database {
//   constructor() {
//     this.FILENAME = 'heroes.json';
//   }

//   async obterArquivo() {
//     const arquivo = await readFileAsync(this.FILENAME);//outra forma '= require ('heroes.json') estamos simulando outro tipo de arquivo
//     return JSON.parse(arquivo.toString());
//   }

//   async escreverArquivo(dados) {
//     await writeFileAsync(this.FILENAME, JSON.stringify(dados));
//     return true;
//   }

//   async cadastrar(heroi) {
//     const dados = await this.obterArquivo();
//     //workaround para simular um id
//     const id = heroi.id <= 2 ? heroi.id : Date.now();
//     const heroiComId = {
//       ...heroi,
//       id,
//     };

//     return await this.escreverArquivo([...dados, heroiComId]);
//   }

//   async listar(id) {
//     const dados = await this.obterArquivo();
//     // se nao passar o id, traz tudo
//     return dados.filter(item => (id ? item.id == id : true));//si for passado um id use-o si não retorne a lista inteira
//   }

//   async atualizar(id, atualizacoes) {
//     const dados = await this.obterArquivo();
//     const indice = dados.findIndex(item => item.id === parseInt(id));
//     if (indice === -1) {
//       throw Error('heroi não existe!');
//     }

//     const atual = dados[indice];
//     dados.splice(indice, 1);

//     //workaround para remover valores undefined do objeto
//     const objAtualizado = JSON.parse(JSON.stringify(atualizacoes));
//     const dadoAtualizado = Object.assign({}, atual, objAtualizado);

//     return await this.escreverArquivo([...dados, dadoAtualizado]);
//   }

//   async remover(id) {
//     if (!id) {
//       await this.escreverArquivo([]);
//       return true;
//     }

//     const dados = await this.obterArquivo();

//     const indice = dados.findIndex(item => item.id === parseInt(id));
//     if (indice === -1) {
//       throw Error('heroi não existe!');
//     }
//     const atual = dados[indice];
//     dados.splice(indice, 1);
//     await this.escreverArquivo(dados);
//     return true;
//   }
// }

// module.exports = new Database();
