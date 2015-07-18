var path = require('path');

//Postgres DATABASE_URL = postgres://user:passwd@host:port/database
//SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name	 = (url[6]||null);	
var user	 = (url[2]||null);
var pwd		 = (url[3]||null);
var protocol = (url[1]||null);
var dialect	 = (url[1]||null);
var port	 = (url[5]||null);
var host	 = (url[4]||null);
var storage	 = process.env.DATABASE_STORAGE;

//Cargar Modelo ORM
var Sequelize = require('sequelize');

//Usar BD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd, 
	{dialect:  protocol, 
	 protocol: protocol,
	 port:     port,
	 host: 	   host,
	 storage:  storage,	//sólo SQLite (.env)
	 omitNull: true		//sólo Postgres
	}
);

//Importar la definición de la tabla Quiz en quiz.js
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);

exports.Quiz = Quiz;	//Exportar la definición de la tabla Quiz

//sequelize.sync() crea e inicilaliza la tabla de preguntas en BD
sequelize.sync().then(function() {
	//then(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function(count){
		if (count == 0) {	//la tabla se inicializa sólo si está vacía
			Quiz.create({ pregunta: 'Capital de Italia',
						  respuesta: 'Roma'	
						})
			Quiz.create({ pregunta: 'Capital de Portugal',
						  respuesta: 'Lisboa'	
						})	
			Quiz.create({ pregunta: 'Capital de España',
						  respuesta: 'Madrid'	
						})									
			.then(function(){console.log('Base de datos inicializada.')});
		};
	});
});