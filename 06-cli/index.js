const commander = require('commander')
const Heroi = require('./heroi')//essa classe foi criada para tratar os dados e trazer apenas o que precisa
const Database = require('./database')

async function main() {
  /**
   * node cli.js --help
   */
  commander
    .version('v1')
    .option('-n, --nome [value]', 'adicionar nome')
    .option('-p, --poder [value]', 'adicionar poder')
    .option('-i, --id [value]', 'id do heroi')
    //CRUD
    .option('-c, --cadastrar', 'cadastrar Heroi')
    .option('-r, --listar [value]', 'listar herois pelo id')
    .option('-u, --atualizar [value]', 'atualizar heroi pelo id')
    .option('-d, --remover [value]', 'remover heroi pelo id')
    .parse(process.argv) //vai pegar o que for passado na cli e converter para o projeto

  const heroi = new Heroi(commander) 
  try {
    /**
     * node cli.js --cadastrar params...
     * node cli.js -c -n Hulk -p Forca
     */
    if (commander.cadastrar) {
      delete heroi.id
      //const resultado = await Database.cadastrar(commander)
      const resultado = await Database.cadastrar(heroi)
      if (!resultado) {
          console.error('Heroi não foi cadastrado!')
          return
      }
      console.log('item cadastrado com sucesso!')
      
    }

    /**
     * node cli.js --listar
     * node cli.js -r
     * node cli.js -r 1
     */
    if (commander.listar) {
      //const id = commander.listar
      const resultado = await Database.listar()
      console.log(resultado)
      return
    }

    /**
     * node cli.js --remover
     * node cli.js -d 1
     */
    if (commander.remover) {
      const resultado = await Database.remover(heroi.id)
      if (!resultado) {
        console.error('não foi possivel remover o heroi')
        return
      }
      console.log('item removido com sucesso!')
    }

    /**
     * node cli.js --atualizar
     * node cli.js -u 1 -n papa
     * node cli.js -u 1 -n thor -p trovao
     */
    if (commander.atualizar) {
      const idParaAtualizer = parseInt(commander.atualizar)
      //remover as chaves que vierem com undefined
      const dado = JSON.stringify(heroi)
      const heroiAtualizar = JSON.parse(dado)//quando transformar para json novamente vai ser retirada as chaves desnecessarias
      const resultado = await Database.atualizar(idParaAtualizer, heroiAtualizar)
      if (!resultado) {
        console.error('Não foi possivel atualizar o heroi')
        return
      }
      console.log('item atualizado com sucesso!');
      
    }
    
  } catch (error) {
    console.error('DEU RUIM', error);
    return;
  }
}
main()

//npm instal commander https://www.youtube.com/watch?v=Kzcz-EVKBEQ
