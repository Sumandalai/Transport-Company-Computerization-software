package com.tcc.tcc.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BranchDetailsDTO {
    BranchDTO branch;
    List<ConsignmentDto> consignments;
    TruckAssignmentDto activeAssignment ;
}
