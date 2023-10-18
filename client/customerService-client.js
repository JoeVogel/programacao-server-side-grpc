const grpc = require('grpc')

// Carrega o serviço CustomerService do arquivo proto
const CustomerService = grpc.load('./customers.proto').CustomerService

// Cria uma conexão com o servidor para utilização das funções remotas
const client = new CustomerService('localhost:50051', grpc.credentials.createInsecure())

// Exporta a conexão criada como um módulo para podermos utilizar posteriormente conforme a necessidade
module.exports = client