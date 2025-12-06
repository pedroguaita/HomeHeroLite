/**
 * Classe criada para resource de agendamento
 * @author Pedro Pereira Guaita
 * @since 05/12/2025
 */

package com.homeherolite.homeherolitep2.resources;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;

import com.homeherolite.homeherolitep2.domain.Agendamento;
import com.homeherolite.homeherolitep2.dto.AgendamentoDTO;
import com.homeherolite.homeherolitep2.services.AgendamentoService;

@RestController
@RequestMapping(value="/agendamentos")
public class AgendamentoResource {

    @Autowired
    private AgendamentoService service;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<AgendamentoDTO>> listarAgendamentos() {

        List<Agendamento> lista = service.listarAgendamentos();
        List<AgendamentoDTO> listaDTO = lista.stream()
                                             .map(a -> new AgendamentoDTO(a))
                                             .collect(Collectors.toList());

        return ResponseEntity.ok().body(listaDTO);
    }
}
