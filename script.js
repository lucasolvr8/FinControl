function adicionarGanho() {
  const descricao = document.getElementById("ganhoDescricao").value;
  const valor = parseFloat(document.getElementById("ganhoValor").value);
  if (descricao && valor) {
    const item = { descricao, valor };
    const ganhos = JSON.parse(localStorage.getItem("ganhos") || "[]");
    ganhos.push(item);
    localStorage.setItem("ganhos", JSON.stringify(ganhos));
    listarGanhos();
  }
}

function adicionarGasto() {
  const descricao = document.getElementById("gastoDescricao").value;
  const valor = parseFloat(document.getElementById("gastoValor").value);
  if (descricao && valor) {
    const item = { descricao, valor };
    const gastos = JSON.parse(localStorage.getItem("gastos") || "[]");
    gastos.push(item);
    localStorage.setItem("gastos", JSON.stringify(gastos));
    listarGastos();
  }
}

function adicionarMeta() {
  const descricao = document.getElementById("metaDescricao").value;
  const valor = parseFloat(document.getElementById("metaValor").value);
  const atual = parseFloat(document.getElementById("metaAtual").value);
  if (descricao && valor && atual >= 0) {
    const item = { descricao, valor, atual };
    const metas = JSON.parse(localStorage.getItem("metas") || "[]");
    metas.push(item);
    localStorage.setItem("metas", JSON.stringify(metas));
    listarMetas();
  }
}

function listarGanhos() {
  const lista = document.getElementById("listaGanhos");
  if (lista) {
    lista.innerHTML = "";
    const ganhos = JSON.parse(localStorage.getItem("ganhos") || "[]");
    ganhos.forEach(g => {
      const li = document.createElement("li");
      li.textContent = `${g.descricao} - R$ ${g.valor}`;
      lista.appendChild(li);
    });
  }
}

function listarGastos() {
  const lista = document.getElementById("listaGastos");
  if (lista) {
    lista.innerHTML = "";
    const gastos = JSON.parse(localStorage.getItem("gastos") || "[]");
    gastos.forEach(g => {
      const li = document.createElement("li");
      li.textContent = `${g.descricao} - R$ ${g.valor}`;
      lista.appendChild(li);
    });
  }
}

function listarMetas() {
  const lista = document.getElementById("listaMetas");
  if (lista) {
    lista.innerHTML = "";
    const metas = JSON.parse(localStorage.getItem("metas") || "[]");
    metas.forEach(m => {
      const porcentagem = ((m.atual / m.valor) * 100).toFixed(1);
      const li = document.createElement("li");
      li.textContent = `${m.descricao}: R$${m.atual} de R$${m.valor} (${porcentagem}%)`;
      lista.appendChild(li);
    });
  }
}

function calcularResumo() {
  const ganhos = JSON.parse(localStorage.getItem("ganhos") || "[]");
  const gastos = JSON.parse(localStorage.getItem("gastos") || "[]");
  const totalGanhos = ganhos.reduce((s, g) => s + g.valor, 0);
  const totalGastos = gastos.reduce((s, g) => s + g.valor, 0);
  const saldo = totalGanhos - totalGastos;

  const elGanhos = document.getElementById("totalGanhos");
  const elGastos = document.getElementById("totalGastos");
  const elSaldo = document.getElementById("saldoAtual");

  if (elGanhos) elGanhos.textContent = totalGanhos.toFixed(2);
  if (elGastos) elGastos.textContent = totalGastos.toFixed(2);
  if (elSaldo) elSaldo.textContent = saldo.toFixed(2);
}

window.onload = () => {
  listarGanhos();
  listarGastos();
  listarMetas();
  calcularResumo();
};
