// ===== DARK MODE =====
function alternarDarkMode() {
  document.body.classList.toggle('dark');

  // Salva a preferência no navegador
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('tema', 'dark');
    document.getElementById('btn-dark').textContent = '☀️ Claro';
  } else {
    localStorage.setItem('tema', 'claro');
    document.getElementById('btn-dark').textContent = '🌙 Escuro';
  }
}

// ===== TAMANHO DA FONTE =====
let tamanhoFonte = 16; // tamanho padrão em pixels

function aumentarFonte() {
  if (tamanhoFonte < 24) {
    tamanhoFonte += 2;
    document.body.style.fontSize = tamanhoFonte + 'px';
  }
}

function diminuirFonte() {
  if (tamanhoFonte > 12) {
    tamanhoFonte -= 2;
    document.body.style.fontSize = tamanhoFonte + 'px';
  }
}

// ===== VALIDAÇÃO DO FORMULÁRIO DE CONTATO =====
function validarFormulario(evento) {
  // Evita o formulário de recarregar a página
  evento.preventDefault();

  // Limpa erros anteriores
  limparErros();

  let valido = true;

  // Pega os campos
  const nome = document.getElementById('nome');
  const email = document.getElementById('email');
  const assunto = document.getElementById('assunto');
  const mensagem = document.getElementById('mensagem');

  // Valida Nome
  if (nome.value.trim() === '') {
    mostrarErro(nome, 'Por favor, informe seu nome.');
    valido = false;
  }

  // Valida Email
  if (email.value.trim() === '') {
    mostrarErro(email, 'Por favor, informe seu e-mail.');
    valido = false;
  } else if (!email.value.includes('@') || !email.value.includes('.')) {
    mostrarErro(email, 'Por favor, informe um e-mail válido.');
    valido = false;
  }

  // Valida Assunto
  if (assunto.value.trim() === '') {
    mostrarErro(assunto, 'Por favor, informe o assunto.');
    valido = false;
  }

  // Valida Mensagem
  if (mensagem.value.trim() === '') {
    mostrarErro(mensagem, 'Por favor, escreva sua mensagem.');
    valido = false;
  } else if (mensagem.value.trim().length < 10) {
    mostrarErro(mensagem, 'A mensagem deve ter pelo menos 10 caracteres.');
    valido = false;
  }

  // Se tudo estiver válido, mostra mensagem de sucesso
  if (valido) {
    document.getElementById('msg-sucesso').style.display = 'block';
    document.getElementById('form-contato').reset();
  }
}

// Função auxiliar: mostra erro em um campo
function mostrarErro(campo, texto) {
  campo.classList.add('campo-erro');
  const erro = document.createElement('span');
  erro.className = 'msg-erro';
  erro.textContent = texto;
  campo.parentNode.appendChild(erro);
}

// Função auxiliar: limpa todos os erros
function limparErros() {
  document.querySelectorAll('.campo-erro').forEach(function(campo) {
    campo.classList.remove('campo-erro');
  });
  document.querySelectorAll('.msg-erro').forEach(function(msg) {
    msg.remove();
  });
  const sucesso = document.getElementById('msg-sucesso');
  if (sucesso) sucesso.style.display = 'none';
}

// ===== CARREGA PREFERÊNCIAS AO ABRIR A PÁGINA =====
window.addEventListener('load', function() {
  // Restaura o tema salvo
  const temaSalvo = localStorage.getItem('tema');
  if (temaSalvo === 'dark') {
    document.body.classList.add('dark');
    const btnDark = document.getElementById('btn-dark');
    if (btnDark) btnDark.textContent = '☀️ Claro';
  }

  // Liga a validação do formulário (só na página de contato)
  const form = document.getElementById('form-contato');
  if (form) {
    form.addEventListener('submit', validarFormulario);
  }
});