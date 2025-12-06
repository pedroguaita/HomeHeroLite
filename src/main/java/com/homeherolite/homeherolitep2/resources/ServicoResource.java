/**
 * Classe criada para resource de serviço
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

import com.homeherolite.homeherolitep2.domain.Servico;
import com.homeherolite.homeherolitep2.dto.ServicoDTO;
import com.homeherolite.homeherolitep2.services.ServicoService;

@RestController
@RequestMapping(value="/servicos")
public class ServicoResource {

    @Autowired
    private ServicoService service;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<ServicoDTO>> listarServicos() {

        List<Servico> lista = service.listarServicos();
        List<ServicoDTO> listaDTO = lista.stream()
                                         .map(s -> new ServicoDTO(s))
                                         .collect(Collectors.toList());

        return ResponseEntity.ok().body(listaDTO);
    }
}
