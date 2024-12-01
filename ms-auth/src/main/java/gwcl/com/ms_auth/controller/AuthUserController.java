package gwcl.com.ms_auth.controller;


import gwcl.com.ms_auth.dto.AuthUserDto;
import gwcl.com.ms_auth.entity.AuthUser;
import gwcl.com.ms_auth.entity.TokenDto;
import gwcl.com.ms_auth.service.AuthUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
public class AuthUserController {
    @Autowired
    AuthUserService authUserService;

    @PostMapping("/login")
    public ResponseEntity<TokenDto>  login(@RequestBody AuthUserDto authUserDto){
        TokenDto tokenDto = authUserService.login(authUserDto);
        if (tokenDto == null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(tokenDto);
    }

    @PostMapping("/validate")
    public ResponseEntity<TokenDto> validate (@RequestParam String token){
        TokenDto tokenDto = authUserService.validate(token);
        if(tokenDto == null)
            return ResponseEntity.badRequest().build();
        return ResponseEntity.ok(tokenDto);
    }

    @PostMapping("/create")
    public ResponseEntity<AuthUser> create(@RequestBody AuthUserDto authUserDto){
        AuthUser authUser = authUserService.save(authUserDto);
        if (authUser == null)
            return ResponseEntity.badRequest().build();
        return ResponseEntity.ok(authUser);
    }

    @GetMapping("/users")
    public ResponseEntity<List<AuthUser>> getAllUsers(){
        return ResponseEntity.ok(authUserService.lista());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<AuthUser> buscarPorId(@PathVariable Integer id){
        return ResponseEntity.of(authUserService.buscarPorId(id));
    }

    @PutMapping("/users")
    public ResponseEntity<AuthUser> actualizar(@RequestBody AuthUser authUser){
        return ResponseEntity.ok(authUserService.actualizar(authUser));
    }
}
