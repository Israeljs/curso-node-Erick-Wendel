/*Obter um usuario
Obter seu telefone
Obter seu endereço*/

//importamos umódulo interno do node
const util = require('util')
//transformando de callback para promise. A callback tem que seguir a convenção para tanto
const obterEnderecoAsync = util.promisify(obterEndereco)

//CÓDIGO COM ASYNC/AWAIT

function obterUsuario() {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function () {
        return resolve({
            id: 1,
            nome: 'Aladin',
            dataNascimento: new Date()
        })
    }, 1000)
    })
    
}

function obterTelefone(idUsuario) {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                telefone: '555842',
                ddd: 11
            })
        }, 2000)

    })
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'São Bento',
            numero: 4405
        })
    }, 2000)
}

//1 Adicionar ASYNC -> automaticamente ela retornará uma promise
main()//tem que chamar o método. É uma promise mas se não se quer executar nada depois dele não precisa por o .then e .catch
async function main() {
    try {
        console.time('medida-promise')//como se captura o tempo de execução de uma função
        const usuario = await obterUsuario()
        // const telefone = await obterTelefone(usuario.id)
        // const endereco = await obterEnderecoAsync(usuario.id)
        /*o telefone e o endereco não precisam da resposta um do outro então 
        podem ser colocados no Promise.all, executar e falar para eles rodarem 
        em segundo plano assincronamente para um resultado mais performático*/
        const resultado = await Promise.all([
            obterTelefone(usuario.id),//[0]
            obterEnderecoAsync(usuario.id)//[1]
        ])
        const endereco = resultado[1]
        const telefone = resultado[0]
        console.log(`
                Nome: ${usuario.nome},
                Endereco: ${endereco.rua},${endereco.numero}
                Telefone: (${telefone.ddd})${telefone.telefone}
            `)
            console.timeEnd('medida-promise')
    } catch (error) {
        
    }
}


//CÓDIGO COM PROMISE

/*
//importamos umódulo interno do node
const util = require('util')
//transformando de callback para promise. A callback tem que seguir a convenção para tanto
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function () {
        return resolve({
            id: 1,
            nome: 'Aladin',
            dataNascimento: new Date()
        })
    }, 1000)
    })
    
}

function obterTelefone(idUsuario) {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                telefone: '555842',
                ddd: 11
            })
        }, 2000)

    })
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'São Bento',
            numero: 4405
        })
    }, 2000)
}

const usuarioPromise = obterUsuario()
//manipular sucesso .then
//manipular erro .catch
usuarioPromise
    .then(function (usuario) {
        return obterTelefone(usuario.id)
        .then(function resolverTelefone(result) {
            return {
                usuario: {
                    nome: usuario.nome,
                    id: usuario.id
                },
                telefone: result
            }
        })
    })
    .then( function (resultado) {
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolverEndereco(result) {
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    }) 
    .then(function (resultado) {
        console.log(`
                Nome: ${resultado.usuario.nome},
                Endereco: ${resultado.endereco.rua},${resultado.endereco.numero}
                Telefone: (${resultado.telefone.ddd})${resultado.telefone.telefone}
            `)
    })
    .catch(function (error) {
        console.log('DEU RUIM',error)
    })*/


//CÓDIGO COM CALLBACK

/*function obterUsuario(callback) {
    setTimeout(function () {
        return callback(null, {
            id: 1,
            nome: 'Aladin',
            dataNascimento: new Date()
        })
    }, 1000)
}

function obterTelefone(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            telefone: '555842',
            ddd: 11
        })
    }, 2000)
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'São Bento',
            numero: 4405
        })
    }, 2000)
}


obterUsuario(function resolverUsuario(error, usuario) {
    //null || "" || 0 === false
    if(error) {
        console.error('Deu ruim em Usuario', error)
        return
    }
    obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
        if(error1) {
            console.error('Deu ruim em Telefone', error)
            return
        }
        obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
            if(error2) {
                console.error('Deu ruim em Endereco', error)
                return
            }
            console.log(`
                Nome: ${usuario.nome},
                Endereco: ${endereco.rua},${endereco.numero}
                Telefone: (${telefone.ddd})${telefone.telefone}
            `)

        })
    })

})*/