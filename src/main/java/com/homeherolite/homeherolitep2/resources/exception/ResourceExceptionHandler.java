package com.homeherolite.homeherolitep2.resources.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.homeherolite.homeherolitep2.services.exception.ObjectNotFoundException;

import jakarta.servlet.http.HttpServletRequest;

@ControllerAdvice
public class ResourceExceptionHandler {

    @ExceptionHandler(ObjectNotFoundException.class)
    public ResponseEntity<StandardError> objectNotFound(ObjectNotFoundException e,
                                                        HttpServletRequest request) {

        HttpStatus status = HttpStatus.NOT_FOUND;
        StandardError err = new StandardError(
                System.currentTimeMillis(),   // timestamp
                status.value(),               // 404
                "Não encontrado",             // erro genérico
                e.getMessage(),               // mensagem específica
                request.getRequestURI()       // path (/clientes/123, por ex.)
        );
        return ResponseEntity.status(status).body(err);
    }
}
