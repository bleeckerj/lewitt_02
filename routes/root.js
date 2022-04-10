'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/flooo', async function (request, reply) {
    reply.sendFile('flooo.html')
  })
}
