const yargs =require('yargs/yargs')(process.argv.slice(2))
const args = yargs.argv

module.exports = {
    PORT: args.port || 8080
}