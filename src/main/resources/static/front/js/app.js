// URL base da API REST do backend (Spring Boot)
const API_BASE = "http://localhost:8080";

// Variáveis de controle: guardam o ID que está em edição em cada formulário.
// Se estiver null, significa que estamos inserindo um novo registro.
let idClienteEdicao = null;
let idPrestadorEdicao = null;
let idServicoEdicao = null;
let idAgendamentoEdicao = null;

// ==================== CONTROLE DE ABAS ====================

// Função que ativa uma aba (Clientes, Prestadores, Serviços, Agendamentos)
function ativarTab(nomeTab) {
  // Seleciona todos os conteúdos de abas (.tab-content) e remove a classe "active"
  const conteudos = document.querySelectorAll(".tab-content");
  conteudos.forEach((secao) => {
    secao.classList.remove("active");
  });

  // Seleciona todos os botões de abas (.tab-button) e também remove "active"
  const botoes = document.querySelectorAll(".tab-button");
  botoes.forEach((botao) => {
    botao.classList.remove("active");
  });

  // Monta o id da aba ativa: ex.: "clientes" -> "tab-clientes"
  const secaoAtiva = document.getElementById("tab-" + nomeTab);
  if (secaoAtiva) {
    // Mostra apenas a seção correspondente
    secaoAtiva.classList.add("active");
  }

  // Seleciona o botão de aba que possui o atributo data-tab referente à aba atual
  const botaoAtivo = document.querySelector(`.tab-button[data-tab="${nomeTab}"]`);
  if (botaoAtivo) {
    // Destaca o botão da aba clicada
    botaoAtivo.classList.add("active");
  }
}

// ==================== FUNÇÕES AUXILIARES ====================

// Função utilitária para fazer requisições GET que retornam JSON
// async/await: permite escrever código assíncrono de forma sequencial
async function getJson(url) {
  // fetch realiza a chamada HTTP para a URL informada
  const resposta = await fetch(url);
  // Verifica se o status da resposta é 200–299
  if (!resposta.ok) {
    // Lança um erro caso o status seja diferente de "sucesso"
    throw new Error("Erro ao acessar " + url + " - status " + resposta.status);
  }
  // Converte o corpo da resposta (JSON) em objeto JavaScript
  return resposta.json();
}

// Função utilitária para enviar JSON em requisições POST, PUT e DELETE
async function enviarJson(url, metodo, objeto) {
  const resposta = await fetch(url, {
    method: metodo, // "POST", "PUT" ou "DELETE"
    headers: { "Content-Type": "application/json" }, // informa que o corpo é JSON
    body: JSON.stringify(objeto) // converte objeto JS em texto JSON
  });

  // Se a resposta não for bem sucedida, lança erro com o texto retornado
  if (!resposta.ok) {
    const texto = await resposta.text();
    throw new Error("Erro " + metodo + " " + url + " - " + texto);
  }

  // A maioria dos endpoints de escrita não devolve corpo, então não é retornado nada
  return;
}

// ==================== CLIENTES ====================

// Busca todos os clientes na API e preenche a tabela de clientes no HTML
async function carregarClientes() {
  try {
    // GET /clientes
    const lista = await getJson(API_BASE + "/clientes");
    const tbody = document.getElementById("tabela-clientes");
    // Limpa o conteúdo atual da tabela
    tbody.innerHTML = "";

    // Percorre a lista de clientes retornada pela API
    lista.forEach((c) => {
      // Cria uma linha <tr> para cada cliente
      const tr = document.createElement("tr");
      // innerHTML permite montar as colunas <td> usando template literals (crase)
      tr.innerHTML = `
        <td>${c.id}</td>
        <td>${c.name}</td>
        <td>${c.email}</td>
        <td>${c.cpf}</td>
        <td>
          <!-- Ao clicar chamar funções de edição/remoção passando o id -->
          <button onclick="editarCliente('${c.id}')">Editar</button>
          <button onclick="excluirCliente('${c.id}')">Excluir</button>
        </td>
      `;
      // Adiciona a linha na tabela
      tbody.appendChild(tr);
    });
  } catch (e) {
    console.error(e);
    alert("Erro ao carregar clientes.");
  }
}

// Salva (insere ou atualiza) um cliente via formulário
async function salvarCliente(evento) {
  // Impede o comportamento padrão do formulário (recarregar a página)
  evento.preventDefault();

  // Lê os valores digitados nos campos do formulário
  const nome = document.getElementById("cliente-nome").value;
  const email = document.getElementById("cliente-email").value;
  const cpf = document.getElementById("cliente-cpf").value;

  // Objeto com os dados esperados pelo backend (DTO de Cliente)
  const dados = { name: nome, email: email, cpf: cpf };

  try {
    // Se existe um id em edição, faz PUT (atualização)
    if (idClienteEdicao) {
      await enviarJson(API_BASE + "/clientes/" + idClienteEdicao, "PUT", {
        id: idClienteEdicao,
        // spread operator (...) espalha as propriedades de "dados" aqui
        ...dados
      });
    } else {
      // Caso contrário, faz POST (criação de novo cliente)
      await enviarJson(API_BASE + "/clientes", "POST", dados);
    }
    // Após salvar, limpa o formulário, recarrega tabela e combos de agendamento
    limparFormularioCliente();
    carregarClientes();
    carregarCombosAgendamento();
  } catch (e) {
    console.error(e);
    alert("Erro ao salvar cliente.");
  }
}

// Carrega os dados de um cliente específico (por id) para edição
async function editarCliente(id) {
  try {
    // GET /clientes/{id}
    const cliente = await getJson(API_BASE + "/clientes/" + id);
    // Define que estamos em modo edição
    idClienteEdicao = id;
    // Preenche os campos do formulário com os dados do cliente
    document.getElementById("cliente-nome").value = cliente.name;
    document.getElementById("cliente-email").value = cliente.email;
    document.getElementById("cliente-cpf").value = cliente.cpf;
    // Atualiza o texto do botão para indicar que é uma atualização
    document.getElementById("btn-cliente-salvar").textContent = "Atualizar cliente";
  } catch (e) {
    console.error(e);
    alert("Erro ao carregar cliente.");
  }
}

// Exclui um cliente pelo id
async function excluirCliente(id) {
  // Caixa de confirmação: se o usuário clicar em "Cancelar", sai da função
  if (!confirm("Deseja realmente excluir este cliente?")) return;
  try {
    // DELETE /clientes/{id}
    await enviarJson(API_BASE + "/clientes/" + id, "DELETE", {});
    // Recarrega a tabela e os combos de agendamento
    carregarClientes();
    carregarCombosAgendamento();
  } catch (e) {
    console.error(e);
    alert("Erro ao excluir cliente.");
  }
}

// Limpa o formulário de clientes e volta para modo "inserção"
function limparFormularioCliente() {
  idClienteEdicao = null; // volta para estado de inserção
  document.getElementById("cliente-nome").value = "";
  document.getElementById("cliente-email").value = "";
  document.getElementById("cliente-cpf").value = "";
  document.getElementById("btn-cliente-salvar").textContent = "Salvar cliente";
}

// ==================== PRESTADORES ====================

// Busca todos os prestadores e preenche a tabela de prestadores
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
      // PUT /prestadores/{id} quando está em edição
      await enviarJson(API_BASE + "/prestadores/" + idPrestadorEdicao, "PUT", {
        id: idPrestadorEdicao,
        ...dados
      });
    } else {
      // POST /prestadores quando é novo
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

// Busca todos os serviços e preenche a tabela de serviços
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
  // parseFloat converte o valor do input (string) para número decimal
  const preco = parseFloat(document.getElementById("servico-preco").value || "0");

  const dados = { nome: nome, categoria: categoria, descricao: descricao, preco: preco };

  try {
    if (idServicoEdicao) {
      // PUT /servicos/{id} quando está em edição
      await enviarJson(API_BASE + "/servicos/" + idServicoEdicao, "PUT", {
        id: idServicoEdicao,
        ...dados
      });
    } else {
      // POST /servicos para novo serviço
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

  // shorthand de objeto: { data, horario, ... } equivale a data: data, horario: horario, ...
  const dados = { data, horario, clienteId, prestadorId, servicoId, status };

  try {
    if (idAgendamentoEdicao) {
      // PUT /agendamentos/{id} quando está em edição
      await enviarJson(API_BASE + "/agendamentos/" + idAgendamentoEdicao, "PUT", {
        id: idAgendamentoEdicao,
        ...dados
      });
    } else {
      // POST /agendamentos para novo agendamento
      await enviarJson(API_BASE + "/agendamentos", "POST", dados);
    }
    limparFormularioAgendamento();
    carregarAgendamentos();
  } catch (e) {
    console.error(e);
    alert("Erro ao salvar agendamento.");
  }
}

// Carrega dados de um agendamento específico para edição
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

// Limpa formulário de agendamentos e volta para modo "inserção"
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

    // Limpa as opções anteriores
    selectCliente.innerHTML = "";
    selectPrestador.innerHTML = "";
    selectServico.innerHTML = "";

    // Carrega clientes para o combo
    const clientes = await getJson(API_BASE + "/clientes");
    clientes.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c.id;      // valor enviado para o backend
      opt.textContent = c.name; // texto exibido para o usuário
      selectCliente.appendChild(opt);
    });

    // Carrega prestadores para o combo
    const prestadores = await getJson(API_BASE + "/prestadores");
    prestadores.forEach((p) => {
      const opt = document.createElement("option");
      opt.value = p.id;
      opt.textContent = p.name;
      selectPrestador.appendChild(opt);
    });

    // Carrega serviços para o combo
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

// Evento "load": garante que o código só rode após a página ter sido carregada
window.addEventListener("load", () => {
  // Configura cliques nas abas para alternar o conteúdo
  document.querySelectorAll(".tab-button").forEach((botao) => {
    botao.addEventListener("click", () => {
      const nomeTab = botao.getAttribute("data-tab");
      ativarTab(nomeTab);
    });
  });

  // Define "clientes" como aba inicial
  ativarTab("clientes");

  // Liga os formulários às funções de salvar e cancelar
  document.getElementById("form-cliente").addEventListener("submit", salvarCliente);
  document.getElementById("btn-cliente-cancelar").addEventListener("click", limparFormularioCliente);

  document.getElementById("form-prestador").addEventListener("submit", salvarPrestador);
  document.getElementById("btn-prestador-cancelar").addEventListener("click", limparFormularioPrestador);

  document.getElementById("form-servico").addEventListener("submit", salvarServico);
  document.getElementById("btn-servico-cancelar").addEventListener("click", limparFormularioServico);

  document.getElementById("form-agendamento").addEventListener("submit", salvarAgendamento);
  document.getElementById("btn-agendamento-cancelar").addEventListener("click", limparFormularioAgendamento);

  // Carrega os dados iniciais das tabelas e dos selects
  carregarClientes();
  carregarPrestadores();
  carregarServicos();
  carregarAgendamentos();
  carregarCombosAgendamento();
});
