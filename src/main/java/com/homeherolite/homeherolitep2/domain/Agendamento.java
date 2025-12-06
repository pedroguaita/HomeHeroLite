/**
 * Classe criada para objeto agendamento
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
public class Agendamento implements Serializable{
    private static final long serialVersionUID = 1L;
    
    @Id
    private String id;      
    private String data;       
    private String horario;     
    private String clienteId;   
    private String prestadorId; 
    private String servicoId;   
    private String status;      

    // Construtor padrão (
    public Agendamento() {
    }

    //Método construtor
    public Agendamento(String id, String data, String horario, String clienteId,
                       String prestadorId, String servicoId, String status) {
        this.id = id;
        this.data = data;
        this.horario = horario;
        this.clienteId = clienteId;
        this.prestadorId = prestadorId;
        this.servicoId = servicoId;
        this.status = status;
    }

    //Métodos assessores
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getHorario() {
        return horario;
    }

    public void setHorario(String horario) {
        this.horario = horario;
    }

    public String getClienteId() {
        return clienteId;
    }

    public void setClienteId(String clienteId) {
        this.clienteId = clienteId;
    }

    public String getPrestadorId() {
        return prestadorId;
    }

    public void setPrestadorId(String prestadorId) {
        this.prestadorId = prestadorId;
    }

    public String getServicoId() {
        return servicoId;
    }

    public void setServicoId(String servicoId) {
        this.servicoId = servicoId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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
        // equals compara objetos Agendamento pelo id, não pelo conteúdo completo
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Agendamento other = (Agendamento) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }

}
