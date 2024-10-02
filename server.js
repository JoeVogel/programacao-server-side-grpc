const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')

// Carregar o arquivo proto
const PROTO_PATH = path.join(__dirname, 'customers.proto')
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {})
const customersProto = grpc.loadPackageDefinition(packageDefinition).CustomerService

// Simulação de banco de dados
let customers = []
let nextId = 1

// Implementação dos métodos do serviço
const getCustomers = (call, callback) => {
    callback(null, { customers })
}

const newCustomer = (call, callback) => {
    const customer = {
        id: nextId++,
        name: call.request.name,
        email: call.request.email,
    };
    customers.push(customer)
    callback(null, customer)
};

// Criação do servidor
function main() {
    const server = new grpc.Server();
    server.addService(customersProto.service, {
        GetCustomers: getCustomers,
        NewCustomer: newCustomer,
    })
    
    const PORT = '0.0.0.0:50051'
    server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), () => {
        console.log(`Servidor escutando na porta ${PORT}`)
    })
}

main()
