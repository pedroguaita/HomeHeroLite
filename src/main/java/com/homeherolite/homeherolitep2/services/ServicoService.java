package com.homeherolite.homeherolitep2.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.homeherolite.homeherolitep2.domain.Servico;
import com.homeherolite.homeherolitep2.dto.ServicoDTO;
import com.homeherolite.homeherolitep2.repository.ServicoRepository;
import com.homeherolite.homeherolitep2.services.exception.ObjectNotFoundException;

@Service
public class ServicoService {
    
    @Autowired
    private ServicoRepository repo;

    //método para listar serviços
    public List<Servico> listarServicos(){
        return repo.findAll();
    }

    //Método para buscar um serviço por ID
    public Servico buscarId(String id){
        Optional<Servico> obj = repo.findById(id);
        return obj.orElseThrow(() -> new ObjectNotFoundException("Serviço não encontrado."));
    }

    //método para inserir um serviço
    public Servico inserir(Servico obj){
        return repo.insert(obj);
    }

    //método para deletar serviço
    public void deletar(String id){
        buscarId(id);
        repo.deleteById(id);
    }

    //método para atualizar serviço
    public Servico atualizar(Servico obj) {
        Servico newObj = buscarId(obj.getId());
        atualizarDado(newObj, obj);
        return repo.save(newObj);
    }

    private void atualizarDado(Servico newObj, Servico obj) {
        newObj.setNome(obj.getNome());
        newObj.setCategoria(obj.getCategoria());
        newObj.setDescricao(obj.getDescricao());
        newObj.setPreco(obj.getPreco());
    }

    public Servico fromDTO(ServicoDTO objDto){
        return new Servico(
            objDto.getId(),
            objDto.getNome(),
            objDto.getCategoria(),
            objDto.getDescricao(),
            objDto.getPreco()
        );
    }
}
