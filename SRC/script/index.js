import questions from './questions.js';

const questionElement = document.querySelector(".question-text");
const answersElement = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");

let currentIndex = 0;
let questionsCorrect = 0;

function startQuiz() {
    // Toca o som do feitiço sem interromper a música de fundo
    const spellSound = new Audio('/SRC/audio/magic-spell.mp3');
    spellSound.play();
    
    // Garante que a música de fundo continue tocando
    const backgroundMusic = document.getElementById('sound');
    if (backgroundMusic) {
        backgroundMusic.play();
    }
    
    content.style.display = "none";
    const questionContainer = document.querySelector(".question");
    questionContainer.style.display = "flex";
    currentIndex = 0;
    questionsCorrect = 0;
    loadQuestion();
}

function loadQuestion() {
    spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
    const item = questions[currentIndex];
    answersElement.innerHTML = "";
    questionElement.innerHTML = item.question;

    item.answers.forEach((answer) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <button class="answer" data-correct="${answer.correct}">
            ${answer.option}
        </button>
        `;

        answersElement.appendChild(div);
    });

    document.querySelectorAll(".answer").forEach((item) => {
        item.addEventListener("click", nextQuestion);
    });
}

function nextQuestion(e) {
    if (e.target.getAttribute("data-correct") === "true") {
        questionsCorrect++;
        // Toca o som do feitiço sem interromper a música de fundo
        const spellSound = new Audio('/SRC/audio/magic-spell.mp3');
        spellSound.play();
    }

    if (currentIndex < questions.length - 1) {
        currentIndex++;
        loadQuestion();
        // Toca o som do feitiço sem interromper a música de fundo
        const spellSound = new Audio('/SRC/audio/magic-spell.mp3');
    } 
    else {
        finish();
    }
}

function finish() {
    // Oculta o container inteiro das questões
    const questionContainer = document.querySelector(".question");
    questionContainer.style.display = "none";
    
    // Mostra a tela de finalização
    contentFinish.style.display = "flex";

    const score = ((questionsCorrect / questions.length) * 100).toFixed(2);
    
    let message = '';
    if (score === 100) {
        message = 'Parabéns! Você é um verdadeiro mestre da magia!';
    } else if (score >= 70) {
        message = 'Muito bom! Você tem um grande potencial mágico!';
    } else if (score >= 50) {
        message = 'Bom trabalho! Continue estudando as artes místicas.';
    } else {
        message = 'Continue praticando. A magia requer dedicação!';
    }

    textFinish.innerHTML = `Você acertou ${questionsCorrect} de ${questions.length}<br>${message}`;
}

btnRestart.onclick = () => {
    content.style.display = "block";
    contentFinish.style.display = "none";
};

// Expor a função startQuiz globalmente
window.startQuiz = startQuiz;

// Adicione logo após as importações
document.addEventListener('DOMContentLoaded', function() {
    const backgroundMusic = document.getElementById('sound');
    // Tenta reproduzir o áudio após interação do usuário
    document.body.addEventListener('click', function() {
        backgroundMusic.muted = false;
        backgroundMusic.play();
    }, { once: true }); // once: true garante que o evento só será executado uma vez
});


function preloadVideo() {
    // Cria um elemento de overlay para a tela de carregamento
    const loadingOverlay = document.createElement('div');
    loadingOverlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: black; display: flex; justify-content: center; align-items: center; z-index: 9999;';
    loadingOverlay.innerHTML = '<div style="color: white; font-size: 24px;">Carregando...</div>';
    document.body.appendChild(loadingOverlay);

    // Seleciona o vídeo
    const video = document.querySelector('video');

    // Função para remover o overlay quando o vídeo estiver pronto
    function removeOverlay() {
        loadingOverlay.remove();
        video.play();
    }

    // Verifica se o vídeo já está em buffer
    if (video.readyState >= 3) {
        removeOverlay();
    } else {
        // Adiciona evento para quando o vídeo estiver pronto para reprodução
        video.addEventListener('canplay', removeOverlay, { once: true });
    }
}

// Adiciona o evento DOMContentLoaded para chamar a função quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    preloadVideo();
    const backgroundMusic = document.getElementById('sound');
    // Tenta reproduzir o áudio após interação do usuário
    document.body.addEventListener('click', function() {
        backgroundMusic.muted = false;
        backgroundMusic.play();
    }, { once: true }); // once: true garante que o evento só será executado uma vez
});