const grpc = require('grpc')

// Carrega o arquivo proto para implementação do serviço CustomerService
const customersProto = grpc.load('customers.proto')

// Lista de clientes (simulação de um banco de dados)
let customers = [
    { id: 1, name: 'Joe', email: 'joe@email.com' },
    { id: 2, name: 'João', email: 'joao@email.com' }
]

// Criação da função que será utilizada quando a função GetCustomers do serviço for solicitada
// call		=> contém os dados da requisição
// callback => contém os dados da resposta
function getCustomers(call, callback) {
	// retorna null (não ocorreu erro) e a lista de customers
	callback(null, customers)
}

// Criação da função que será utilizada quando a função NewCustomer do serviço for solicitada
// call		=> contém os dados da requisição
// callback => contém os dados da resposta
function createCustomer(call, callback) {
	let newCustomer = {}

	newCustomer.name = call.request.name
	newCustomer.email = call.request.email
	newCustomer.id = customers.length + 1

	customers.push(newCustomer)

	callback(null, newCustomer)
}

// Função main, contém as definições do servidor
function main() {
	// Cria um servidor
	const server = new grpc.Server()

	// Adiciona a implementação do serviço e faz a associação das funções
	server.addService(customersProto.CustomerService.service, {
		getCustomers: getCustomers,
		newCustomer: createCustomer
	})

	// Associa o porta escolhida ao servidor e opta por uma conexão sem mecanismo de segurança
	server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure())
	console.log('Server running at http://127.0.0.1:50051')
	// Inicia o servidor
	server.start()

}

// Executar o programa do servidor
main()