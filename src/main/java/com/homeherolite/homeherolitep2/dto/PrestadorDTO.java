/**
 * Classe criada para DTO de Prestador
 * @author Pedro Pereira Guaita
 * @since 05/12/2025
 */

package com.homeherolite.homeherolitep2.dto;

import java.io.Serializable;

import com.homeherolite.homeherolitep2.domain.Prestador;

public class PrestadorDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;
    private String name;
    private String email;
    private String cpf;
    private String especialidade;

    public PrestadorDTO() {
    }

    // Construtor para inicializar a partir do objeto entidade correspondente
    public PrestadorDTO(Prestador p) {
        id = p.getId();
        name = p.getName();
        email = p.getEmail();
        cpf = p.getCpf();
        especialidade = p.getEspecialidade();
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

    public String getEspecialidade() {
        return especialidade;
    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
    }
}
