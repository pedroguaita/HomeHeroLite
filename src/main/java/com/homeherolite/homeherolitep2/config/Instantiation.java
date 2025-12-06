package com.homeherolite.homeherolitep2.config;

import java.util.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import com.homeherolite.homeherolitep2.repository.ClienteRepository;
import com.homeherolite.homeherolitep2.repository.PrestadorRepository;
import com.homeherolite.homeherolitep2.repository.ServicoRepository;
import com.homeherolite.homeherolitep2.repository.AgendamentoRepository;
import com.homeherolite.homeherolitep2.domain.Cliente;
import com.homeherolite.homeherolitep2.domain.Prestador;
import com.homeherolite.homeherolitep2.domain.Servico;
import com.homeherolite.homeherolitep2.domain.Agendamento;

//
// Classe usada para popular o banco com dados de teste
// sempre que a aplicação subir.
//
@Configuration 
// @Configuration -> avisa ao Spring que essa classe faz parte da configuração
// da aplicação (será carregada automaticamente no contexto do Spring).
public class Instantiation implements CommandLineRunner {
    // implements CommandLineRunner -> faz com que o método run()
    // seja executado automaticamente na inicialização da aplicação.

    @Autowired
    // @Autowired -> o Spring faz a "injeção de dependência":
    // ele cria o objeto do repository e coloca aqui pra gente usar.
    private ClienteRepository clienteRepository;

    @Autowired
    private PrestadorRepository prestadorRepository;

    @Autowired
    private ServicoRepository servicoRepository;

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Override
    public void run(String... args) throws Exception {

        // Limpa as coleções antes de inserir os dados de teste
        // (bom para ambiente de desenvolvimento).
        clienteRepository.deleteAll();
        prestadorRepository.deleteAll();
        servicoRepository.deleteAll();
        agendamentoRepository.deleteAll();

        // ---- CLIENTES ----
        Cliente c1 = new Cliente(null, "Pedro Guaita", "pedro@email.com", "111.111.111-11");
        Cliente c2 = new Cliente(null, "Giovanna Silva", "gih@email.com", "222.222.222-22");
        clienteRepository.saveAll(Arrays.asList(c1, c2)); // saveAll -> salva vários de uma vez

        // ---- PRESTADORES ----
        Prestador p1 = new Prestador(null, "João Eletricista", "joao@eletrica.com", "333.333.333-33", "Elétrica");
        Prestador p2 = new Prestador(null, "Maria Limpeza", "maria@limpeza.com", "444.444.444-44", "Limpeza");
        prestadorRepository.saveAll(Arrays.asList(p1, p2));

        // ---- SERVIÇOS ----
        // ---- SERVIÇOS ----
        Servico s1 = new Servico(
            null,
            "Instalação de ventilador de teto",
            "Elétrica",
            "Instalação completa de ventilador de teto em residência",
            150.0
        );

        Servico s2 = new Servico(
            null,
            "Limpeza completa de apartamento",
            "Limpeza",
            "Limpeza geral de apartamento até 70 m²",
            200.0
        );

        servicoRepository.saveAll(Arrays.asList(s1, s2));

        // ---- AGENDAMENTOS ----
        // Construtor: (id, data, horario, clienteId, prestadorId, servicoId, status)
        Agendamento a1 = new Agendamento(
            null,
            "2025-12-10",
            "14:00",
            c1.getId(),
            p1.getId(),
            s1.getId(),
            "PENDENTE"
        );

        Agendamento a2 = new Agendamento(
            null,
            "2025-12-11",
            "09:00",
            c2.getId(),
            p2.getId(),
            s2.getId(),
            "CONFIRMADO"
        );

        agendamentoRepository.saveAll(Arrays.asList(a1, a2));
    }
}
