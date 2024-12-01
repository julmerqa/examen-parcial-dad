package jqa.ms_auth.service;

import jqa.ms_auth.dto.AuthUserDto;
import jqa.ms_auth.entity.AuthUser;
import jqa.ms_auth.entity.TokenDto;

public interface AuthUserService {
    public AuthUser save(AuthUserDto authUserDto);


    public TokenDto login(AuthUserDto authUserDto);


    public TokenDto validate(String token);
}
