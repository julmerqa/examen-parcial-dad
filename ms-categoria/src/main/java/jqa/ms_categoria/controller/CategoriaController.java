package jqa.ms_categoria.controller;

import jqa.ms_categoria.entity.Categoria;
import jqa.ms_categoria.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categoria")
public class CategoriaController {
    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    ResponseEntity<List<Categoria>> lista(){
        return ResponseEntity.ok(categoriaService.lista());
    }
    @PostMapping
    ResponseEntity<Categoria> guardar(@RequestBody Categoria categoria) {
        return ResponseEntity.ok(categoriaService.guardar((categoria)));
    }

    @GetMapping("/{id}")
    ResponseEntity<Categoria> buscarPorId(@PathVariable(required = true) Integer id){
        return ResponseEntity.ok(categoriaService.buscarPorId(id).get());

    }

    @PutMapping
    ResponseEntity<Categoria> actualizar(@RequestBody Categoria categoria){
        return ResponseEntity.ok(categoriaService.actualizar((categoria)));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<List<Categoria>> eliminar(@PathVariable(required = true) Integer id){
        categoriaService.eliminar(id);
        return ResponseEntity.ok(categoriaService.lista());

    }
}
