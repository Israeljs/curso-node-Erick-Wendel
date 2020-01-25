//pega o nome da classe e dos métodos dinamicamente para que só crie
//as classes. objetivo: uma classe ter apenas um motivo para ser alterada
class BaseRoute {
    static methods() {
        return Object.getOwnPropertyNames(this.prototype)
            .filter(method => method !== 'constructor' && !method.startsWith('_'))
    }
}

module.exports = BaseRoute