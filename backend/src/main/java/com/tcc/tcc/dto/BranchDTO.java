package com.tcc.tcc.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BranchDTO {
    private Long id;
    private String city;
    private double accumulatedVolume;
    private boolean isDispatchReady;
}
