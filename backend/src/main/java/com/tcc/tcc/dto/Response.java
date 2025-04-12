package com.tcc.tcc.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response {
    private int statusCode;
    private String message;

    private String token;
    private String role;
    private String expirationTime;
    private BranchOfficeDto branchOffice;
    private List<TruckDto> trucks;
    private List<ConsignmentDto> consignments;
    private List<TruckAssignmentDto> truckAssignments;



}
