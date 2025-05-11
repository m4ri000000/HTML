from flask import Flask, jsonify, request  # Add 'request' import here
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Sample trivia questions
trivia_questions = [
    {
        "id": 1,
        "question": "What is the name of the paradox that demonstrates the problem of infinity by imagining a hotel with infinite rooms?",
        "options": ["Zeno's Paradox", "Hilbert's Hotel", "Russell's Paradox", "Fermat's Paradox"],
        "answer": "Hilbert's Hotel"
    },
    {
        "id": 2,
        "question": "Which philosopher's 'Categorical Imperative' forms the foundation of deontological ethics?",
        "options": ["Plato", "Immanuel Kant", "John Stuart Mill", "Aristotle"],
        "answer": "Immanuel Kant"
    },
    {
        "id": 3,
        "question": "What is the name of the mathematical hypothesis that states every even number greater than 2 is the sum of two prime numbers?",
        "options": ["Goldbach's Conjecture", "Fermat's Last Theorem", "Twin Prime Conjecture", "Riemann Hypothesis"],
        "answer": "Goldbach's Conjecture"
    },
    {
        "id": 4,
        "question": "What does the Heisenberg Uncertainty Principle state?",
        "options": [
            "The speed of light is constant in all frames",
            "Time slows down near a black hole",
            "It is impossible to know both the position and momentum of a particle simultaneously",
            "Particles can be in two states at once"
        ],
        "answer": "It is impossible to know both the position and momentum of a particle simultaneously"
    },
    {
        "id": 5,
        "question": "What is the smallest unit of information in quantum computing?",
        "options": ["Byte", "Qubit", "Bit", "Quantum Register"],
        "answer": "Qubit"
    },
    {
        "id": 6,
        "question": "Which branch of mathematics deals with the properties of space that are preserved under continuous transformations?",
        "options": ["Topology", "Calculus", "Algebra", "Geometry"],
        "answer": "Topology"
    },
    {
        "id": 7,
        "question": "Which element has the highest melting point?",
        "options": ["Carbon", "Iron", "Tungsten", "Osmium"],
        "answer": "Tungsten"
    },
    {
        "id": 8,
        "question": "What name is given to the hypothetical particles that travel faster than light?",
        "options": ["Bosons", "Tachyons", "Photons", "Gravitons"],
        "answer": "Tachyons"
    },
    {
        "id": 9,
        "question": "What is Gödel’s Incompleteness Theorem about?",
        "options": [
            "The unpredictability of prime numbers",
            "The uncertainty in quantum systems",
            "Limits of provability in formal mathematical systems",
            "The behavior of chaotic systems"
        ],
        "answer": "Limits of provability in formal mathematical systems"
    },
    {
        "id": 10,
        "question": "Which Roman emperor is known for writing 'Meditations', a key text in Stoic philosophy?",
        "options": ["Marcus Aurelius", "Augustus", "Nero", "Hadrian"],
        "answer": "Marcus Aurelius"
    },
    {
        "id": 11,
        "question": "Which 20th-century physicist proposed the many-worlds interpretation of quantum mechanics?",
        "options": ["Erwin Schrödinger", "Niels Bohr", "Hugh Everett", "Richard Feynman"],
        "answer": "Hugh Everett"
    },
    {
        "id": 12,
        "question": "In which country did the Neolithic site of Göbekli Tepe originate?",
        "options": ["Turkey", "Iran", "Iraq", "Syria"],
        "answer": "Turkey"
    },
    {
        "id": 13,
        "question": "Which Greek mathematician is credited with the first formal proof of the infinitude of prime numbers?",
        "options": ["Euclid", "Pythagoras", "Archimedes", "Eratosthenes"],
        "answer": "Euclid"
    },
    {
        "id": 14,
        "question": "Which branch of philosophy is concerned with the nature and scope of knowledge?",
        "options": ["Ontology", "Aesthetics", "Epistemology", "Ethics"],
        "answer": "Epistemology"
    },
    {
        "id": 15,
        "question": "Which law in physics relates entropy to the number of microscopic configurations?",
        "options": ["Newton's Second Law", "Planck's Law", "Boltzmann's Entropy Formula", "Maxwell's Equation"],
        "answer": "Boltzmann's Entropy Formula"
    },
    {
        "id": 16,
        "question": "Which ancient text is considered the foundational work of Ayurvedic medicine?",
        "options": ["Bhagavad Gita", "Charaka Samhita", "Rigveda", "Upanishads"],
        "answer": "Charaka Samhita"
    },
    {
        "id": 17,
        "question": "What is the term for the capacity of a system to perform work due to its temperature?",
        "options": ["Kinetic Energy", "Thermal Energy", "Free Energy", "Entropy"],
        "answer": "Free Energy"
    },
    {
        "id": 18,
        "question": "Which language is the closest living relative of Latin?",
        "options": ["Italian", "Romanian", "Spanish", "French"],
        "answer": "Romanian"
    },
    {
        "id": 19,
        "question": "Which civilization is credited with creating the first writing system?",
        "options": ["Egyptian", "Chinese", "Sumerian", "Harappan"],
        "answer": "Sumerian"
    },
    {
        "id": 20,
        "question": "What is the main premise of Occam’s Razor in scientific reasoning?",
        "options": [
            "More data is always better than less",
            "Theories must be falsifiable",
            "The simplest solution is often the correct one",
            "Complex systems are more likely to be correct"
        ],
        "answer": "The simplest solution is often the correct one"
    },
    {
        "id": 21,
        "question": "What is the term for materials that exhibit zero electrical resistance below a critical temperature?",
        "options": ["Superfluid", "Superconductor", "Bose–Einstein Condensate", "Dielectric"],
        "answer": "Superconductor"
    },
    {
        "id": 22,
        "question": "Which mathematician proved that there are infinitely many prime numbers of the form 4n + 3?",
        "options": ["Euler", "Dirichlet", "Gauss", "Fermat"],
        "answer": "Dirichlet"
    },
    {
        "id": 23,
        "question": "What is the name of the 1935 thought experiment that challenged the Copenhagen interpretation of quantum mechanics?",
        "options": ["Schrödinger’s Cat", "EPR Paradox", "Bell’s Theorem", "Double-Slit Experiment"],
        "answer": "EPR Paradox"
    },
    {
        "id": 24,
        "question": "In differential geometry, what is the name of the measure of how a surface deviates from being flat?",
        "options": ["Gaussian curvature", "Ricci flow", "Christoffel symbols", "Levi-Civita connection"],
        "answer": "Gaussian curvature"
    },
    {
        "id": 25,
        "question": "Which Byzantine emperor commissioned the codification known as the 'Corpus Juris Civilis'?",
        "options": ["Justinian I", "Heraclius", "Constantine the Great", "Leo III"],
        "answer": "Justinian I"
    },
    {
        "id": 26,
        "question": "Which theorem states that every area-preserving continuous map of a disk that rotates the boundary by a nonzero angle has at least two fixed points?",
        "options": ["Brouwer Fixed Point Theorem", "Poincaré–Birkhoff Theorem", "Banach Fixed Point Theorem", "Noether’s Theorem"],
        "answer": "Poincaré–Birkhoff Theorem"
    },
    {
        "id": 27,
        "question": "What is the name of the RNA molecule that carries amino acids to the ribosome during translation?",
        "options": ["mRNA", "rRNA", "tRNA", "snRNA"],
        "answer": "tRNA"
    },
    {
        "id": 28,
        "question": "Which psychologist developed the hierarchy of needs culminating in self-actualization?",
        "options": ["Sigmund Freud", "Jean Piaget", "Abraham Maslow", "B.F. Skinner"],
        "answer": "Abraham Maslow"
    },
    {
        "id": 29,
        "question": "In topology, what is a space called if every continuous bijection from it to any compact Hausdorff space is a homeomorphism?",
        "options": ["Compact space", "Connected space", "Locally compact space", "Sequentially compact space"],
        "answer": "Sequentially compact space"
    },
    {
        "id": 30,
        "question": "Who first articulated the principle that light can be considered both a wave and a particle, known as wave–particle duality?",
        "options": ["Albert Einstein", "Louis de Broglie", "Max Planck", "Niels Bohr"],
        "answer": "Louis de Broglie"
    },
    {
        "id": 31,
        "question": "Which historian wrote 'The History of the Peloponnesian War' in the 5th century BCE?",
        "options": ["Herodotus", "Thucydides", "Xenophon", "Plutarch"],
        "answer": "Thucydides"
    },
    {
        "id": 32,
        "question": "What is the name of the process by which plants convert light energy into chemical energy?",
        "options": ["Chemosynthesis", "Respiration", "Photosynthesis", "Fermentation"],
        "answer": "Photosynthesis"
    },
    {
        "id": 33,
        "question": "Which branch of mathematics studies the properties of integer-valued functions and divisibility?",
        "options": ["Abstract algebra", "Number theory", "Real analysis", "Complex analysis"],
        "answer": "Number theory"
    },
    {
        "id": 34,
        "question": "What is the term for the phenomenon where a small change in initial conditions leads to vastly different outcomes in a dynamic system?",
        "options": ["Equilibrium", "Resonance", "Chaos", "Bifurcation"],
        "answer": "Chaos"
    },
    {
        "id": 35,
        "question": "Which philosopher argued that existence precedes essence in works like 'Being and Nothingness'?",
        "options": ["Martin Heidegger", "Jean-Paul Sartre", "Simone de Beauvoir", "Karl Jaspers"],
        "answer": "Jean-Paul Sartre"
    },
    {
        "id": 36,
        "question": "In computer science, what is the name of the algorithmic paradigm that solves problems by combining solutions to subproblems (e.g., mergesort)?",
        "options": ["Greedy algorithms", "Divide and conquer", "Dynamic programming", "Backtracking"],
        "answer": "Divide and conquer"
    },
    {
        "id": 37,
        "question": "Which hormone regulates the sleep–wake cycle and is produced by the pineal gland?",
        "options": ["Cortisol", "Melatonin", "Serotonin", "Dopamine"],
        "answer": "Melatonin"
    },
    {
        "id": 38,
        "question": "Who formulated the law of universal gravitation and three laws of motion?",
        "options": ["Galileo Galilei", "Isaac Newton", "Johannes Kepler", "Christiaan Huygens"],
        "answer": "Isaac Newton"
    },
    {
        "id": 39,
        "question": "In linguistics, what term describes the smallest unit of meaning in a language?",
        "options": ["Phoneme", "Morpheme", "Grapheme", "Syntax"],
        "answer": "Morpheme"
    },
    {
        "id": 40,
        "question": "Which computer scientist is credited with the concept of a universal computing machine formalized in 1936?",
        "options": ["Alan Turing", "John von Neumann", "Alonzo Church", "Claude Shannon"],
        "answer": "Alan Turing"
    }
]

# Route to fetch all questions
@app.route('/questions', methods=['GET'])
def get_questions():
    # return the full objects, including the correct answer
    return jsonify(trivia_questions)

# Route to fetch a single question by its ID
@app.route('/questions/<int:question_id>', methods=['GET'])
def get_question(question_id):
    question = next((q for q in trivia_questions if q['id'] == question_id), None)
    if question:
        return jsonify(question)
    else:
        return jsonify({"error": "Question not found"}), 404

# Route to check the user's answer for a given question
@app.route("/questions/<int:question_id>/check", methods=["POST"])
def check_answer(question_id):
    data = request.get_json()  # Get data from the request body
    user_answer = data.get("answer")
    question = next((q for q in trivia_questions if q["id"] == question_id), None)

    if not question:
        return jsonify({"error": "Question not found"}), 404

    is_correct = user_answer.strip().lower() == question["answer"].lower()  # Check if the answer matches
    return jsonify({"correct": is_correct})

# Route to add a new question to the trivia
@app.route("/questions", methods=["POST"])
def add_question():
    data = request.get_json()
    new_question = {
        "id": len(trivia_questions) + 1,
        "question": data["question"],
        "options": data["options"],
        "answer": data["answer"]
    }
    trivia_questions.append(new_question)
    return jsonify(new_question), 201

if __name__ == "__main__":
    app.run(debug=True)
