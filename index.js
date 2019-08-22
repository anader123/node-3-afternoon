require('dotenv').config();
const express = require('express'); 
const cors = require('cors');
const massive = require('massive'); 
const product_controller = require('./products_controller'); 

const { 
    SEVER_PORT, 
    CONNECTION_STRING
} = process.env; 

const app = express(); 

app.use(express.json()); 
app.use(cors()); 

massive(CONNECTION_STRING)
.then((dbInstance) => {
    app.set('db', dbInstance)
    console.log('Database Connected')
})
.catch((error) => {'Massive', error});

// End Points 
app.get('/api/products', product_controller.getAll);
app.get('/api/products/:id', product_controller.getOne); 
app.put('/api/products/:id', product_controller.update); 
app.post('/api/products', product_controller.create); 
app.post('/api/products/:id', product_controller.deleted); 

app.listen(SEVER_PORT, () => console.log(`Sever is listening on ${SEVER_PORT}`)); 

