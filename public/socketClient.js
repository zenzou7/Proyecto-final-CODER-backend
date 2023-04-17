const socket = io();
socket.on("connect", () => {});

function sendMsg() {
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const avatar = document.getElementById("avatar").value;
  const email = document.getElementById("email").value;
  const msg = document.getElementById("msg").value;
  socket.emit("msg", {
    nombre: nombre,
    apellido: apellido,
    avatar: avatar,
    email: email,
    mensaje: msg,
  });
}

socket.on("msg-list", (data) => {
  let mensaje = document.getElementById("messages");
  mensaje.innerHTML = ``;

  const mensajeSchema = new normalizr.schema.Entity("mensaje");
  const authorSchema = new normalizr.schema.Entity(
    "author",
    {
      mensaje: mensajeSchema,
    },
    { idAttribute: "email" }
  );
  const chatSchema = new normalizr.schema.Entity("chat", {
    author: [authorSchema],
  });
  const normalizado = data.normalizado;

  const desnormalizado = normalizr.denormalize(
    normalizado.result,
    chatSchema,
    normalizado.entities
  );

  if (mensaje.innerHTML.length > 0) {
    mensaje.innerHTML = ``;
    let html = ``;
    desnormalizado.messages.forEach((obj) => {
      html += `
      <div class="message">
        <img src="${obj.author.avatar}" width="150">
        <p class="message__email">${obj.author.id}</p>
        <p class="message__date">fecha: ${obj.text.fecha} hora:${obj.text.hora}</p>
        <p class="message__msg">dijo: ${obj.text.mensaje}</p>
      </div><br>
      `;
      mensaje.innerHTML += html;
    });
  } else {
    mensaje.innerHTML = ``;
    let html = ``;
    desnormalizado.messages.forEach((obj) => {
      html += `
      <div class="message">
        <img src="${obj.author.avatar}">
        <p class="message__email">${obj.author.id}</p>
        <p class="message__date">fecha: ${obj.text.fecha} hora:${obj.text.hora}</p>
        <p class="message__msg">dijo: ${obj.text.mensaje}</p>
      </div><br>
      `;
      mensaje.innerHTML += html;
    });
  }
});

function sendTable() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const thumbnail = document.getElementById("thumbnail").value;
  socket.emit("sendTable", { name: name, price: price, thumbnail: thumbnail });
}

socket.on("prods", (data) => {
  let tabla = document.getElementById("prods__table");
  tabla.innerHTML = ``;
  let html = ` 
    <TR>
      <TD>Nombre</TD> <TD>precio</TD> <TD>Imagen</TD>
    </TR>`;
  data.forEach((item) => {
    html += `       
      <TR class="prods__item">
        <TD class="prods__item">${item.name}</TD> <TD class="prods__item">$${item.price}</TD> <TD class="prods__item"><img class="prods__img"src="${item.thumbnail}"></TD>
      </TR>
      `;
  });
  tabla.innerHTML += html;
});
