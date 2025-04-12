package com.tcc.tcc.repo;

import org.springframework.data.geo.Distance;

import java.util.List;

public interface DistanceRepository {
    List<Distance> findAll();
}
