package com.tcc.tcc.repo;

import com.tcc.tcc.entity.BranchOffice;
import com.tcc.tcc.entity.Truck;
import com.tcc.tcc.entity.TruckAssignment;
import com.tcc.tcc.entity.TruckAssignmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

// Truck Assignment Repository
public interface TruckAssignmentRepository extends JpaRepository<TruckAssignment, Long> {
    List<TruckAssignment> findByTruckId(Long truckId);

    @Query("SELECT ta FROM TruckAssignment ta " +
            "WHERE ta.truck.id = :truckId " +
            "AND ta.status IN :statuses")
    Optional<TruckAssignment> findByTruckIdAndStatusIn(
            @Param("truckId") Long truckId,
            @Param("statuses") List<TruckAssignmentStatus> statuses
    );
    Optional<TruckAssignment> findByTruckAndStatus(Truck truck, TruckAssignmentStatus status);
    boolean existsBySourceBranchAndDestinationBranchAndStatusIn(
            BranchOffice source,
            BranchOffice destination,
            List<TruckAssignmentStatus> statuses
    );

    Optional<TruckAssignment> findBySourceBranchAndStatusIn(
            BranchOffice sourceBranch,
            List<TruckAssignmentStatus> statuses
    );

//    @Query("SELECT ta FROM TruckAssignment ta WHERE ta.status = :status AND ta.sourceBranch.id = :branchId")
//    List<TruckAssignment> findByStatusAndSourceBranch(@Param("status") TruckAssignmentStatus status,
//                                                      @Param("branchId") Long branchId);
//
//    @Query("SELECT ta FROM TruckAssignment ta WHERE ta.departureTime BETWEEN :start AND :end")
//    List<TruckAssignment> findAssignmentsBetweenDates(@Param("start") LocalDateTime start,
//                                                      @Param("end") LocalDateTime end);

//    @Query("SELECT AVG(TIMESTAMPDIFF(HOUR, ta.arrivalTime, ta.nextAssignment.departureTime)) " +
//            "FROM TruckAssignment ta WHERE ta.truck.id = :truckId")
//    Double calculateAverageIdleTime(@Param("truckId") Long truckId);
}
