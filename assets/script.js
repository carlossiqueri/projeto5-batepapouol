function serverPosResponse (response){
    console.log(response.data);
}

function serverBadResponse (erro){
    console.log(erro);
    if (erro.response.status == '400'){
        alert('Nome de usuário já está em uso! \nInsira um nome válido.')
        document.location.reload(true);
    }
}

document.querySelector('main input').addEventListener('keydown', function(e){
    if(e.keyCode === 13){
        e.preventDefault();
        user();
    }
})

function user(entrar) {
    const logoInicial = document.querySelector('main img');
    const inputInicial = document.querySelector('main input');
    const buttonInicial = document.querySelector('main button');



    const userName = {name:inputInicial.value}
    
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants ', userName);
    promise.then(serverPosResponse);
    promise.catch(serverBadResponse);

    logoInicial.classList.add('hidden');
    inputInicial.classList.add('hidden');
    buttonInicial.classList.add('hidden');

    function loadingScreenOn (){
        const loading = document.querySelector('.loading');
        loading.classList.remove('hidden');
    }
    function loadingScreenOff (){
        const loading = document.querySelector('.loading');
        loading.classList.add('hidden');
        checker = false;
        
    }

    loadingScreenOn();
    setTimeout(loadingScreenOff, 2000);
    setTimeout(messageContainer, 2000);

    function messageContainer (){  
        const header = document.querySelector('header div');
        const logs = document.querySelector('.messageLog');
        const messages = document.querySelector('footer div');

        header.classList.remove('hidden');
        logs.classList.remove('hidden');
        messages.classList.remove('hidden');
}
}

function send(sendMessage) {
    const message = document.querySelector('footer input').value;
}
