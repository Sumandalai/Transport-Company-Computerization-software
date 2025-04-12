package com.tcc.tcc.dto;

import com.tcc.tcc.entity.BranchOffice;
import com.tcc.tcc.entity.TruckAssignment;
import com.tcc.tcc.entity.TruckStatus;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TruckDto {
    private Long id;
    private String licensePlate;
    private Long currentBranchID;
    private TruckStatus status;

}
