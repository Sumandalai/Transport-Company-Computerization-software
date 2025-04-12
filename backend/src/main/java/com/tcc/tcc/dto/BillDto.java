package com.tcc.tcc.dto;

import com.tcc.tcc.entity.Consignment;

import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BillDto {
    private Long id;

    private double transportCharge;
    private LocalDateTime generatedDate;
    private ConsignmentDto consignment;
}
