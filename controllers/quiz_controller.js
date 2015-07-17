var models = require('../models/models.js');

// GET /quizes/question
exports.question = function(req, res) {
	//res.render('quizes/question', {pregunta: 'Capital de Italia'});
	models.Quiz.findAll().success(function(quiz) {
		res.render('quizes/question', {pregunta: quiz[0].pregunta})
	})
};

// GET /quizes/answer
exports.answer = function(req, res) {
	//if (req.query.respuesta == 'Roma'){
	//	res.render('quizes/answer', {respuesta: 'Correcto'});
	//} else {
	//	res.render('quizes/answer', {respuesta: 'Incorrecto'});
	//}
	models.Quiz.findAll().success(function(quiz) {	
		if (req.query.respuesta == quiz[0].respuesta) {
			res.render('quizes/answer', {respuesta: 'Correcto'});
		} else {
			res.render('quizes/answer', {respuesta: 'Incorrecto'});
		}
	})
};

// GET /author
exports.author = function(req, res) {
	res.render('author');
};
