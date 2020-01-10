const assert = require('assert')
const { obterPessoas } = require('./service')
//instalar o mocha de forma global npm i -g mocha

/*
describe('Star Wars Tests', function () {
    it('deve buscar o r2d2 com o formato correto', async () => { //it(isso) deve buscar o r2d2 com o formato correto
        const expected = [{
            nome: 'R2-D2',
            peso: '96'
        }]
        const nomeBase = `r2-d2`
        const resultado = await obterPessoas(nomeBase)//verifica se o valor desse resultado é oque se estar esperando
        assert.deepEqual(resultado, expected)
    })
})
*/
/*Quando se estar consumindo api externa definisse que o serviço externo 
sempre vai retornar as informações e trabalhamos apartir do resultado dele. 
Etão devemos simular que essas requisições estam funcionando e testa-las*/

/* instalamos o pacote nock, para simular requisicoes e toda vez
que chamar a api passando parâmetro usamos ele como default*/
const nock = require('nock')


describe('Star Wars Tests', function () {
    this.beforeAll(() => {// antes de rodar os testes faça uma tarefa
        const response = {// Vem da api de star wars e servirá para simular requisições à mesma
            count: 1,
            next: null,
            previous: null,
            results: [{
                name: 'R2-D2',
                height: '96',
                mass: '32',
                hair_color: 'n/a',
                skin_color: 'white, blue',
                eye_color: 'red',
                birth_year: '33BBY',
                gender: 'n/a',
                homeworld: 'https://swapi.co/api/planets/8/',
                vehicles: [],
                starships: [],
                created: '2014-12-10T15:11:50.376000Z',
                edited: '2014-12-20T21:17:50.311000Z',
                url: 'https://swapi.co/api/people/3/'
            }]
        }

        nock('https://swapi.co/api/people')//toda fez que o meu usuário tentar acesar essa url
            .get('/?search=r2-d2&format=json')//no método http get, com os parâmetros: /?search= com o tipo do 'r2-d2' e o formato json
            .reply(200, response)// quero que responda com o stato 200 e o response
    })

    it('deve buscar o r2d2 com o formato correto', async () => {
        const expected = [{
            nome: 'R2-D2',
            peso: '96'
        }]
        const nomeBase = `r2-d2`
        const resultado = await obterPessoas(nomeBase)
        assert.deepEqual(resultado, expected)
    })
})
