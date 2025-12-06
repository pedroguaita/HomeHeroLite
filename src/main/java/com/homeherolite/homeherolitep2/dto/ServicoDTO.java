/**
 * Classe criada para DTO de Serviço
 * @author Pedro Pereira Guaita
 * @since 05/12/2025
 */

package com.homeherolite.homeherolitep2.dto;

import java.io.Serializable;

import com.homeherolite.homeherolitep2.domain.Servico;

public class ServicoDTO implements Serializable {
    
    private static final long serialVersionUID = 1L;

    private String id;
    private String nome;
    private String categoria;
    private String descricao;
    private Double preco;

    // Construtor padrão (obrigatório para o framework conseguir instanciar a classe)
    public ServicoDTO() {
    }

    // Construtor para inicializar a partir da entidade Servico
    // Usado principalmente no map() dos Resources:
    // lista.stream().map(s -> new ServicoDTO(s))...
    public ServicoDTO(Servico s) {
        this.id = s.getId();
        this.nome = s.getNome();
        this.categoria = s.getCategoria();
        this.descricao = s.getDescricao();
        this.preco = s.getPreco();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Double getPreco() {
        return preco;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }
}
