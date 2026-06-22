package com.rentnest.backend.service;

import com.rentnest.backend.dto.AuthResponse;
import com.rentnest.backend.dto.LoginRequest;
import com.rentnest.backend.dto.RegisterRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}