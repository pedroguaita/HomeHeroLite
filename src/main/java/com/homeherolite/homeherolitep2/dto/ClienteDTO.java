package com.homeherolite.homeherolitep2.dto;

import java.io.Serializable;

import com.homeherolite.homeherolitep2.domain.Cliente;

public class ClienteDTO implements Serializable{
    
    private static final long serialVersionUID = 1L;
    private String id;      
    private String name;   
    private String email;   
    private String cpf; 
 
    public ClienteDTO(){

    }

    //Construtor para inicializar a partir do objeto entitie correspondente
    public ClienteDTO(Cliente c){
        id = c.getId();
        name = c.getName();
        email = c.getEmail();
        cpf = c.getCpf();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    
}
