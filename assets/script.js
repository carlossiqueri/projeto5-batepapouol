// variaveis referentes a tela de login
const logoInicial = document.querySelector("main img");
const inputInicial = document.querySelector("main input");
const buttonInicial = document.querySelector("main button");

// variaveis vazias
let users = [];
let messages = [];
let userName;

// adiciona ao enter a funcionalidade de clicar o botao de login
document.querySelector("main input").addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    user();
  }
});

// removendo a tela de login
function removeStartscreen() {
  logoInicial.classList.add("hidden");
  inputInicial.classList.add("hidden");
  buttonInicial.classList.add("hidden");
}
// função que salva o nome do usuário
function getUserName() {
  userName = { name: inputInicial.value };
}

// validando o nome do usuario no server
function serverName() {
  const promise = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/participants ",
    userName
  );
  promise.then(serverPosResponse);
  promise.catch(serverError);
}

function serverPosResponse(response) {
  console.log(response.data);
  users = userName;
  getMessages();
}

function serverError(erro) {
  console.log(erro);
  if (erro.response.status == "400") {
    alert("Nome de usuário já está em uso! \nInsira um nome válido.");
    document.location.reload(true);
  }
}

// verifica se o usuario está logado
function verifyLogin() {
  const loginStatus = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/status",
    userName
  );
  loginStatus.then(loginStatusResponse);
  loginStatus.catch(loginStatusError);
}

function loginStatusResponse(response) {
  console.log(response.data);
}

function loginStatusError(erro) {
  document.location.reload(true);
}

// adiciona tela de loading
function loadingScreenOn() {
  const loading = document.querySelector(".loading");
  loading.classList.remove("hidden");
}
function loadingScreenOff() {
  const loading = document.querySelector(".loading");
  loading.classList.add("hidden");
  checker = false;
}

// adiciona a tela de mensagens
function messageContainer() {
  const header = document.querySelector("header div");
  const logs = document.querySelector(".messageLog");
  const messages = document.querySelector("footer div");

  header.classList.remove("hidden");
  logs.classList.remove("hidden");
  messages.classList.remove("hidden");
}
//exibe mensagens na tela
function getMessages() {
  const serverMessages = axios.get(
    "https://mock-api.driven.com.br/api/v6/uol/messages"
  );
  serverMessages.then(serverMessagesResponse);
  serverMessages.catch(serverMessagesError);
}

function serverMessagesResponse(response) {
messages.push(response.data);
// showServerMessages();
}

function serverMessagesError(erro) {
  console.log(erro.data.status);
}

// Adicionando as mensagens a tela de mensagens
let chat = document.querySelector(".messageLog ul");
function showServerMessages() {
  chat.innerHTML = "";
  for (let i = 0; i < messages.length; i++) {
    console.log(messages[i]);
  }
}

// função de clique no botão da tela de login
function user(entrar) {
  getUserName();

  serverName();
  getMessages();
  setInterval(verifyLogin, 5000);

  removeStartscreen();

  loadingScreenOn();

  setTimeout(loadingScreenOff, 2000);
  setTimeout(messageContainer, 2000);

}

// funçao ao enviar mensagem

function send(sendMessage) {
  getUserName();
  const messageTyped = document.querySelector("footer input").value;
  let newMessage = {
    from: userName.name,
    to: "Todos",
    text: messageTyped,
    type: "message",
  };

  const promise = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/messages",
    newMessage
  );
  promise.then(sendMessageResponse);
  promise.catch(sendMessageError);
}

function sendMessageResponse(response) {
  getMessages();
}

function sendMessageError(error) {
  console.log(error.response.status);
}
