'use strict'

const Hapi = require('@hapi/hapi')
const axios = require('axios')

const init = async () => {

    const server = Hapi.server({
        port: 3001,
        host: 'localhost'
    })

    server.route({
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            const { key } = request.query

            if (!key) { return 'Forbidden. You need to add key!' }

            try {
                // TODO:: NEED TO ADD KEY!
                const res = await axios.get(`https://api.etherscan.io/api/?module=account&action=balance&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a&tag=latest&apikey=NTJJNGFGNKV62F5J5Q96V325S6X7ENZQ4G`)

                res.status === 200 && console.log(res.status)

                return res.data
            }
            catch (err) {
                console.error(err)
            }

        }
    })

    await server.start()
    console.log('Server running on %s', server.info.uri);
}

process.on('unhandledRejection', (err) => {

    console.log(err)
    process.exit(1)
})

init()