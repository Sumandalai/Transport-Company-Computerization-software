package com.tcc.tcc.repo;

import com.tcc.tcc.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface BillRepository extends JpaRepository<Bill, Long> {
//    Optional<Bill> findByConsignmentId(Long consignmentId);

//    @Query("SELECT SUM(b.transportCharge) FROM Bill b WHERE b.consignment.destinationBranch.id = :destinationId")
//    Double calculateTotalRevenueByDestination(@Param("destinationId") Long destinationId);
//
//    @Query("SELECT b FROM Bill b WHERE b.generatedDate BETWEEN :start AND :end")
//    List<Bill> findBillsBetweenDates(@Param("start") LocalDateTime start,
//                                     @Param("end") LocalDateTime end);
}
