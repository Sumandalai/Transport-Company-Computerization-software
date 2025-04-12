package com.tcc.tcc.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ShipmentResponse {
    private Long clientId;
    private Long billId;
    private double totalCharge;
    private LocalDateTime generatedDate;
    private List<ConsignmentResponse> consignments;

    public record ConsignmentResponse(
            Long id,
            double volume,
            String destinationBranch
    ) {}
}
