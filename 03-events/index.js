const EventEmitter = require('events')
class MeuEmissor extends EventEmitter {

}
const meuEmissor = new MeuEmissor()
const nomeEvento = 'usuario:click'
//on é o observador, o nome do evento, click é evento e oque ele passou nesse evento
meuEmissor.on(nomeEvento, function (click) {
    console.log('um usuario clicou', click)
})


// meuEmissor.emit(nomeEvento, 'na barra de rolagem')
// meuEmissor.emit(nomeEvento, 'no ok')

// let count = 0
// setInterval(function () {
//     meuEmissor.emit(nomeEvento, 'no ok' + (count++))

// }, 1000)

const stdin = process.openStdin()

// function main() {
//     return new Promise(function (resolve, reject) {
//         stdin.addListener('data', function (value) {
//             // console.log(`Voce digitou: ${value.toString().trim()}`)
//             return resolve(value)
//         })
//     })
// }
//promise executa um única vez e os eventos são para ações contínuas
stdin.addListener('data', function (value) { //data é da documentação do node
    console.log(`Voce digitou: ${value.toString().trim()}`)
})
    

// main().then(function (resultado) {
//     console.log('resultado', resultado.toString())
// })
