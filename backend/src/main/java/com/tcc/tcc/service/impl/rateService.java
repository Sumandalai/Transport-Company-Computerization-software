package com.tcc.tcc.service.impl;

import com.tcc.tcc.entity.BranchOffice;
import org.springframework.stereotype.Service;

@Service
public class rateService {
    private static final double BASE_RATE = 10.0;

    public double calculateCharge(double volume, BranchOffice destination) {
        // Implement your actual rate calculation logic
        return volume * BASE_RATE * getCityMultiplier(destination.getCity());
    }

    private double getCityMultiplier(String city) {
        return switch (city.toLowerCase()) {
            case "capital" -> 1.5;
            case "remote" -> 2.0;
            default -> 1.0;
        };
    }
}
