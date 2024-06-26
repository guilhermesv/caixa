function carregando() {
  let imagens_total = 0;
  var imagens_carregadas = 0;

  //a function to execute when each image is loaded ("event handler")
  function imagem_carregada() {
      imagens_carregadas++;
      contagem_atualizar();
  }

  //a function which updates your message in the page
  function contagem_atualizar() {
      var status = document.querySelectorAll("#carregando_status div")[1];
      status.innerHTML = String(imagens_carregadas).padStart(3, '0') + '/' + imagens_total;
  }

  //get # of images on page and attach the OnLoad event handler
  var imagens = document.getElementsByTagName('img');
  imagens_total = imagens.length;
  for(var i=0;i<imagens.length;i++) {
    imagens[i].onload = imagem_carregada;
  }
}
carregando();

window.addEventListener("load", function () {
  console.log("Todos os recursos externos e conteúdo carregados.");
  drag_inicializar();
  interacao();
  centralizar();
});

function centralizar() {
  let caixa = document.getElementById("caixa");
  let midias = document.getElementById("midias");
  let midias_width = midias.offsetWidth;
  let midias_height = midias.offsetHeight;
  let caixa_width = caixa.offsetWidth;
  let caixa_height = caixa.offsetHeight;
  let scroll_x = midias_width / 2 - caixa_width / 2;
  let scroll_y = midias_height / 2 - caixa_height / 2;
  caixa.scrollTop = scroll_y;
  caixa.scrollLeft = scroll_x;
  caixa.classList.remove("carregando");
}

function drag_inicializar() {
  let myPage = document.getElementById("caixa");
  let isDragging = false;
  let startX, startY, scrollLeft, scrollTop;

  myPage.addEventListener("mousedown", function (e) {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    scrollLeft = myPage.scrollLeft;
    scrollTop = myPage.scrollTop;

    myPage.style.cursor = "grabbing";
    myPage.style.cursor = "-webkit-grabbing";
  });

  document.addEventListener("mousemove", function (e) {
    if (!isDragging) return;
    let x = e.clientX;
    let y = e.clientY;
    let walkX = (x - startX) * 1.5;
    let walkY = (y - startY) * 1.5;
    myPage.scrollLeft = scrollLeft - walkX;
    myPage.scrollTop = scrollTop - walkY;
  });

  document.addEventListener("mouseup", function () {
    isDragging = false;

    myPage.style.cursor = "grab";
    myPage.style.cursor = "-webkit-grab";
  });
}

function interacao() {
  const imagens = document.querySelectorAll(".midia-grid li");
  let contador = 0;
  const contagem_valor = document.querySelector(".contador-contagem");
  const contagem_total = document.querySelector(".contador-total");
  contagem_total.innerText = imagens.length;

  for (const img of imagens) {
    
    img.addEventListener("touchstart", function (event) {
      const touchX = event.touches[0].clientX;
      const touchY = event.touches[0].clientY;

      const elementoRect = img.getBoundingClientRect();
      const elementoX = elementoRect.left;
      const elementoY = elementoRect.top;

      const elementoWidth = img.offsetWidth;
      const elementoHeight = img.offsetHeight;

      if (touchX >= elementoX && touchX <= elementoX + elementoWidth && touchY >= elementoY && touchY <= elementoY + elementoHeight) {
        if (!img.classList.contains("visivel")) {
          contador++;
          contagem_valor.innerText = String(contador).padStart(3, '0');
          img.classList.add("visivel");
        }
      }
    });

    img.addEventListener("mouseover", function () {
      if (!img.classList.contains("visivel")) {
        contador++;
        contagem_valor.innerText = String(contador).padStart(3, '0');
        img.classList.add("visivel");
      }
    });

  }
}

function exibir_todas(exibir = true) {
  const imagens = document.querySelectorAll(".midia-grid li");

  if(exibir) {
    imagens.forEach(img => {
      if (!img.classList.contains("visivel")) {
        img.classList.add("visivel");
      }
    });
  }

  if(!exibir) {
    imagens.forEach(img => {
      if (img.classList.contains("visivel")) {
        img.classList.remove("visivel");
      }
    });
  }

}