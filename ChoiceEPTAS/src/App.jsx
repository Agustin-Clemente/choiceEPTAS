import React, { useState } from 'react';

const App = () => {
  const [questions, setQuestions] = useState([
    {
      text: "¿Cuál es la principal vía de transmisión de la Trichinellosis en humanos?",
      options: [
        "Ingesta de agua contaminada con quistes.",
        "Consumo de carne de cerdo o jabalí cruda o poco cocida con larvas 1 enquistadas.",
        "Contacto directo con heces de perros infectados.",
        "Ingesta de huevos en vegetales mal lavados."
      ],
      correctAnswer: "Consumo de carne de cerdo o jabalí cruda o poco cocida con larvas 1 enquistadas."
    },
    {
      text: "La Toxoplasmosis es causada por un parásito llamado Toxoplasma gondii. ¿Cuál de las siguientes es una fuente común de infección alimentaria para los humanos?",
      options: [
        "Mariscos crudos de aguas contaminadas.",
        "Carne poco cocida (especialmente de cordero, cerdo o bovino) con quistes.",
        "Leche pasteurizada de vacas infectadas.",
        "Pescado crudo de agua dulce."
      ],
      correctAnswer: "Carne poco cocida (especialmente de cordero, cerdo o bovino) con quistes."
    },
    {
      text: "¿Cómo puede contagiarse la hidatidosis un humanos?",
      options: [
        "Por consumo de vísceras de rumiantes con quistes hidatídicos",
        "Por contacto directo con rumiantes infectados.",
        "Por la ingesta de carne vacuna poco cocida con cisticercos.",
        "Por la ingestión de alimentos contaminados con huevos de Echinococcus granulosus."
      ],
      correctAnswer: "Por la ingestión de alimentos contaminados con huevos de Echinococcus granulosus."
    },
    {
      text: "¿Cómo se transmite principalmente la giardiasis a través de los alimentos?",
      options: [
        "Por el consumo de pescado crudo con trofozoitos enquistados.",
        "Por la ingesta de frutas, verduras o agua contaminadas con quistes de Giardia spp.",
        "Por el consumo de carne de ave poco cocida con trofozoitos enquistados.",
        "Por el consumo de carne de cerdo poco cocida con trofozoitos enquistados."
      ],
      correctAnswer: "Por la ingesta de frutas, verduras o agua contaminadas con quistes de Giardia spp."
    },
    {
      text: "La Neurocisticercosis humana es una enfermedad parasitaria causada por la ingestión de qué estadío de Taenia solium?",
      options: [
        "Cisticercoides en carne de cerdo.",
        "Cisticerco en carne vacuna.",
        "Cisticerco en vegetales contaminados.",
        "Huevos de Taenia solium en alimentos contaminados."
      ],
      correctAnswer: "Huevos de Taenia solium en alimentos contaminados."
    },
    {
      text: "¿Cómo puede un humano infectarse con Fasciola hepatica?",
      options: [
        "Por consumir plantas acuáticas contaminadas, como berros o lechugas, que contienen metacercarias.",
        "Por la ingestión del caracol Lymnaea viatrix.",
        "Por el contacto directo con agua contaminada con huevos de Fasciola hepatica.",
        "Por la ingestión de huevos en alimentos contaminados."
      ],
      correctAnswer: "Por consumir plantas acuáticas contaminadas, como berros o lechugas, que contienen metacercarias."
    }
  ]);

  // Índice de la pregunta actual
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Respuesta seleccionada por el usuario
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // Mensaje de retroalimentación (correcto/incorrecto)
  const [feedback, setFeedback] = useState('');
  // Estado para indicar si el quiz ha terminado
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswerClick = (answer) => {
    // Si ya se seleccionó una respuesta o el quiz terminó, no hacer nada
    if (selectedAnswer !== null || quizFinished) {
      return;
    }

    setSelectedAnswer(answer); 
    const currentQuestion = questions[currentQuestionIndex];

    if (answer === currentQuestion.correctAnswer) {
      setFeedback('¡Correcto! Muy bien.');
 
      if (window.confetti) {
        window.confetti({
          particleCount: 100, // Número de partículas de confeti
          spread: 70,         // Amplitud de la explosión
          origin: { y: 0.6 }  // Origen del confeti (ligeramente por encima del centro de la pantalla)
        });
      }
    } else {
      setFeedback('Incorrecto. La respuesta correcta era: ' + currentQuestion.correctAnswer);
    }
  };

  // Función para avanzar a la siguiente pregunta
  const handleNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex); 
      setSelectedAnswer(null); 
      setFeedback(''); 
    } else {
      setQuizFinished(true); 
      setFeedback('¡Quiz Completado!');
    }
  };

  // Función para reiniciar el quiz
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setFeedback('');
    setQuizFinished(false);
  };

  // Función para determinar el estilo de cada opción de respuesta
  const getAnswerStyle = (option) => {
    let baseStyle = "w-full p-4 my-2 rounded-xl text-left cursor-pointer transition-all duration-300 ease-in-out font-inter";
    if (selectedAnswer !== null) {
      if (option === questions[currentQuestionIndex].correctAnswer) {
        return `${baseStyle} bg-emerald-600 text-white shadow-lg`; 
      } else if (selectedAnswer === option) {
        return `${baseStyle} bg-rose-700 text-white shadow-lg`;
      }
      // Para las opciones no seleccionadas después de una respuesta, mantienen el estilo violeta si no son la correcta
      return `${baseStyle} bg-violet-800 text-gray-200`;
    }
    // Estilo por defecto antes de que se seleccione una respuesta
    return `${baseStyle} bg-violet-800 text-gray-200 hover:bg-violet-700 hover:text-white shadow-md`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 to-purple-900 flex items-center justify-center p-4">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          body {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>
      <div className="bg-gradient-to-br from-violet-900 to-purple-800 p-8 rounded-2xl shadow-2xl max-w-xl w-full mx-auto border border-violet-700">
        <div className="mb-8 text-center">
          {!quizFinished ? (
            <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-300 to-purple-300 leading-tight mb-4 font-inter">
              {questions[currentQuestionIndex].text}
            </h1>
          ) : (
            <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-300 to-purple-300 leading-tight mb-4 font-inter">
              ¡Quiz Completado!
            </h1>
          )}
        </div>

        {!quizFinished && (
          <div className="flex flex-col items-center">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                className={getAnswerStyle(option)}
                onClick={() => handleAnswerClick(option)}
                disabled={selectedAnswer !== null} 
              >
                <span className="flex items-center">
                  <span className="mr-3 text-lg font-bold">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </span>
              </button>
            ))}
          </div>
        )}

        {feedback && (
          <div className={`mt-6 p-4 rounded-xl text-center text-lg font-semibold ${
            selectedAnswer === questions[currentQuestionIndex]?.correctAnswer ? 'bg-emerald-700' : 'bg-rose-700'
          } text-white shadow-inner`}>
            {feedback}
          </div>
        )}

        {selectedAnswer !== null && !quizFinished && (
          <div className="mt-8 text-center">
            <button
              onClick={handleNextQuestion}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Siguiente Pregunta
            </button>
          </div>
        )}

        {quizFinished && (
          <div className="mt-8 text-center">
            <button
              onClick={handleRestartQuiz}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-full shadow-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Reiniciar Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
