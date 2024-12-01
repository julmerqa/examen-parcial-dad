package jqa.com.ms_categoria.repository;


import jqa.com.ms_categoria.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository <Categoria,Integer> {
}
