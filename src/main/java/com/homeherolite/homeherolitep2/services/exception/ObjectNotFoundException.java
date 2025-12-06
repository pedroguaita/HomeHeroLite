package com.homeherolite.homeherolitep2.services.exception;

//compilador nao exige que eu trate a exceção
public class ObjectNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    
    public ObjectNotFoundException(String msg){
        super(msg);
    }
}
