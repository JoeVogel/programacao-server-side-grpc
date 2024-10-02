const client = require('./customerService-client')

// // Exemplo de uso
// addCustomer('John Doe', 'john@example.com')
// getCustomers()

// Exemplos de utilização das Funções disponibilizadas pelo servidor:

// Lista os clientes
client.getCustomers({}, (error, customers) => {
	if (!error) {
        console.log(customers)
    } else {
        console.error(error)
    }
})

// Solicita a gravação de um novo cliente
client.newCustomer({name : 'Fulano', email: 'fulano@email.com'}, (error, customer) => {
	if (!error) {
		console.log('New customer ' + customer.name + ' saved, id=' + customer.id)
	} else {
		console.error(error)
	}
})

// Lista os clientes novamente, o cliente cadastrado deve aparecer aqui também
client.getCustomers({}, (error, customers) => {
	if (!error) {
        console.log(customers)
    } else {
        console.error(error)
    }
})