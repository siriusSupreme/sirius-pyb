const mode = process.env.MODE || process.env.NODE_ENV
const config = require(`./${mode}.js`)

module.exports = config
