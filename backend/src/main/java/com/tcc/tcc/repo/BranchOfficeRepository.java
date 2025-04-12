package com.tcc.tcc.repo;

import com.tcc.tcc.entity.BranchOffice;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;
import java.util.Optional;

// Branch Office Repository
public interface BranchOfficeRepository extends JpaRepository<BranchOffice, Long> {
    List<BranchOffice> findByCity(String city);
//    Optional<BranchOffice> findByType(String type);

    @Query("SELECT bo FROM BranchOffice bo WHERE bo.role = 'HEAD_OFFICE'")
    Optional<BranchOffice> findHeadOffice();


    Optional<BranchOffice> findByEmail(String email);

    boolean existsByEmail(@NotBlank(message = "Email is required") String email);
}
