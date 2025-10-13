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
    console.log("Quiz iniciado!");  // Debug: Confirma start
    // Toca o som do feitiço sem interromper a música de fundo
    const spellSound = new Audio('audio/magic-spell.mp3');
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
        const spellSound = new Audio('audio/magic-spell.mp3');
        spellSound.play();
    }

    if (currentIndex < questions.length - 1) {
        currentIndex++;
        loadQuestion();
        // Toca o som do feitiço sem interromper a música de fundo
        const spellSound = new Audio('audio/magic-spell.mp3');
    } 
    else {
        finish();
    }
}

// Função auxiliar para trocar a imagem do personagem baseada no score (com ocultação suave)
function trocarImagemPersonagem(score) {
    console.log("Função trocarImagemPersonagem chamada com score:", score);  // Debug: Confirma chamada
    const personagemI = document.getElementById('personagemI')
    const personagemImg = document.getElementById('personagemImg');
    if (!personagemImg) {
        console.warn("Elemento de imagem do personagem não encontrado! Adicione <img id='personagemImg'> no HTML.");
        return;
    }
    console.log("Elemento personagemImg encontrado:", personagemImg.src);  // Debug: Mostra src atual

    let novaImagem = 'IMG/Merlin_Kids.png';  // Padrão (inicial, mas será ocultada se trocar)
    let novaAlt = 'Personagem Normal';
    let animacao = '';

    if (score >= 70) {
        novaImagem = 'IMG/Merlin_Win.png';  // Imagem de sucesso
        novaAlt = 'Personagem Vencedor';
        animacao = 'scale(1.09)';  // Animação de vitória (aumenta ligeiramente)
    } else {
        novaImagem = 'IMG/Merlin.png';  // Imagem de "derrota" ou normal alternativa
        novaAlt = 'Personagem em Treinamento';
        animacao = 'scale(0.9)';  // Animação de "fracasso" (reduz ligeiramente)
    }

    // Passo 1: Oculta a imagem atual suavemente (fade out da Merlin_Kids.png ou atual)
    personagemI.style.opacity = '0';  // Torna invisível
    console.log("Imagem atual ocultada (opacity: 0)");  // Debug

    // Passo 2: Após uma breve pausa (para o fade out completar), troca o src e anima
    setTimeout(() => {
        // Troca o src e alt
        personagemImg.src = novaImagem;
        personagemImg.alt = novaAlt;
        personagemImg.style.transform = animacao;
        personagemImg.style.transition = 'opacity 0.5s ease, transform 0.5s ease';  // Transições para ambos

        // Passo 3: Revela a nova imagem (fade in)
        personagemImg.style.opacity = '1';  // Torna visível novamente
        console.log(`Nova imagem revelada: ${novaImagem} (Score: ${score}%)`);  // Debug: Confirma revelação
    }, 300);  // Pausa de 300ms (meio segundo) para o fade out; ajuste se quiser mais rápido/lento (ex: 200ms)
}

function finish() {
    console.log("Função finish chamada! Calculando score...");  // Debug: Confirma finish
    
    // Oculta o container inteiro das questões
    const questionContainer = document.querySelector(".question");
    questionContainer.style.display = "none";
    
    // Mostra a tela de finalização
    contentFinish.style.display = "flex";

    const score = ((questionsCorrect / questions.length) * 100).toFixed(2);
    console.log("Score calculado:", score, "Acertos:", questionsCorrect);  // Debug: Mostra score
    
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

    // Atualiza a mensagem com menção à mudança do personagem (opcional)
    textFinish.innerHTML = `Você acertou ${questionsCorrect} de ${questions.length}<br>${message}<br><br>`;

    // Chama a função para trocar a imagem do personagem
    trocarImagemPersonagem(score);
}

btnRestart.onclick = () => {
    console.log("Botão reiniciar clicado!");  // Debug: Confirma reinício
    content.style.display = "block";
    contentFinish.style.display = "none";
    
    // Opcional: Reseta a imagem do personagem ao reiniciar
    const personagemI = document.getElementById('personagemI')
    const personagemImg = document.getElementById('personagemImg');
    if (personagemImg) {
        personagemImg.src = 'IMG/Merlin_kids.png';  // Corrigi para a inicial (era Merlin.png)
        personagemImg.alt = 'Personagem Normal';
        personagemI.style.opacity = '1';  // Torna visível
        personagemImg.style.transform = 'scale(1)';  // Reseta animação
        console.log("Imagem resetada para inicial.");  // Debug
    }
    
    // Reinicia o quiz
    startQuiz();
};

// Expor a função startQuiz globalmente
window.startQuiz = startQuiz;

// Função para preload do vídeo (mantida original)
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

// Event listener único para DOMContentLoaded (mesclado para evitar duplicatas)
document.addEventListener('DOMContentLoaded', function() {
    console.log("Página carregada! Iniciando preload e áudio.");  // Debug: Confirma carregamento
    preloadVideo();
    
    const backgroundMusic = document.getElementById('sound');
    // Tenta reproduzir o áudio após interação do usuário
    document.body.addEventListener('click', function() {
        if (backgroundMusic) {
            backgroundMusic.muted = false;
            backgroundMusic.play();
        }
    }, { once: true }); // once: true garante que o evento só será executado uma vez
});
