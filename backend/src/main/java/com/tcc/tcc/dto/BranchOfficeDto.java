package com.tcc.tcc.dto;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.tcc.tcc.entity.Consignment;
import com.tcc.tcc.entity.Truck;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BranchOfficeDto {
    private Long id;
    private String email;
    private String city;
    private String role;
    private String phoneNumber;
    private List<TruckDto> trucks;
    private List<ConsignmentDto> consignments;
}
