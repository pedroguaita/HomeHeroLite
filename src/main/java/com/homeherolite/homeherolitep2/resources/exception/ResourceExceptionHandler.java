package com.homeherolite.homeherolitep2.resources.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.homeherolite.homeherolitep2.services.exception.ObjectNotFoundException;

import jakarta.servlet.http.HttpServletRequest;

@ControllerAdvice
// Classe responsável por tratar exceções lançadas pelos controllers (tratamento global)
public class ResourceExceptionHandler {

    @ExceptionHandler(ObjectNotFoundException.class)
    // Método executado sempre que uma ObjectNotFoundException for lançada em algum controller
    public ResponseEntity<StandardError> objectNotFound(ObjectNotFoundException e,
                                                        HttpServletRequest request) {

        // Código de status HTTP que será retornado (404 - NOT FOUND)
        HttpStatus status = HttpStatus.NOT_FOUND;

        // Monta o objeto de erro padrão que será enviado como resposta em JSON
        StandardError err = new StandardError(
                System.currentTimeMillis(),   // instante em que o erro ocorreu (timestamp)
                status.value(),               // código numérico do status HTTP (ex.: 404)
                "Não encontrado",             // descrição genérica do tipo de erro
                e.getMessage(),               // mensagem específica da exceção
                request.getRequestURI()       // URI da requisição que causou o erro
        );

        // Retorna a resposta HTTP com o status definido e o corpo contendo o StandardError
        return ResponseEntity.status(status).body(err);
    }
}
