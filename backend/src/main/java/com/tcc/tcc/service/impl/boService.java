package com.tcc.tcc.service.impl;

import com.tcc.tcc.dto.BranchOfficeDto;
import com.tcc.tcc.dto.LoginRequest;
import com.tcc.tcc.dto.Response;
import com.tcc.tcc.entity.BranchOffice;
import com.tcc.tcc.exception.OurException;
import com.tcc.tcc.repo.BranchOfficeRepository;
import com.tcc.tcc.service.interfac.IboService;
import com.tcc.tcc.utils.JWTUtils;
import com.tcc.tcc.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class boService implements IboService {
    @Autowired
    private BranchOfficeRepository branchOfficeRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private AuthenticationManager authenticationManager;


    @Override
    public Response register(BranchOffice user) {
        Response response = new Response();
        try {
            if (user.getRole() == null || user.getRole().isBlank()) {
                user.setRole("Branch Office");
            }
            if (branchOfficeRepository.existsByEmail(user.getEmail())) {
                throw new OurException(user.getEmail() + "Already Exists");
            }
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            BranchOffice savedUser = branchOfficeRepository.save(user);
            BranchOfficeDto userDTO = Utils.mapBranchOfficeentitytoBranchOfficeDto(savedUser);
            response.setStatusCode(200);
            response.setBranchOffice(userDTO);

        } catch (OurException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Occurred During USer Registration " + e.getMessage());

        }
        return response;
    }

    @Override
    public Response login(LoginRequest loginRequest) {

        Response response = new Response();

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            var user = branchOfficeRepository.findByEmail(loginRequest.getEmail()).orElseThrow(() -> new OurException("user Not found"));

            var token = jwtUtils.generateToken(user);
            response.setStatusCode(200);
            response.setToken(token);
            response.setRole(user.getRole());
            response.setExpirationTime("7 Days");
            response.setMessage("successful");

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        } catch (Exception e) {

            response.setStatusCode(500);
            response.setMessage("Error Occurred During USer Login " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAllBos() {
        return null;
    }

    @Override
    public Response deleteUser(String userId) {
        return null;
    }

    @Override
    public Response getBoById(String userId) {
        return null;
    }
}


