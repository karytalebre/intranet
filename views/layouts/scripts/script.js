// Selecione o botão de fechar
const closeButton = document.querySelector('#close-button');

// Adicione um manipulador de eventos de clique ao botão de fechar
closeButton.addEventListener('click', function() {
  // Selecione o elemento da mensagem e oculte-o
  const messageBox = document.querySelector('#message-box');
  messageBox.style.display = 'none';
});
