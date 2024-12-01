package jqa.com.ms_categoria.service.impl;

import jqa.com.ms_categoria.entity.Categoria;
import jqa.com.ms_categoria.repository.CategoriaRepository;
import jqa.com.ms_categoria.service.CategoriaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
@Service
public class CategoriaServiceImpl implements CategoriaService {
    @Autowired
    private CategoriaRepository categoriaRepository;

    @Override
    public List<Categoria> lista() {

        return categoriaRepository.findAll();
    }

    @Override
    public Categoria guardar(Categoria categoria) {

        return categoriaRepository.save(categoria);
    }

    @Override
    public Optional<Categoria> buscarPorId(Integer id) {

        return categoriaRepository.findById(id);
    }

    @Override
    public Categoria actualizar(Categoria categoria) {

        return categoriaRepository.save(categoria);
    }

    @Override
    public void eleminar(Integer id) {
        categoriaRepository.deleteById(id);

    }
}
