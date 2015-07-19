var models = require('../models/models.js');

//Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId){
	models.Quiz.find(quizId).then(
		function(quiz) {
			if (quiz) {
				req.quiz = quiz;
				next();
			} else {next(new Error('No existe quizId=' + quizId)); }
		}
	).catch(function(error){next(error);});
};

//GET /quizes
exports.index = function(req,res) {
	var busqueda = ('%' + req.query.search + '%').replace(/ /g,'%');
		if (req.query.search) {
			models.Quiz.findAll({where: ["pregunta like ?", busqueda],
								 order: ['pregunta']}
								 ).then(function(quizes){
						res.render('quizes/index', { quizes: quizes});
		}).catch(function(error) {next(error);});
		}else{
			models.Quiz.findAll().then(function(quizes) {
				res.render('quizes/index', { quizes: quizes});
		}).catch(function(error) {next(error);});
		}
};

// GET /quizes/question
//exports.question = function(req, res) {
// GET /quizes/:id	
exports.show = function(req, res) {	
	//res.render('quizes/question', {pregunta: 'Capital de Italia'});
	//models.Quiz.findAll().success(function(quiz) {
	//models.Quiz.find(req.params.quizId).then(function(quiz) {
		res.render('quizes/show', { quiz: req.quiz});
	//})
};

// GET /quizes/answer
// GET /quizes/:id/answer
exports.answer = function(req, res) {
	//if (req.query.respuesta == 'Roma'){
	//	res.render('quizes/answer', {respuesta: 'Correcto'});
	//} else {
	//	res.render('quizes/answer', {respuesta: 'Incorrecto'});
	//}
	//models.Quiz.findAll().success(function(quiz) {	
	var resultado = 'Incorrecto';
	//models.Quiz.find(req.params.quizId).then(function(quiz) {	
		//if (req.query.respuesta == quiz[0].respuesta) {
		if (req.query.respuesta == req.quiz.respuesta) {
			//res.render('quizes/answer', {respuesta: 'Correcto'});
			resultado = 'Correcto';
		} //else {
			//res.render('quizes/answer', {respuesta: 'Incorrecto'});
			res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
		//}
	//})
};

// GET /author
exports.author = function(req, res) {
	res.render('author');
};
