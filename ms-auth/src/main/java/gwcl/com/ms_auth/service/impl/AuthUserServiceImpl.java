package gwcl.com.ms_auth.service.impl;

import gwcl.com.ms_auth.dto.AuthUserDto;

import gwcl.com.ms_auth.entity.AuthUser;

import gwcl.com.ms_auth.entity.TokenDto;
import gwcl.com.ms_auth.repository.AuthRepository;
import gwcl.com.ms_auth.security.JwtProvider;
import gwcl.com.ms_auth.service.AuthUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthUserServiceImpl implements AuthUserService {
    @Autowired
    AuthRepository authRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    JwtProvider jwtProvider;

    @Override
    public AuthUser save(AuthUserDto authUserDto) {
        Optional<AuthUser> user = authRepository.findByUserName(authUserDto.getUserName());
        if (user.isPresent())
            return null;
        String password = passwordEncoder.encode(authUserDto.getPassword());
        AuthUser authUser = AuthUser.builder()
                .userName(authUserDto.getUserName())
                .password(password)
                .role(AuthUser.Role.USER_DEFAULT) // Asigna el rol por defecto
                .build();

        return authRepository.save(authUser);
    }

    @Override
    public TokenDto login(AuthUserDto authUserDto) {
        Optional<AuthUser> user = authRepository.findByUserName(authUserDto.getUserName());
        if (!user.isPresent())
            return null;

        if (passwordEncoder.matches(authUserDto.getPassword(), user.get().getPassword())) {
            // Devolver el token, id de usuario y rol
            return new TokenDto(jwtProvider.createToken(user.get()), user.get().getId(), user.get().getRole().name());
        }

        return null;
    }

    @Override
    public TokenDto validate(String token) {
        if (!jwtProvider.validate(token))
            return null;

        String username = jwtProvider.getUserNameFromToken(token);
        Optional<AuthUser> user = authRepository.findByUserName(username);
        if (!user.isPresent())
            return null;

        // Devolvemos el token, ID del usuario y rol
        return new TokenDto(token, user.get().getId(), user.get().getRole().name());
    }

    @Override
    public List<AuthUser> lista(){
        return authRepository.findAll();
    }

    @Override
    public Optional<AuthUser> buscarPorId(Integer id) {
        return authRepository.findById(id);
    }

    @Override
    public AuthUser actualizar(AuthUser authUser){
        return authRepository.save(authUser);
    }
}
