package gwcl.com.ms_auth.service;

import gwcl.com.ms_auth.dto.AuthUserDto;
import gwcl.com.ms_auth.entity.AuthUser;
import gwcl.com.ms_auth.entity.TokenDto;

import java.util.List;
import java.util.Optional;

public interface AuthUserService {
    AuthUser save(AuthUserDto authUserDto);
    TokenDto login(AuthUserDto authUserDto);
    TokenDto validate(String token);

    List<AuthUser> lista();
    Optional<AuthUser> buscarPorId(Integer id);
    AuthUser actualizar(AuthUser authUser);
}