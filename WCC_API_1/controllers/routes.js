const Scheduling = require('../models/Scheduling');
module.exports = app => {
    
    app.get('/agendamentos', (req, resp) => {
        Scheduling.listing(resp);
    });

    app.get('/agendamentos/:id', (req, resp) => {
        const id = parseInt(req.params.id);
        Scheduling.searchById(id, resp);
    });  

    app.post('/agendamentos',(req, resp) =>{
        const scheduling = req.body;
        Scheduling.insert(scheduling, resp);
    });

    app.put('/agendamentos/:id',(req, resp) =>{
        const id = parseInt(req.params.id);
        const scheduling = req.body;
        Scheduling.update(id, scheduling, resp);
    });

    app.delete('/agendamentos/:id', (req, resp) => {
        const id = parseInt(req.params.id);
        Scheduling.remove(id, resp);
    }); 

};