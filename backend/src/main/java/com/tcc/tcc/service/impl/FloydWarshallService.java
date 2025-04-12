package com.tcc.tcc.service.impl;

import com.tcc.tcc.entity.BranchOffice;
import com.tcc.tcc.repo.BranchOfficeRepository;
import com.tcc.tcc.repo.DistanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Distance;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FloydWarshallService {

    @Autowired
    private BranchOfficeRepository branchOfficeRepo;

    @Autowired
    private DistanceRepository distanceRepo;

    public double[][] floydWarshall() {
        List<BranchOffice> offices = branchOfficeRepo.findAll();
        int n = offices.size();

        // Map branch IDs to matrix indices
        Map<Integer, Integer> indexMap = new HashMap<>();
        for (int i = 0; i < n; i++) {
            indexMap.put(offices.get(i).getId(), i);
        }

        double[][] dist = new double[n][n];

        // Initialize distances
        for (double[] row : dist) {
            Arrays.fill(row, Double.POSITIVE_INFINITY);
        }
        for (int i = 0; i < n; i++) {
            dist[i][i] = 0;
        }

        // Load edges from DB
        List<Distance> distances = distanceRepo.findAll();
        for (Distance d : distances) {
            int u = indexMap.get(d.getSource().getId());
            int v = indexMap.get(d.getDestination().getId());
            dist[u][v] = d.getWeight();
        }

        // Floyd-Warshall core
        for (int k = 0; k < n; k++) {
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    if (dist[i][k] + dist[k][j] < dist[i][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }

        return dist;
    }
}
