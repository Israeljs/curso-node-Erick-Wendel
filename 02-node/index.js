/*Obter um usuario
Obter seu telefone
Obter seu endereço*/

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

function obterTelefone(idUsuario, callback) {
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
    .then(function (resultado) {
        console.log('resultado', resultado)
    })
    .catch(function (error) {
        console.log('DEU RUIM',error)
    })



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