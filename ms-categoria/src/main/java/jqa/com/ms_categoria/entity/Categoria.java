package jqa.com.ms_categoria.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String jqaNombre;
    private String jqaCategoria;
}
