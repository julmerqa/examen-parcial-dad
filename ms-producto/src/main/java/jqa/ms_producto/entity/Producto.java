package jqa.ms_producto.entity;

import jqa.ms_producto.dto.CategoriaDto;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String jqaNombre;
    private String jqaProducto;

    private Integer categoriaId;

    @Transient
    private CategoriaDto CategoriaDto;
}