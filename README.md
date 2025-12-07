# HomeHero Lite 🦸‍♂️

Projeto simples de CRUD para o sistema **HomeHero Lite**, desenvolvido em **Spring Boot + MongoDB** com um **front-end estático (HTML/CSS/JS)** que consome a API REST.

O objetivo é demonstrar, de forma didática, uma arquitetura em camadas com:

- Backend em Spring Boot
- Banco NoSQL (MongoDB)
- Camadas bem definidas (domain, dto, repository, service, resource)
- Consumo da API via Postman e via front-end

---

## 🔧 Tecnologias utilizadas

- **Java 17+**  
- **Spring Boot**  
  - Spring Web  
  - Spring Data MongoDB  
- **MongoDB** (local)  
- **Maven**  
- **HTML / CSS / JavaScript (fetch API)**

---

## 🧱 Arquitetura do backend

Pacote principal: `com.homeherolite.homeherolitep2`

### `domain/`
Entidades de domínio (modelos salvos no MongoDB):

- `Cliente`
- `Prestador`
- `Servico`
- `Agendamento`

Cada classe:

- Anotada com `@Document` → coleção no MongoDB  
- Campo `@Id` → identificador do documento  
- Atributos, getters/setters, `equals` e `hashCode` baseados em `id`

### `dto/`
Objetos de transferência de dados (Data Transfer Object):

- `ClienteDTO`
- `PrestadorDTO`
- `ServicoDTO`
- `AgendamentoDTO`

Usados para:

- Expor dados na API de forma controlada
- Converter entidade → DTO e DTO → entidade (via métodos `fromDTO` nos services)

### `repository/`
Interfaces de acesso ao banco, estendendo `MongoRepository`:

- `ClienteRepository`
- `PrestadorRepository`
- `ServicoRepository`
- `AgendamentoRepository`

O Spring Data cria as implementações automaticamente, com métodos de CRUD:

- `findAll()`, `findById()`, `insert()`, `save()`, `deleteById()`, etc.

### `services/`
Camada de regras de negócio:

- `ClienteService`
- `PrestadorService`
- `ServicoService`
- `AgendamentoService`

Principais responsabilidades:

- Listar (`listarClientes`, `listarPrestadores`, etc.)
- Buscar por id (`buscarId`)
- Inserir (`inserir`)
- Atualizar (`atualizar`)
- Excluir (`deletar`)
- Converter DTO → entidade (`fromDTO`)

Em caso de id inexistente, lançam **`ObjectNotFoundException`**.

### `resources/` (Controllers REST)

- `ClienteResource` → `/clientes`
- `PrestadorResource` → `/prestadores`
- `ServicoResource` → `/servicos`
- `AgendamentoResource` → `/agendamentos`

Cada resource expõe os endpoints REST:

- `GET /{entidade}` → listar todos  
- `GET /{entidade}/{id}` → buscar por id  
- `POST /{entidade}` → inserir  
- `PUT /{entidade}/{id}` → atualizar  
- `DELETE /{entidade}/{id}` → excluir  

Utilizam `ResponseEntity` e retornam/recebem DTOs.

### `resources/exception/`

- `ResourceExceptionHandler`  
  - Usa `@ControllerAdvice` para tratar exceções da API.
  - Converte `ObjectNotFoundException` em resposta HTTP 404 com um objeto `StandardError`.
- `StandardError`  
  - Estrutura com `timestamp`, `status`, `error`, `message`, `path`.

### `services/exception/`

- `ObjectNotFoundException`  
  - Exceção de runtime usada quando um objeto não é encontrado no banco.

### `config/Instantiation`

- Classe `Instantiation` com `@Configuration` e `implements CommandLineRunner`.
- Ao subir a aplicação:
  - Limpa as coleções (`deleteAll`).
  - Insere dados de teste para:
    - Clientes
    - Prestadores
    - Serviços
    - Agendamentos

---

## 💾 Conexão com o MongoDB

Configuração típica em `src/main/resources/application.properties`:

```properties
spring.application.name=homeherolite
spring.data.mongodb.uri=mongodb://localhost:27017/homeherolite
server.port=8080
