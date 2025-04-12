package com.tcc.tcc.service.interfac;

import com.tcc.tcc.dto.LoginRequest;
import com.tcc.tcc.dto.Response;
import com.tcc.tcc.entity.BranchOffice;

public interface IboService {
    Response register(BranchOffice user);

    Response login(LoginRequest loginRequest);

    Response getAllBos();

    Response deleteUser(String userId);

    Response getBoById(String userId);

//    Response getMyInfo(String email);
}
