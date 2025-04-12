package com.tcc.tcc.dto;

import com.tcc.tcc.entity.BranchOffice;
import com.tcc.tcc.entity.Consignment;
import com.tcc.tcc.entity.Truck;
import com.tcc.tcc.entity.TruckAssignmentStatus;

import java.time.LocalDateTime;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TruckAssignmentDto {
    private Long id;
    private TruckDto truck;
    private String LicensePlate;
    private Long sourceBranchID;
    private Long destinationBranchID;
    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;
    private List<ConsignmentDto> consignments;
    private TruckAssignmentStatus status;



}
