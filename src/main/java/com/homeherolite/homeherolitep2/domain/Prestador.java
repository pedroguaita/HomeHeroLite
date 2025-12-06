/**
 * Classe criada para objeto prestador
 * @author Pedro Pereira Guaita
 * @since 05/12/2025
 */

package com.homeherolite.homeherolitep2.domain;

// Para permitir que os objetos sejam serializados (convertidos em bytes)
// e possam trafegar na rede ou ser gravados em arquivo.
import java.io.Serializable;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document //para dizer que uma classe corresponde a uma coleção MongoDB
public class Prestador implements Serializable{
    private static final long serialVersionUID = 1L;
    
    @Id
    private String id;      
    private String name;   
    private String email;   
    private String cpf; 
    private String especialidade;

    // Construtor padrão (necessário para o framework)
    public Prestador() {
    }

    //Método construtor
    public Prestador(String id, String name, String email, String cpf, String especialidade) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.cpf = cpf;
        this.especialidade = especialidade;
    }

    //Métodos assessores
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

    @Override
    public int hashCode() {
        // hashCode baseado no id para funcionar bem em coleções (Set, Map)
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        // equals compara objetos Prestador pelo id, não pelo conteúdo completo
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Prestador other = (Prestador) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }

}
