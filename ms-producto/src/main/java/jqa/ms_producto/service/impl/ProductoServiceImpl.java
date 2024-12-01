package jqa.ms_producto.service.impl;

import jqa.ms_producto.dto.CategoriaDto;
import jqa.ms_producto.entity.Producto;
import jqa.ms_producto.feign.CategoriaFeign;
import jqa.ms_producto.repository.ProductoRepository;
import jqa.ms_producto.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoServiceImpl implements ProductoService {
    @Autowired
    private ProductoRepository productoRepository;
    @Autowired
    private CategoriaFeign categoriaFeign;

    @Override
    public List<Producto> lista(){
        List<Producto> productos = productoRepository.findAll();
        for (Producto producto : productos) {
            if (producto.getCategoriaId() != null) {
                CategoriaDto categoriaDto = categoriaFeign.buscarPorId(producto.getCategoriaId());
                producto.setCategoriaDto(categoriaDto);
            }
        }
        return productos;
    }

    @Override
    public Producto guardar(Producto producto) {
        return productoRepository.save(producto);
    }

    @Override
    public Optional<Producto> buscarPorId(Integer id) {
            Optional<Producto> productoOptional = productoRepository.findById(id);
            if (productoOptional.isPresent()) {
                Producto producto = productoOptional.get();
                if (producto.getCategoriaId() != null) {
                    CategoriaDto categoriaDto = categoriaFeign.buscarPorId(producto.getCategoriaId());
                    producto.setCategoriaDto(categoriaDto);
                }
                return Optional.of(producto);
            }
            return Optional.empty();
    }

    @Override
    public Producto actualizar(Producto producto) {
        return productoRepository.save(producto);
    }

    @Override
    public void eleminar(Integer id) {
        productoRepository.deleteById(id);

    }
}
