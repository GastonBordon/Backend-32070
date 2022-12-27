const yargs =require('yargs/yargs')(process.argv.slice(2))
const args = yargs.argv

module.exports = {
    MODE: args.mode || 'FORK',
    PORT: args.port || 8080,
    METODO_PERSISTENCIA_USERS: 'MONGO',
    METODO_PERSISTENCIA: 'FILE',
}