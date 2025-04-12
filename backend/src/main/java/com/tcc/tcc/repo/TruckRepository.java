package com.tcc.tcc.repo;

import com.tcc.tcc.entity.BranchOffice;
import com.tcc.tcc.entity.Truck;
import com.tcc.tcc.entity.TruckStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TruckRepository extends JpaRepository<Truck, Long> {
    // Add if not exists
    List<Truck> findByStatus(TruckStatus status);
    List<Truck> findByCurrentBranchAndStatus(
            BranchOffice currentBranch,
            TruckStatus status
    );
}
