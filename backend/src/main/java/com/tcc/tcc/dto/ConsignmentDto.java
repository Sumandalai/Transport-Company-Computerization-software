package com.tcc.tcc.dto;

import com.tcc.tcc.entity.Bill;
import com.tcc.tcc.entity.BranchOffice;
import com.tcc.tcc.entity.ConsignmentStatus;
import com.tcc.tcc.entity.TruckAssignment;

import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ConsignmentDto {

    private Long id;
    private double volume;
    private LocalDateTime receivedDate;
    private LocalDateTime dispatchedDate;
    private String senderName;
    private String senderAddress;
    private String receiverName;
    private String receiverAddress;
    private ConsignmentStatus status;
    private Long sourceBranchID;
    private Long destinationBranchID;

}
