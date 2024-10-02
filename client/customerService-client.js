const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')

// Carregar o arquivo proto
const PROTO_PATH = path.join(__dirname, '../customers.proto')
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {})
const customersProto = grpc.loadPackageDefinition(packageDefinition)

// Conectar ao servidor
const client = new customersProto.CustomerService('localhost:50051', grpc.credentials.createInsecure())

// Função para obter clientes
const getCustomers = () => {
    client.GetCustomers({}, (error, response) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log('Clientes:', response.customers);
    })
}

// Função para adicionar um novo cliente
const addCustomer = (name, email) => {
    const newCustomer = { name, email }
    client.NewCustomer(newCustomer, (error, response) => {
        if (error) {
            console.error(error)
            return
        }
        console.log('Cliente adicionado:', response)
    })
}

module.exports = {getCustomers, addCustomer}
