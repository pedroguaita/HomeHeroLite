/**
 * Classe criada para resource de prestador
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

import com.homeherolite.homeherolitep2.domain.Prestador;
import org.springframework.web.bind.annotation.RequestMethod;

//Controlador REST. 
//os métodos vão responder requisições HTTP e retornar JSON
@RestController

//caminho do ENDPOINT
@RequestMapping(value="/prestadores")

public class PrestadorResource {

    @RequestMapping(method=RequestMethod.GET) // endpoint rest - GET obtém informações do padrão REST 

    //encapsular estrutura necessária para retornar respostas em HTTP
    public ResponseEntity<List<Prestador>> listarPrestadores(){
       Prestador carlos = new Prestador("1", "Carlos Souza", "carlos@email.com", "333.333.333-33", "Eletricista");
       Prestador ana = new Prestador("2", "Ana Lima", "ana@email.com", "444.444.444-44", "Diarista");
       List<Prestador> lista = new ArrayList<>();
       lista.addAll(Arrays.asList(carlos, ana));
       return ResponseEntity.ok().body(lista);  //vai instanciar com código de resposta HTTP (sucesso).
    }
}
