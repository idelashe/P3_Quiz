// Funciones del modelo de datos
 
const fs = require("fs");

// Nombre del fichero donde se guardan las preguntas.
// Es un fichero de texto JSON de quizzes.
const DB_FILENAME = "quizzes.json";
/**
 * Modelo de datos

 * En esta variable se mantienen todos los quizzes existentes.
 * Es un array de objetos, donde cada objeto tiene los atributos question
 *  y answer para guardar el texto de la pregunta y el de la respuesta.
 * 
 * Al arrancar la palicación, esta variable contiene estas 4 preguntas
 *  pero al final del módulo se llama a load() para cargar las preguntas
 *  guardadad en el fichero DB_FILENAME
 */
 //"use strict";
 let quizzes = [
 	{
 		question: "Capital de Italia",
 		answer: "Roma"
 	},
 	{
 		question: "Capital de Francia",
 		answer: "Paris"
 	},
 	{
 		question: "Capital de España",
 		answer: "Madrid"
 	},
 	{
 		question: "Capital de Portugal",
 		answer: "Lisboa"
 	}
 ];

 /**
 * Carga las preguntas guardadas en el fichero.
 *
 * Este método carga el contenido del fichero DB_FILENAME en la variable
 *  quizzes. El contenido está en formato JSON. La primera vez que se 
 *  ejecute, el fichero DB_FILENAME no existe, y se produciraá el error
 *  ENOENT. En este caso se salva el contenido inicial almacenado en quizzes.
 * Si se produce otro tipo de error, se lanza una excepcíón que abortará 
 *  la ejecución del rpograma.
 */
 const load = () => {
 	fs.readFile(DB_FILENAME, (err,data) => {
 		if (err) {
 			// La primera vez no existe el fichero.
 			if (err.code === "ENOENT"){
 				save();	// valores iniciales.
 				return;
 			} 			throw err;
 		}
 		let json = JSON.parse(data);
 		if (json) {
 		quizzes = json;
 		}
 	});
 }; 

 /**
 * Guarda las preguntas en el fichero.
 *
 * Guarda en formato JSON el valor de quizzes en el fichero DB_FILENAME
 * Si se produce algún tipo de error, se lanza una excepción que 
 *  abortará la ejecución del prgrama.
 */
 const save = () => {
	fs.writeFile(DB_FILENAME,
		JSON.stringify(quizzes),
		err => {
			if (err) throw err;
		});
};


 /**
 * Devuelve el numero total de preguntas existentes.
 * 
 * @returns {number} número total de preguntas existentes.
 */
 // antes, const count =...
 exports.count = () => quizzes.length;


 /**
 * Añade un nuevo quiz.
 * 
 * @param question 	String con la pregunta.
 * @param answer 	String con la respuesta.
 */
exports.add = (question, answer) => {
 	quizzes.push({
 		question: (question || "").trim(),
 		answer : (answer || "").trim()
 	});
 	save();	
 };


/**
 * Actualiza el quiz situado en la posicion index.
 * 
 * @param id 		Clave que identifica el quiz a actualizar.
 * @param question	String con la pregunta.
 * @param answer   	String con la respuesta.
 */
exports.update = (id, question, answer) => {
	const quiz = quizzes[id];
	if (typeof quiz === "undefined") {
		throw new Error(`El valor del parámetro id no es válido.`);
	}
	quizzes.splice(id, 1, {
		question: (question || "").trim(),
 		answer : (answer || "").trim()
	});
	save();
};


/**bold
 * Devuelve todos los quizzes existentes.
 * 
 * Devuelve un clon del valor guardad en la variable quizzes,
 * es decir devuelve un objeto con todas las preguntas existentes.
 * Para clonar quizzes se una stringfy + parse.
 *
 * @return {any}
 */
exports.getAll = () => JSON.parse(JSON.stringify(quizzes));


 /**
 * Devuelve un clon del quiz almacenado en la posicion dada.
 * 
 * Para clonar quizzes se una stringfy + parse.
 * 
 * @param id Clave que identifica el quiz a devulver.
 * @return {any}
 */
exports.getByIndex = id => {
 	const quiz = quizzes[id];
 	if (typeof quiz === "undefined") {
		throw new Error(`El valor del parámetro id no es válido.`);
	}
	return JSON.parse(JSON.stringify(quiz));
 };


 /**
 * 
 * Elimina el quiz situado en la posicion index.
 * 
 * @param id Clave que identifica el quiz a borrar.		
 */
exports.deleteByIndex = id => {
	const quiz = quizzes[id];
	if (typeof quiz === "undefined") {
		throw new Error(`El valor del parámetro id no es válido.`);
	}
	quizzes.splice(id, 1);
	save();
};


// Carga los quizzes almacenados en el fichero.
load();