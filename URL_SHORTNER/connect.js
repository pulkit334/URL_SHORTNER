const mongoose = require("mongoose")


async function   connectmono(url) {

    return mongoose.connect(url)

}

module.exports =   {connectmono}