/**
 * Classe criada para resource de serviço
 * @author Pedro Pereira Guaita
 * @since 05/12/2025
 */

package com.homeherolite.homeherolitep2.resources;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.homeherolite.homeherolitep2.domain.Servico;
import org.springframework.web.bind.annotation.RequestMethod;

//Controlador REST. 
//os métodos vão responder requisições HTTP e retornar JSON
@RestController

//caminho do ENDPOINT
@RequestMapping(value="/servicos")

public class ServicoResource {

    @RequestMapping(method=RequestMethod.GET) // endpoint rest - GET obtém informações do padrão REST 

    //encapsular estrutura necessária para retornar respostas em HTTP
    public ResponseEntity<List<Servico>> listarServicos(){
       Servico limpeza = new Servico("1", "Limpeza Residencial", "Limpeza completa de residência", 150.0);
       Servico eletrica = new Servico("2", "Serviço Elétrico", "Reparo e manutenção elétrica básica", 200.0);
       List<Servico> lista = new ArrayList<>();
       lista.addAll(Arrays.asList(limpeza, eletrica));
       return ResponseEntity.ok().body(lista);  //vai instanciar com código de resposta HTTP (sucesso).
    }
}
