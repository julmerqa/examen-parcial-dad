package jqa.com.ms_categoria.service;

import jqa.com.ms_categoria.entity.Categoria;
import org.springframework.stereotype.Service;
import java.util.*;
@Service
public interface CategoriaService {
    List<Categoria> lista();
    Categoria guardar(Categoria categoria);
    Optional<Categoria> buscarPorId(Integer id);
    Categoria actualizar(Categoria categoria);
    void eleminar(Integer id);
}
