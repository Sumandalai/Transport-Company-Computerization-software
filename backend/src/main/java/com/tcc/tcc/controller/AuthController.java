package com.tcc.tcc.controller;
import com.tcc.tcc.dto.LoginRequest;
import com.tcc.tcc.dto.Response;
import com.tcc.tcc.entity.BranchOffice;
import com.tcc.tcc.service.interfac.IboService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private IboService userService;

    @PostMapping("/register")
    public ResponseEntity<Response> register(@RequestBody BranchOffice user) {
        Response response = userService.register(user);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Response> login(@RequestBody LoginRequest loginRequest) {
        Response response = userService.login(loginRequest);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}