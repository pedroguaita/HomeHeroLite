// URL base da API REST do backend
const API_BASE = "http://localhost:8080";

// Variáveis para controlar se cada formulário está em modo de edição
let idClienteEdicao = null;
let idPrestadorEdicao = null;
let idServicoEdicao = null;
let idAgendamentoEdicao = null;

// ==================== CONTROLE DE ABAS ====================

// Função que ativa uma aba (Clientes, Prestadores, etc.)
function ativarTab(nomeTab) {
  // Remove a classe "active" de todos os conteúdos das abas
  const conteudos = document.querySelectorAll(".tab-content");
  conteudos.forEach((secao) => {
    secao.classList.remove("active");
  });

  // Remove a classe "active" de todos os botões de aba
  const botoes = document.querySelectorAll(".tab-button");
  botoes.forEach((botao) => {
    botao.classList.remove("active");
  });

  // Adiciona "active" na seção correspondente ao nome da aba
  const secaoAtiva = document.getElementById("tab-" + nomeTab);
  if (secaoAtiva) {
    secaoAtiva.classList.add("active");
  }

  // Adiciona "active" no botão da aba clicada
  const botaoAtivo = document.querySelector(`.tab-button[data-tab="${nomeTab}"]`);
  if (botaoAtivo) {
    botaoAtivo.classList.add("active");
  }
}

// ==================== FUNÇÕES AUXILIARES ====================

// Função utilitária para fazer requisições GET e retornar JSON
async function getJson(url) {
  // fetch faz a chamada HTTP
  const resposta = await fetch(url);
  // Se não retornou status 200–299, lança erro
  if (!resposta.ok) {
    throw new Error("Erro ao acessar " + url + " - status " + resposta.status);
  }
  // Converte o corpo da resposta para objeto JS (JSON)
  return resposta.json();
}

// Função utilitária para enviar JSON em requisições POST, PUT, DELETE
async function enviarJson(url, metodo, objeto) {
  const resposta = await fetch(url, {
    method: metodo,                        // Método HTTP (POST, PUT ou DELETE)
    headers: { "Content-Type": "application/json" }, // Cabeçalho indicando JSON
    body: JSON.stringify(objeto)          // Converte objeto JS para texto JSON
  });

  if (!resposta.ok) {
    const texto = await resposta.text();
    throw new Error("Erro " + metodo + " " + url + " - " + texto);
  }

  // Como os endpoints de escrita não devolvem corpo, nada é retornado aqui
  return;
}

// ==================== CLIENTES ====================

// Busca todos os clientes e preenche a tabela de clientes
async function carregarClientes() {
  try {
    const lista = await getJson(API_BASE + "/clientes");
    const tbody = document.getElementById("tabela-clientes");
    // Limpa a tabela antes de inserir as linhas
    tbody.innerHTML = "";

    // Para cada cliente, cria uma linha <tr> com colunas <td>
    lista.forEach((c) => {
      const tr = document.createElement("tr");
      // innerHTML insere HTML dentro do elemento
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
      tbody.appendChild(tr);
    });
  } catch (e) {
    console.error(e);
    alert("Erro ao carregar clientes.");
  }
}

// Salva (insere ou atualiza) um cliente
async function salvarCliente(evento) {
  // Impede o comportamento padrão do formulário (recarregar a página)
  evento.preventDefault();

  // Captura os valores dos campos do formulário
  const nome = document.getElementById("cliente-nome").value;
  const email = document.getElementById("cliente-email").value;
  const cpf = document.getElementById("cliente-cpf").value;

  // Monta objeto com os dados esperados pela API
  const dados = { name: nome, email: email, cpf: cpf };

  try {
    // Se existe id em edição, faz PUT (atualizar)
    if (idClienteEdicao) {
      await enviarJson(API_BASE + "/clientes/" + idClienteEdicao, "PUT", {
        id: idClienteEdicao,
        ...dados // spread operator: espalha as propriedades de "dados"
      });
    } else {
      // Caso contrário, faz POST (novo cliente)
      await enviarJson(API_BASE + "/clientes", "POST", dados);
    }
    limparFormularioCliente();
    carregarClientes();
    carregarCombosAgendamento();
  } catch (e) {
    console.error(e);
    alert("Erro ao salvar cliente.");
  }
}

// Carrega os dados de um cliente específico para edição
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

// Exclui um cliente pelo id
async function excluirCliente(id) {
  // confirm exibe caixa de confirmação
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

// Limpa o formulário de clientes e volta para modo "inserção"
function limparFormularioCliente() {
  idClienteEdicao = null;
  document.getElementById("cliente-nome").value = "";
  document.getElementById("cliente-email").value = "";
  document.getElementById("cliente-cpf").value = "";
  document.getElementById("btn-cliente-salvar").textContent = "Salvar cliente";
}

// ==================== PRESTADORES ====================

// Busca todos os prestadores e preenche a tabela
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

// Salva (insere ou atualiza) um prestador
async function salvarPrestador(evento) {
  evento.preventDefault();

  const nome = document.getElementById("prestador-nome").value;
  const email = document.getElementById("prestador-email").value;
  const cpf = document.getElementById("prestador-cpf").value;
  const especialidade = document.getElementById("prestador-especialidade").value;

  const dados = { name: nome, email: email, cpf: cpf, especialidade: especialidade };

  try {
    if (idPrestadorEdicao) {
      // PUT quando está em edição
      await enviarJson(API_BASE + "/prestadores/" + idPrestadorEdicao, "PUT", {
        id: idPrestadorEdicao,
        ...dados
      });
    } else {
      // POST quando é novo
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

// Carrega dados de um prestador para edição
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

// Exclui um prestador
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

// Limpa formulário de prestadores
function limparFormularioPrestador() {
  idPrestadorEdicao = null;
  document.getElementById("prestador-nome").value = "";
  document.getElementById("prestador-email").value = "";
  document.getElementById("prestador-cpf").value = "";
  document.getElementById("prestador-especialidade").value = "";
  document.getElementById("btn-prestador-salvar").textContent = "Salvar prestador";
}

// ==================== SERVIÇOS ====================

// Busca todos os serviços e preenche a tabela
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

// Salva (insere ou atualiza) um serviço
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
        ...dados
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

// Carrega dados de um serviço para edição
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

// Exclui um serviço
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

// Limpa formulário de serviços
function limparFormularioServico() {
  idServicoEdicao = null;
  document.getElementById("servico-nome").value = "";
  document.getElementById("servico-categoria").value = "";
  document.getElementById("servico-descricao").value = "";
  document.getElementById("servico-preco").value = "";
  document.getElementById("btn-servico-salvar").textContent = "Salvar serviço";
}

// ==================== AGENDAMENTOS ====================

// Busca todos os agendamentos e preenche a tabela
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

// Salva (insere ou atualiza) um agendamento
async function salvarAgendamento(evento) {
  evento.preventDefault();

  const data = document.getElementById("agendamento-data").value;
  const horario = document.getElementById("agendamento-horario").value;
  const clienteId = document.getElementById("agendamento-cliente").value;
  const prestadorId = document.getElementById("agendamento-prestador").value;
  const servicoId = document.getElementById("agendamento-servico").value;
  const status = document.getElementById("agendamento-status").value;

  // shorthand: { data, horario, clienteId, ... } é igual a data: data, etc.
  const dados = { data, horario, clienteId, prestadorId, servicoId, status };

  try {
    if (idAgendamentoEdicao) {
      await enviarJson(API_BASE + "/agendamentos/" + idAgendamentoEdicao, "PUT", {
        id: idAgendamentoEdicao,
        ...dados
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

// Carrega dados de um agendamento para edição
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

// Exclui um agendamento
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

// Limpa formulário de agendamentos
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

// Preenche os selects de agendamento com os dados atuais de clientes, prestadores e serviços
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

// ==================== INICIALIZAÇÃO ====================

// window.addEventListener("load", ...) garante que o código só rode após carregar a página
window.addEventListener("load", () => {
  // Configura cliques nas abas
  document.querySelectorAll(".tab-button").forEach((botao) => {
    botao.addEventListener("click", () => {
      const nomeTab = botao.getAttribute("data-tab");
      ativarTab(nomeTab);
    });
  });
  // Aba inicial
  ativarTab("clientes");

  // Liga os eventos de submit e cancelamento dos formulários
  document.getElementById("form-cliente").addEventListener("submit", salvarCliente);
  document.getElementById("btn-cliente-cancelar").addEventListener("click", limparFormularioCliente);

  document.getElementById("form-prestador").addEventListener("submit", salvarPrestador);
  document.getElementById("btn-prestador-cancelar").addEventListener("click", limparFormularioPrestador);

  document.getElementById("form-servico").addEventListener("submit", salvarServico);
  document.getElementById("btn-servico-cancelar").addEventListener("click", limparFormularioServico);

  document.getElementById("form-agendamento").addEventListener("submit", salvarAgendamento);
  document.getElementById("btn-agendamento-cancelar").addEventListener("click", limparFormularioAgendamento);

  // Carrega dados iniciais das tabelas e selects
  carregarClientes();
  carregarPrestadores();
  carregarServicos();
  carregarAgendamentos();
  carregarCombosAgendamento();
});
