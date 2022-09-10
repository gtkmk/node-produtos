const models = require('../models');
const Validator = require('fastest-validator');


function save(req, res){
    const post = {
        nome_produto: req.body.nome_produto,
        quantidade: req.body.quantidade,
        valor: req.body.valor
    }

    const schema = {
        nome_produto: {type:"string", optional: false, max:"60"},
        quantidade: {type:"number", optional: false},
        valor:{type:"number", optional: false}
    }

    const v = new Validator();
    const validationResponse = v.validate(post, schema);

    if(validationResponse !== true){
        return res.status(400).json({
            message: "Um ou mais campos com valores inválidos",
            errors: validationResponse
        });
    }

    models.produtos.create(post).then(result => {
        res.status(201).json({
            message: "Produto cadastrado com sucesso!",
            post: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Erro ao cadastrar produto!",
            error: error
        });
    });
}

function show(req, res){
    const id = req.params.id;
    models.produtos.findByPk(id).then(result => {
        if(result){
            res.status(200).json(result)
        }else{
            res.status(404).json({
                message: "Erro ao encontrar o produto pelo ID!"
            });
        }        
    }).catch(error => {
        res.status(500).json({
            message: "Algo deu errado... ",
            error: error
        });
    });
}

function index(req, res){
    models.produtos.findAll().then(result => {
        res.status(200).json(result)
    }).catch(error => {
        res.status(500).json({
            message: "Erro ao encontrar os produtos!",
            error: error
        });
    })
}

function update(req, res){
    const id = req.params.id;
    const updatePost = {
        nome_produto: req.body.nome_produto,
        quantidade: req.body.quantidade,
        valor: req.body.valor
    }

    const schema = {
        nome_produto: {type:"string", optional: false, max:"60"},
        quantidade: {type:"number", optional: false},
        valor:{type:"number", optional: false}
    }

    const v = new Validator();
    const validationResponse = v.validate(updatePost, schema);

    if(validationResponse !== true){
        return res.status(400).json({
            message: "Um ou mais campos com valores inválidos",
            errors: validationResponse
        });
    }

    models.produtos.update(updatePost, {where: {id:id}}).then(result =>{
        res.status(200).json({
            message: "Informações do produto atualizadas com sucesso!",
            produtos: updatePost
        })
    }).catch(error => {
        res.status(500).json({
            message: "Erro ao atualizar o produto!",
            error: error
        });
    });      
}

function destroy(req, res){
    const id = req.params.id;
    models.produtos.destroy({where:{id:id}}).then(result => {
        if(result){
            res.status(200).json({
                message: "Produto deletado com sucesso!"
            })
        }else{
            res.status(404).json({
                message: "Produto não encontrado!"
            });
        }        
    }).catch(error => {
        res.status(500).json({
            message: "Erro ao deletar o produto!",
            error: error
        });
    });
}

module.exports = {
    save: save,
    show: show,
    index: index,
    update: update,
    destroy: destroy
}