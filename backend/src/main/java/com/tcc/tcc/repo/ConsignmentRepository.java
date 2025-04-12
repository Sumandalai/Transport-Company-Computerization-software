package com.tcc.tcc.repo;

import com.tcc.tcc.entity.BranchOffice;
import com.tcc.tcc.entity.Consignment;
import com.tcc.tcc.entity.ConsignmentStatus;
import com.tcc.tcc.entity.TruckAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

public interface ConsignmentRepository extends JpaRepository<Consignment, Long> {
    List<Consignment> findByBranchOfficeId(Long branchId);
    List<Consignment> findByDestinationBranchId(Long destinationId);

    @Query("SELECT c.destinationBranch.city, SUM(c.volume) " +
            "FROM Consignment c " +
            "WHERE c.status = 'RECEIVED' " +
            "GROUP BY c.destinationBranch.city " +
            "HAVING SUM(c.volume) >= :minVolume")
    List<Object[]> findDestinationsWithMinVolume(@Param("minVolume") double minVolume);

//    Double sumVolumeBySourceAndDestination(Long id, Long id1, ConsignmentStatus consignmentStatus);
    @Query("SELECT SUM(c.volume) FROM Consignment c " +
            "WHERE c.branchOffice.id = :sourceId " +
            "AND c.destinationBranch.id = :destinationId " +
            "AND c.status = :status")
    Double sumVolumeBySourceAndDestination(
            @Param("sourceId") Long sourceId,
            @Param("destinationId") Long destinationId,
            @Param("status") ConsignmentStatus status
    );

    List<Consignment> findByBranchOfficeAndDestinationBranchAndStatus(
            BranchOffice branchOffice,
            BranchOffice destinationBranch,
            ConsignmentStatus status
    );

//    @Query("SELECT SUM(c.volume) FROM Consignment c WHERE c.truckAssignment = :assignment")
//    Double sumVolumeByAssignment(@Param("assignment") TruckAssignment assignment);

    // In ConsignmentRepository.java
    @Query("SELECT COALESCE(SUM(c.volume), 0.0) FROM Consignment c WHERE c.truckAssignment = :assignment")
    Double sumVolumeByAssignment(@Param("assignment") TruckAssignment assignment);

    @Query("SELECT SUM(c.volume) FROM Consignment c WHERE c.branchOffice = :branch AND c.status = :status")
    Double sumVolumeByBranchAndStatus(
            @Param("branch") BranchOffice branch,
            @Param("status") ConsignmentStatus status
    );

    @Query("SELECT COALESCE(SUM(c.volume), 0.0) FROM Consignment c " +
            "WHERE c.branchOffice.id = :sourceBranchId " +
            "AND c.destinationBranch.id = :destinationBranchId " +
            "AND c.status IN :statuses")
    Double sumVolumeByBranchesAndStatuses(
            @Param("sourceBranchId") Long sourceBranchId,
            @Param("destinationBranchId") Long destinationBranchId,
            @Param("statuses") List<ConsignmentStatus> statuses
    );


    List<Consignment> findByBranchOfficeAndStatus(
            BranchOffice branchOffice,
            ConsignmentStatus status
    );

    @Query("SELECT c FROM Consignment c " +
            "WHERE c.branchOffice.id = :sourceBranchId " +
            "AND c.destinationBranch.id = :destinationBranchId " +
            "AND c.status IN :statuses")
    List<Consignment> findBySourceAndDestinationAndStatuses(
            @Param("sourceBranchId") Long sourceBranchId,
            @Param("destinationBranchId") Long destinationBranchId,
            @Param("statuses") List<ConsignmentStatus> statuses
    );



}