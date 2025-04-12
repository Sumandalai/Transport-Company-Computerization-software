package com.tcc.tcc.service.interfac;

import com.tcc.tcc.dto.Response;
import com.tcc.tcc.dto.ShipmentRequest;
import com.tcc.tcc.dto.ShipmentResponse;
import com.tcc.tcc.entity.Consignment;
import com.tcc.tcc.entity.ConsignmentStatus;

public interface IshipmentService {

    ShipmentResponse createShipment (ShipmentRequest request);
    Response getConsignmentById(Long id);
    Response updateStatus(Long id, ConsignmentStatus newStatus);
    Response getConsignmentsByFilters(ConsignmentStatus status, Long branchId, Long destinationId);
    Double getAccumulatedVolume(Long destinationId);
    Double getAverageWaitingTime(Long destinationId);
}
