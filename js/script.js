//  MODO ESCURO 
function alternarDarkMode() {
  document.body.classList.toggle('dark');

  if (document.body.classList.contains('dark')) {
    localStorage.setItem('tema', 'dark');
    document.getElementById('btn-dark').textContent = 'Claro';
  } else {
    localStorage.setItem('tema', 'claro');
    document.getElementById('btn-dark').textContent = 'Escuro';
  }
}

//  TAMANHO DA FONTE 
var tamanhoFonte = 16;

function aumentarFonte() {
  if (tamanhoFonte < 22) {
    tamanhoFonte = tamanhoFonte + 2;
    document.body.style.fontSize = tamanhoFonte + 'px';
  }
}

function diminuirFonte() {
  if (tamanhoFonte > 12) {
    tamanhoFonte = tamanhoFonte - 2;
    document.body.style.fontSize = tamanhoFonte + 'px';
  }
}

//  VALIDAÇÃO DO FORMULÁRIO DE CONTATO 
function validarForm(evento) {
  evento.preventDefault();

  // Pega os campos do formulário
  var nome = document.getElementById('nome');
  var email = document.getElementById('email');
  var assunto = document.getElementById('assunto');
  var mensagem = document.getElementById('mensagem');

  // Limpa mensagens de erro antigas
  var erros = document.querySelectorAll('.msg-erro');
  for (var i = 0; i < erros.length; i++) {
    erros[i].remove();
  }

  // Remove a borda vermelha de erro
  nome.classList.remove('campo-erro');
  email.classList.remove('campo-erro');
  assunto.classList.remove('campo-erro');
  mensagem.classList.remove('campo-erro');

  document.getElementById('msg-sucesso').style.display = 'none';

  var formularioValido = true;

  // Verifica o nome
  if (nome.value.trim() === '') {
    mostrarErro(nome, 'Informe seu nome.');
    formularioValido = false;
  }

  // Verifica o email
  if (email.value.trim() === '') {
    mostrarErro(email, 'Informe seu e-mail.');
    formularioValido = false;
  } else if (email.value.includes('@') === false || email.value.includes('.') === false) {
    mostrarErro(email, 'Informe um e-mail válido.');
    formularioValido = false;
  }

  // Verifica o assunto
  if (assunto.value.trim() === '') {
    mostrarErro(assunto, 'Informe o assunto.');
    formularioValido = false;
  }

  // Verifica a mensagem
  if (mensagem.value.trim() === '') {
    mostrarErro(mensagem, 'Escreva sua mensagem.');
    formularioValido = false;
  }

  // Se tudo estiver certo, mostra a mensagem de sucesso
  if (formularioValido === true) {
    document.getElementById('msg-sucesso').style.display = 'block';
    document.getElementById('form-contato').reset();
  }
}

// Função que mostra a mensagem de erro embaixo do campo
function mostrarErro(campo, texto) {
  campo.classList.add('campo-erro');

  var spanErro = document.createElement('span');
  spanErro.className = 'msg-erro';
  spanErro.textContent = texto;

  campo.parentNode.appendChild(spanErro);
}

// QUANDO A PÁGINA CARREGA 
window.addEventListener('load', function () {

  // Verifica se o tema escuro estava salvo
  if (localStorage.getItem('tema') === 'dark') {
    document.body.classList.add('dark');
    document.getElementById('btn-dark').textContent = 'Claro';
  }

  // Ativa a validação do formulário (se a página tiver formulário)
  var form = document.getElementById('form-contato');
  if (form != null) {
    form.addEventListener('submit', validarForm);
  }
});