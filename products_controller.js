
const create = (request, response) => {
    const db = request.app.get('db');
    const { name, description, price, image_url } = request.body
    db.read_products([name, description, price, image_url] )
        .then(() => {
            response.status(200).send('Product was created')
        })
        .catch(error => {
            response.status(500).send({errorMessage: 'Something went wrong'})
            console.log('create', error)
        })

};

const getOne = (request, response) => {
    const db = request.app.get('db');
    const { id } = request.params;
    db.read_product([id])
        .then(product => {
            console.log(product)
            response.status(200).send(product)
        })
        .catch(error => {
            response.status(500).send({errorMessage: 'Something went wrong'})
            console.log('getOne', error)
        })
};

const getAll = (request, response) => {
    const db = request.app.get('db'); 
    db.read_products()
        .then(products => {
            response.status(200).send(products)
        })
        .catch(error => {
            response.status(500).send({errorMessage: 'Something went wrong'})
            console.log('getAll', error)
        })
};

const update = (request, response) => {
    const db = request.app.get('db'); 
    const { params, query } = request; 
    db.update_product([params.id, query.desc]) 
        .then(() => {
            response.status(200).send('Product has been updated')
        })
        .catch(error => {
            response.status(500).send({errorMessage: 'Something went wrong'})
            console.log('update', error)
        })
};

const deleted = (request, response) => {
    const db = request.app.get('db'); 
    const { id } = request.params; 
    db.delete_product(id)
    .then( () => {
        response.status(200).send('Product has been deleted')
    })
    .catch(error => {
        response.status(500).send({errorMessage: 'Something went wrong'})
        console.log('deleted', error)
    })
}


module.exports = {
    create, 
    getOne, 
    getAll, 
    update, 
    deleted
}