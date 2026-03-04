const questions = [
    "华 侨 旗 帜",
    "民 族 光 辉",
    "腐 败 无 能",
    "贫 穷 落 后",
    "深 刻 难 忘",
    "亲 自 批 准",
    "漂 洋 过 海",
    "独 资 创 办",
    "十 分 自 豪",
    "责 任 重 大",
    "十 分 朴 素",
    "精 茶 淡 饭",
    "十 分 简 朴",
    "民 族 奋 斗",
    "波 涛 汹 涌",
    "刻 苦 学 习",
    "机 智 幽 默",
    "任 何 事 情",
    "毫 无 表 情",
    "不 肯 放 弃",
    "无 动 于 哀",
    "哈 哈 大 笑"
];

let currentIndex = 0;
let shuffleHistory = [];
let score = 0;

function shuffle(array) {
  let shuffled = [...array];
  do {
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
  } while (shuffleHistory.includes(shuffled.join("|")));

  shuffleHistory.push(shuffled.join("|"));
  return shuffled;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const node = document.getElementById(data);
  ev.target.appendChild(node);
}

function renderQuestion() {
  shuffleHistory = [];
  document.getElementById("result").textContent = "";
  const words = questions[currentIndex].trim().split(" ");
  const scrambled = shuffle(words);

  const scrambledContainer = document.getElementById("scrambled-words");
  const dropZone = document.getElementById("drop-zone");

  scrambledContainer.innerHTML = "";
  dropZone.innerHTML = "";

  scrambled.forEach((word, index) => {
    const span = document.createElement("span");
    span.textContent = word;
    span.className = "word";
    span.id = `word-${index}`;
    span.draggable = true;
    span.ondragstart = drag;
    scrambledContainer.appendChild(span);
  });

  updateScore();
}

function shuffleCurrent() {
  const words = questions[currentIndex].trim().split(" ");
  const scrambled = shuffle(words);
  const scrambledContainer = document.getElementById("scrambled-words");
  scrambledContainer.innerHTML = "";

  scrambled.forEach((word, index) => {
    const span = document.createElement("span");
    span.textContent = word;
    span.className = "word";
    span.id = `word-${index}`;
    span.draggable = true;
    span.ondragstart = drag;
    scrambledContainer.appendChild(span);
  });

  document.getElementById("drop-zone").innerHTML = "";
  document.getElementById("result").textContent = "";
}

function checkAnswer() {
  const userWords = Array.from(document.getElementById("drop-zone").children).map(e => e.textContent);
  const correctWords = questions[currentIndex].trim().split(" ");
  const result = document.getElementById("result");

  if (userWords.length !== correctWords.length) {
    result.textContent = "❗ Susunan belum lengkap.";
    result.style.color = "orange";
    return;
  }

  const isCorrect = userWords.every((word, idx) => word === correctWords[idx]);

  if (isCorrect) {
    result.textContent = "✅ Benar!";
    result.style.color = "green";
    score++;
    updateScore();
  } else {
    result.textContent = "❌ Salah. Coba lagi!";
    result.style.color = "red";
    setTimeout(shuffleCurrent, 1000);
  }
}

function updateScore() {
  document.getElementById("score-value").textContent = score;
}

function nextQuestion() {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    renderQuestion();
  }
}

function prevQuestion() {
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion();
  }
}

window.onload = renderQuestion;
