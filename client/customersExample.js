const {getCustomers, addCustomer} = require('./customerService-client')

// Exemplo de uso

// Lista todos os clientes
getCustomers()

// Adiciona um cliente
addCustomer('John Doe', 'john@example.com')

// Lista novamente os clientes (note que agora vai aparecer também o cliente revém adicionado)
getCustomers()