package com.tcc.tcc.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.tcc.tcc.entity.Client;
import lombok.Data;

import java.util.List;
import java.util.Optional;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ShipmentRequest {
    private String senderName;
    private String senderEmail;
    private String receiverEmail;
    private String senderAddress;
    private String receiverName;
    private String receiverAddress;
    private List<ConsignmentDetail> consignmentDetails;

    public record ConsignmentDetail(
            double volume,
            Long destinationBranchId
    ) {}
}
