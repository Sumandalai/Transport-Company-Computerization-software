package com.tcc.tcc.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TruckStatusDTO{
        private Long truckId;
        private String licensePlate;
        private String currentBranch;
        private String destinationCity;
        private double accumulatedVolume;
        private String dispatchStatus;

}
