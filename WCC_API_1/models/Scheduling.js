const moment = require('moment');
const { connect } = require('../infra/connection');
const toConnect = require('../infra/connection');

class Scheduling {

    listing(resp){
        const sql = 'SELECT * FROM agendamentos';

        toConnect.query(sql, (error, results) => {
            if(error){
                resp.status(400).json(error);
            }
            resp.status(201).json(results);
        });
    }

    searchById(id, resp){
            const sql = 'Select * FROM agendamentos WHERE id = ?';
            toConnect.query(sql, id, (error, results) => {
                if(error){
                    resp.status(400).json(error);
                }
                resp.status(201).json(results);
            });
        }

    update(id, scheduling, resp){
        const sql = 'UPDATE agendamentos SET ? WHERE id = ?';
        
        toConnect.query(sql, [scheduling, id], (error, results) => {
            if(error){
                resp.status(400).json(error);
            }
            resp.status(201).json(results);
        });
       
    }

    insert(scheduling, resp){
        const sql = `INSERT INTO agendamentos SET ?`;

        const data_servico = moment(scheduling.data_servico).format('YYYY-MM-DD');
        const data_agendamento = moment().format('YYYY-MM-DD');

        const schedulingWithDate = {...scheduling, data_agendamento, data_servico};

        const isValidDate = moment(scheduling.data_servico).isSameOrAfter(data_agendamento);

        const isValidName = scheduling.nome_cliente.length > 2;

        const valid = [
            {
                name : "data_servico",
                valid : isValidDate,
                message : " Data do agendamento deve ser igual ou superior a data de hoje " 
            },
            {
                name : "nome_cliente",
                valid : isValidName,
                message : " O nome do cliente deve ter pelo menos 3 digitos "
            }
        ];

        const errors = valid.filter( field => !field.valid);

        if(errors.length > 0){
            return resp.status(400).json(errors);
        }

        toConnect.query(sql, schedulingWithDate, (error, results) => {
            if(error){
                throw error;
            };

           resp.status(201).json(results);
        });
    }

    remove(id, resp){
        const sql = `DELETE FROM agendamentos WHERE id = ?`;

        toConnect.query(sql, id, (error, results) => {
            if(error){
                resp.status(400).json(error)
            }
            resp.status(201).json({
                mensagem:`Agendamento com ${id} removido com sucesso!`
            });
        });
    }

}

module.exports = new Scheduling;