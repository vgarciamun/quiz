var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');			//Importamos el controlador de las preguntas
var commentController = require('../controllers/comment_controller');	//Importamos el controlador de los comentarios
var sessionController = require('../controllers/session_controller');	//Importamos el controlador de sesiones

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

//Autoload de comandos con :quizId
router.param('quizId', quizController.load);	//autoload :quizId

//Definición de las rutas de sesión
router.get('/login', sessionController.new);		//formulario login
router.post('/login', sessionController.create);	//crear sesión
router.get('/logout', sessionController.destroy);	//destruir sesión (debería funcionar también en vez de con get con delete)

//Definición de rutas de /quizes
//router.get('/quizes/question', quizController.question);
//router.get('/quizes/answer', quizController.answer);
//router.get('/author', quizController.author);

router.get('/quizes', 								quizController.index);
router.get('/quizes/:quizId(\\d+)', 				quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', 			quizController.answer);
router.get('/quizes/new',							quizController.new);
router.post('/quizes/create',						quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',			quizController.edit);
router.put('/quizes/:quizId(\\d+)',					quizController.update);
router.delete('/quizes/:quizId(\\d+)',				quizController.destroy);
router.get('/author', 								quizController.author);

router.get('/quizes/:quizId(\\d+)/comments/new', 	commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', 		commentController.create);


module.exports = router;
