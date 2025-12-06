/**
 * Classe criada para DTO de Agendamento
 * @author Pedro Pereira Guaita
 * @since 05/12/2025
 */

package com.homeherolite.homeherolitep2.dto;

import java.io.Serializable;

import com.homeherolite.homeherolitep2.domain.Agendamento;

public class AgendamentoDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;
    private String data;
    private String horario;
    private String clienteId;
    private String prestadorId;
    private String servicoId;
    private String status;

    public AgendamentoDTO() {
    }

    // Construtor que recebe a entidade Agendamento
    public AgendamentoDTO(Agendamento a) {
        id = a.getId();
        data = a.getData();
        horario = a.getHorario();
        clienteId = a.getClienteId();
        prestadorId = a.getPrestadorId();
        servicoId = a.getServicoId();
        status = a.getStatus();
    }

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
}
