package jqa.ms_producto.repository;

import jqa.ms_producto.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository <Producto, Integer> {
}
