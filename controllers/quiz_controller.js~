var models = require('../models/models.js');

//Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId){
	models.Quiz.find({
			where: { id: Number(quizId)},
			include: [{ model: models.Comment}]
		}).then(
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
						res.render('quizes/index', { quizes: quizes, errors: []});
		}).catch(function(error) {next(error);});
		}else{
			models.Quiz.findAll().then(function(quizes) {
				res.render('quizes/index', { quizes: quizes, errors: []});
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
		res.render('quizes/show', { quiz: req.quiz, errors: []});
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
			res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: []});
		//}
	//})
};

// GET /quizes/new
exports.new = function(req, res) {
	var quiz = models.Quiz.build(	//Crea el objeto quiz
		{pregunta: "Pregunta", respuesta: "Respuesta", tema: "Tema"}
		);
	res.render('quizes/new', {quiz: quiz, errors: []});
};

// POST /quizes/create
exports.create = function(req, res) {
	var quiz = models.Quiz.build( req.body.quiz );
	
	quiz
	.validate()
	.then(
		function(err){
			if (err) {
				res.render('quizes/new', {quiz: quiz, errors: err.errors});
			} else {
				quiz		//save: guarda en BD los campos preguta y respuesta de quiz
				.save({fields: ["pregunta", "respuesta", "tema"]}).then(function(){
					res.redirect('/quizes')
				})	//Redirección HTTP (URL relativo) lista de preguntas
			}
		}
	);
};

// GET /quizes/:id/edit
exports.edit = function(req, res){
	var quiz = req.quiz;	// autoload de instancia de quiz

	res.render('quizes/edit', {quiz: quiz, errors: []});
};

// PUT /quizes/:id
exports.update = function(req, res) {
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.tema = req.body.quiz.tema;

	req.quiz
	.validate()
	.then(
		function(err){
			if (err) {
				res.render('/quizes/edit', {quiz: req.quiz, errors: err.errors});
			} else {
				req.quiz 	// save: guarda los campos pregunta y respuesta en BD
				.save( {fields: ["pregunta", "respuesta", "tema"]})
				.then( function(){ res.redirect('/quizes');});
			}				// Redirección HTTP a lista de preguntas (URL relativo)
		});
};

// PUT /quizes/:id
exports.destroy = function(req, res) {
	req.quiz.destroy().then(function(){
		res.redirect('/quizes');
	}).catch(function(error){next(error)});
};

// GET /author
exports.author = function(req, res) {
	res.render('author', {errors: []});
};
