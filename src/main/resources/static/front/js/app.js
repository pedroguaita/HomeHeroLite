// URL base da API REST exposta pelo backend (Spring Boot + MongoDB)
const API_BASE = "http://localhost:8080";

// Flags para indicar se há registro em edição em cada formulário
let idClienteEdicao = null;
let idPrestadorEdicao = null;
let idServicoEdicao = null;
let idAgendamentoEdicao = null;

// ==================== CONTROLE DE ABAS (TABS) ====================

/**
 * Ativa a aba informada (clientes, prestadores, serviços, agendamentos)
 * e desativa as demais.
 */
function ativarTab(nomeTab) {
  // Esconde o conteúdo de todas as abas
  const conteudos = document.querySelectorAll(".tab-content");
  conteudos.forEach((secao) => secao.classList.remove("active"));

  // Remove o destaque de todos os botões de aba
  const botoes = document.querySelectorAll(".tab-button");
  botoes.forEach((botao) => botao.classList.remove("active"));

  // Mostra a seção da aba escolhida (id do tipo "tab-clientes", "tab-prestadores", etc.)
  const secaoAtiva = document.getElementById("tab-" + nomeTab);
  if (secaoAtiva) {
    secaoAtiva.classList.add("active");
  }

  // Destaca o botão da aba escolhida (usa atributo data-tab no HTML)
  const botaoAtivo = document.querySelector(`.tab-button[data-tab="${nomeTab}"]`);
  if (botaoAtivo) {
    botaoAtivo.classList.add("active");
  }
}

// ==================== FUNÇÕES AUXILIARES (REQUISIÇÕES HTTP) ====================

/**
 * Função utilitária para requisições GET que retornam JSON.
 * Usa fetch (chamada HTTP) com async/await.
 */
async function getJson(url) {
  // fetch retorna uma Promise; await espera a resposta
  const resposta = await fetch(url);

  // Se o status HTTP não estiver na faixa 200–299, dispara erro
  if (!resposta.ok) {
    throw new Error("Erro ao acessar " + url + " - status " + resposta.status);
  }

  // Converte o corpo da resposta (JSON) em objeto JavaScript
  return resposta.json();
}

/**
 * Função genérica para enviar JSON ao backend
 * em métodos POST, PUT ou DELETE.
 */
async function enviarJson(url, metodo, objeto) {
  const resposta = await fetch(url, {
    method: metodo,                            // "POST", "PUT" ou "DELETE"
    headers: { "Content-Type": "application/json" }, // Informa que o corpo é JSON
    body: JSON.stringify(objeto)              // Converte objeto JS em texto JSON
  });

  if (!resposta.ok) {
    const texto = await resposta.text();
    throw new Error("Erro " + metodo + " " + url + " - " + texto);
  }
}

// ==================== CLIENTES ====================

/**
 * Consulta todos os clientes (GET /clientes)
 * e preenche a tabela da aba de Clientes.
 */
async function carregarClientes() {
  try {
    const lista = await getJson(API_BASE + "/clientes");

    // tbody da tabela de clientes (id definido no HTML)
    const tbody = document.getElementById("tabela-clientes");
    // Limpa conteúdo antes de recriar as linhas
    tbody.innerHTML = "";

    // Percorre o array de clientes retornado pela API
    lista.forEach((c) => {
      // Cria uma linha <tr> para cada cliente
      const tr = document.createElement("tr");
      // innerHTML monta as colunas <td> com os dados e botões
      tr.innerHTML = `
        <td>${c.id}</td>
        <td>${c.name}</td>
        <td>${c.email}</td>
        <td>${c.cpf}</td>
        <td>
          <button onclick="editarCliente('${c.id}')">Editar</button>
          <button onclick="excluirCliente('${c.id}')">Excluir</button>
        </td>
      `;
      // Adiciona a linha à tabela
      tbody.appendChild(tr);
    });
  } catch (e) {
    console.error(e);
    alert("Erro ao carregar clientes.");
  }
}

/**
 * Salva um cliente via formulário.
 * Se há id em edição → PUT /clientes/{id}
 * Senão → POST /clientes
 */
async function salvarCliente(evento) {
  // Impede o formulário de recarregar a página
  evento.preventDefault();

  // Lê os valores dos campos da tela
  const nome = document.getElementById("cliente-nome").value;
  const email = document.getElementById("cliente-email").value;
  const cpf = document.getElementById("cliente-cpf").value;

  // Objeto com os dados esperados pelo DTO de Cliente no backend
  const dados = { name: nome, email: email, cpf: cpf };

  try {
    if (idClienteEdicao) {
      // Atualização de cliente existente (PUT)
      await enviarJson(API_BASE + "/clientes/" + idClienteEdicao, "PUT", {
        id: idClienteEdicao,
        name: dados.name,
        email: dados.email,
        cpf: dados.cpf
      });
    } else {
      // Criação de novo cliente (POST)
      await enviarJson(API_BASE + "/clientes", "POST", dados);
    }

    // Após salvar, limpa o formulário e recarrega os dados
    limparFormularioCliente();
    carregarClientes();
    carregarCombosAgendamento(); // atualiza lista de clientes nos selects de agendamento
  } catch (e) {
    console.error(e);
    alert("Erro ao salvar cliente.");
  }
}

/**
 * Busca um cliente por id (GET /clientes/{id})
 * e preenche o formulário para edição.
 */
async function editarCliente(id) {
  try {
    const cliente = await getJson(API_BASE + "/clientes/" + id);
    idClienteEdicao = id;
    document.getElementById("cliente-nome").value = cliente.name;
    document.getElementById("cliente-email").value = cliente.email;
    document.getElementById("cliente-cpf").value = cliente.cpf;
    document.getElementById("btn-cliente-salvar").textContent = "Atualizar cliente";
  } catch (e) {
    console.error(e);
    alert("Erro ao carregar cliente.");
  }
}

/**
 * Exclui um cliente (DELETE /clientes/{id}).
 */
async function excluirCliente(id) {
  // Caixa de confirmação antes de excluir
  if (!confirm("Deseja realmente excluir este cliente?")) return;
  try {
    await enviarJson(API_BASE + "/clientes/" + id, "DELETE", {});
    carregarClientes();
    carregarCombosAgendamento();
  } catch (e) {
    console.error(e);
    alert("Erro ao excluir cliente.");
  }
}

/**
 * Limpa o formulário de clientes e volta o estado para "inserção".
 */
function limparFormularioCliente() {
  idClienteEdicao = null;
  document.getElementById("cliente-nome").value = "";
  document.getElementById("cliente-email").value = "";
  document.getElementById("cliente-cpf").value = "";
  document.getElementById("btn-cliente-salvar").textContent = "Salvar cliente";
}

// ==================== PRESTADORES ====================

async function carregarPrestadores() {
  try {
    const lista = await getJson(API_BASE + "/prestadores");
    const tbody = document.getElementById("tabela-prestadores");
    tbody.innerHTML = "";

    lista.forEach((p) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${p.email}</td>
        <td>${p.cpf}</td>
        <td>${p.especialidade}</td>
        <td>
          <button onclick="editarPrestador('${p.id}')">Editar</button>
          <button onclick="excluirPrestador('${p.id}')">Excluir</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (e) {
    console.error(e);
    alert("Erro ao carregar prestadores.");
  }
}

async function salvarPrestador(evento) {
  evento.preventDefault();

  const nome = document.getElementById("prestador-nome").value;
  const email = document.getElementById("prestador-email").value;
  const cpf = document.getElementById("prestador-cpf").value;
  const especialidade = document.getElementById("prestador-especialidade").value;

  const dados = { name: nome, email: email, cpf: cpf, especialidade: especialidade };

  try {
    if (idPrestadorEdicao) {
      await enviarJson(API_BASE + "/prestadores/" + idPrestadorEdicao, "PUT", {
        id: idPrestadorEdicao,
        name: dados.name,
        email: dados.email,
        cpf: dados.cpf,
        especialidade: dados.especialidade
      });
    } else {
      await enviarJson(API_BASE + "/prestadores", "POST", dados);
    }

    limparFormularioPrestador();
    carregarPrestadores();
    carregarCombosAgendamento();
  } catch (e) {
    console.error(e);
    alert("Erro ao salvar prestador.");
  }
}

async function editarPrestador(id) {
  try {
    const prestador = await getJson(API_BASE + "/prestadores/" + id);
    idPrestadorEdicao = id;
    document.getElementById("prestador-nome").value = prestador.name;
    document.getElementById("prestador-email").value = prestador.email;
    document.getElementById("prestador-cpf").value = prestador.cpf;
    document.getElementById("prestador-especialidade").value = prestador.especialidade;
    document.getElementById("btn-prestador-salvar").textContent = "Atualizar prestador";
  } catch (e) {
    console.error(e);
    alert("Erro ao carregar prestador.");
  }
}

async function excluirPrestador(id) {
  if (!confirm("Deseja realmente excluir este prestador?")) return;
  try {
    await enviarJson(API_BASE + "/prestadores/" + id, "DELETE", {});
    carregarPrestadores();
    carregarCombosAgendamento();
  } catch (e) {
    console.error(e);
    alert("Erro ao excluir prestador.");
  }
}

function limparFormularioPrestador() {
  idPrestadorEdicao = null;
  document.getElementById("prestador-nome").value = "";
  document.getElementById("prestador-email").value = "";
  document.getElementById("prestador-cpf").value = "";
  document.getElementById("prestador-especialidade").value = "";
  document.getElementById("btn-prestador-salvar").textContent = "Salvar prestador";
}

// ==================== SERVIÇOS ====================

async function carregarServicos() {
  try {
    const lista = await getJson(API_BASE + "/servicos");
    const tbody = document.getElementById("tabela-servicos");
    tbody.innerHTML = "";

    lista.forEach((s) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${s.id}</td>
        <td>${s.nome}</td>
        <td>${s.categoria}</td>
        <td>${s.descricao}</td>
        <td>${s.preco}</td>
        <td>
          <button onclick="editarServico('${s.id}')">Editar</button>
          <button onclick="excluirServico('${s.id}')">Excluir</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (e) {
    console.error(e);
    alert("Erro ao carregar serviços.");
  }
}

async function salvarServico(evento) {
  evento.preventDefault();

  const nome = document.getElementById("servico-nome").value;
  const categoria = document.getElementById("servico-categoria").value;
  const descricao = document.getElementById("servico-descricao").value;
  const preco = parseFloat(document.getElementById("servico-preco").value || "0");

  const dados = { nome: nome, categoria: categoria, descricao: descricao, preco: preco };

  try {
    if (idServicoEdicao) {
      await enviarJson(API_BASE + "/servicos/" + idServicoEdicao, "PUT", {
        id: idServicoEdicao,
        nome: dados.nome,
        categoria: dados.categoria,
        descricao: dados.descricao,
        preco: dados.preco
      });
    } else {
      await enviarJson(API_BASE + "/servicos", "POST", dados);
    }

    limparFormularioServico();
    carregarServicos();
    carregarCombosAgendamento();
  } catch (e) {
    console.error(e);
    alert("Erro ao salvar serviço.");
  }
}

async function editarServico(id) {
  try {
    const servico = await getJson(API_BASE + "/servicos/" + id);
    idServicoEdicao = id;
    document.getElementById("servico-nome").value = servico.nome;
    document.getElementById("servico-categoria").value = servico.categoria;
    document.getElementById("servico-descricao").value = servico.descricao;
    document.getElementById("servico-preco").value = servico.preco;
    document.getElementById("btn-servico-salvar").textContent = "Atualizar serviço";
  } catch (e) {
    console.error(e);
    alert("Erro ao carregar serviço.");
  }
}

async function excluirServico(id) {
  if (!confirm("Deseja realmente excluir este serviço?")) return;
  try {
    await enviarJson(API_BASE + "/servicos/" + id, "DELETE", {});
    carregarServicos();
    carregarCombosAgendamento();
  } catch (e) {
    console.error(e);
    alert("Erro ao excluir serviço.");
  }
}

function limparFormularioServico() {
  idServicoEdicao = null;
  document.getElementById("servico-nome").value = "";
  document.getElementById("servico-categoria").value = "";
  document.getElementById("servico-descricao").value = "";
  document.getElementById("servico-preco").value = "";
  document.getElementById("btn-servico-salvar").textContent = "Salvar serviço";
}

// ==================== AGENDAMENTOS ====================

async function carregarAgendamentos() {
  try {
    const lista = await getJson(API_BASE + "/agendamentos");
    const tbody = document.getElementById("tabela-agendamentos");
    tbody.innerHTML = "";

    lista.forEach((a) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${a.id}</td>
        <td>${a.data}</td>
        <td>${a.horario}</td>
        <td>${a.clienteId}</td>
        <td>${a.prestadorId}</td>
        <td>${a.servicoId}</td>
        <td>${a.status}</td>
        <td>
          <button onclick="editarAgendamento('${a.id}')">Editar</button>
          <button onclick="excluirAgendamento('${a.id}')">Excluir</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (e) {
    console.error(e);
    alert("Erro ao carregar agendamentos.");
  }
}

async function salvarAgendamento(evento) {
  evento.preventDefault();

  const data = document.getElementById("agendamento-data").value;
  const horario = document.getElementById("agendamento-horario").value;
  const clienteId = document.getElementById("agendamento-cliente").value;
  const prestadorId = document.getElementById("agendamento-prestador").value;
  const servicoId = document.getElementById("agendamento-servico").value;
  const status = document.getElementById("agendamento-status").value;

  const dados = {
    data: data,
    horario: horario,
    clienteId: clienteId,
    prestadorId: prestadorId,
    servicoId: servicoId,
    status: status
  };

  try {
    if (idAgendamentoEdicao) {
      await enviarJson(API_BASE + "/agendamentos/" + idAgendamentoEdicao, "PUT", {
        id: idAgendamentoEdicao,
        data: dados.data,
        horario: dados.horario,
        clienteId: dados.clienteId,
        prestadorId: dados.prestadorId,
        servicoId: dados.servicoId,
        status: dados.status
      });
    } else {
      await enviarJson(API_BASE + "/agendamentos", "POST", dados);
    }

    limparFormularioAgendamento();
    carregarAgendamentos();
  } catch (e) {
    console.error(e);
    alert("Erro ao salvar agendamento.");
  }
}

async function editarAgendamento(id) {
  try {
    const ag = await getJson(API_BASE + "/agendamentos/" + id);
    idAgendamentoEdicao = id;

    document.getElementById("agendamento-data").value = ag.data;
    document.getElementById("agendamento-horario").value = ag.horario;
    document.getElementById("agendamento-cliente").value = ag.clienteId;
    document.getElementById("agendamento-prestador").value = ag.prestadorId;
    document.getElementById("agendamento-servico").value = ag.servicoId;
    document.getElementById("agendamento-status").value = ag.status;

    document.getElementById("btn-agendamento-salvar").textContent = "Atualizar agendamento";
  } catch (e) {
    console.error(e);
    alert("Erro ao carregar agendamento.");
  }
}

async function excluirAgendamento(id) {
  if (!confirm("Deseja realmente excluir este agendamento?")) return;
  try {
    await enviarJson(API_BASE + "/agendamentos/" + id, "DELETE", {});
    carregarAgendamentos();
  } catch (e) {
    console.error(e);
    alert("Erro ao excluir agendamento.");
  }
}

function limparFormularioAgendamento() {
  idAgendamentoEdicao = null;
  document.getElementById("agendamento-data").value = "";
  document.getElementById("agendamento-horario").value = "";
  document.getElementById("agendamento-cliente").value = "";
  document.getElementById("agendamento-prestador").value = "";
  document.getElementById("agendamento-servico").value = "";
  document.getElementById("agendamento-status").value = "PENDENTE";
  document.getElementById("btn-agendamento-salvar").textContent = "Salvar agendamento";
}

// ==================== COMBOS (SELECTS) DE AGENDAMENTO ====================

/**
 * Recarrega as opções dos <select> de agendamento
 * com os clientes, prestadores e serviços atuais.
 */
async function carregarCombosAgendamento() {
  try {
    const selectCliente = document.getElementById("agendamento-cliente");
    const selectPrestador = document.getElementById("agendamento-prestador");
    const selectServico = document.getElementById("agendamento-servico");

    selectCliente.innerHTML = "";
    selectPrestador.innerHTML = "";
    selectServico.innerHTML = "";

    const clientes = await getJson(API_BASE + "/clientes");
    clientes.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c.id;
      opt.textContent = c.name;
      selectCliente.appendChild(opt);
    });

    const prestadores = await getJson(API_BASE + "/prestadores");
    prestadores.forEach((p) => {
      const opt = document.createElement("option");
      opt.value = p.id;
      opt.textContent = p.name;
      selectPrestador.appendChild(opt);
    });

    const servicos = await getJson(API_BASE + "/servicos");
    servicos.forEach((s) => {
      const opt = document.createElement("option");
      opt.value = s.id;
      opt.textContent = s.nome;
      selectServico.appendChild(opt);
    });
  } catch (e) {
    console.error(e);
    alert("Erro ao carregar opções de agendamento.");
  }
}

// ==================== INICIALIZAÇÃO DA PÁGINA ====================

/**
 * window.addEventListener("load", ...) garante
 * que o código só execute após todo o HTML ter sido carregado.
 */
window.addEventListener("load", () => {
  // Liga o clique em cada botão de aba à função ativarTab
  document.querySelectorAll(".tab-button").forEach((botao) => {
    botao.addEventListener("click", () => {
      const nomeTab = botao.getAttribute("data-tab");
      ativarTab(nomeTab);
    });
  });

  // Aba inicial exibida ao abrir a página
  ativarTab("clientes");

  // Eventos de submit/cancelar dos formulários
  document.getElementById("form-cliente").addEventListener("submit", salvarCliente);
  document.getElementById("btn-cliente-cancelar").addEventListener("click", limparFormularioCliente);

  document.getElementById("form-prestador").addEventListener("submit", salvarPrestador);
  document.getElementById("btn-prestador-cancelar").addEventListener("click", limparFormularioPrestador);

  document.getElementById("form-servico").addEventListener("submit", salvarServico);
  document.getElementById("btn-servico-cancelar").addEventListener("click", limparFormularioServico);

  document.getElementById("form-agendamento").addEventListener("submit", salvarAgendamento);
  document.getElementById("btn-agendamento-cancelar").addEventListener("click", limparFormularioAgendamento);

  // Carrega dados iniciais nas tabelas e selects
  carregarClientes();
  carregarPrestadores();
  carregarServicos();
  carregarAgendamentos();
  carregarCombosAgendamento();
});
