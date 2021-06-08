const configExpress = require('./config/configExpress');
const toConnect = require('./infra/connection');
const table = require('./infra/Table');

toConnect.connect(error => {
    if(error){
        throw error;
    };
    table.init(toConnect);
    let app = configExpress();
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'));

});

