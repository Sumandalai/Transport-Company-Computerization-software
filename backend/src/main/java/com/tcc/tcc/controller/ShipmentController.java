package com.tcc.tcc.controller;

import com.tcc.tcc.dto.ShipmentRequest;
import com.tcc.tcc.dto.ShipmentResponse;
import com.tcc.tcc.service.impl.shipmentService;
import com.tcc.tcc.dto.Response;
import com.tcc.tcc.entity.Consignment;
import com.tcc.tcc.entity.ConsignmentStatus;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consignments")
public class ShipmentController {

    @Autowired
    private shipmentService shipmentservice;

//    @PostMapping
//    public ResponseEntity<Response> createConsignment(
//            @Valid @RequestBody Consignment request) {
//        Response response = consignmentService.createConsignment(request);
//        return ResponseEntity.status(HttpStatus.CREATED).body(response);
//    }

    @PostMapping
    public ResponseEntity<ShipmentResponse> createShipment(
            @Valid @RequestBody ShipmentRequest request) {
        return ResponseEntity.ok(shipmentservice.createShipment(request));
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<Response> getConsignmentById(@PathVariable Long id) {
//        return ResponseEntity.ok(consignmentService.getConsignmentById(id));
//    }
//
//    // Update consignment status
//    @PutMapping("/{id}/status")
//    public ResponseEntity<Response> updateStatus(
//            @PathVariable Long id,
//            @RequestParam ConsignmentStatus newStatus) {
//        return ResponseEntity.ok(consignmentService.updateStatus(id, newStatus));
//    }
//
//    // Get consignments with filters
//    @GetMapping
//    public ResponseEntity<List<Response>> getConsignments(
//            @RequestParam(required = false) ConsignmentStatus status,
//            @RequestParam(required = false) Long branchId,
//            @RequestParam(required = false) Long destinationId) {
////        return ResponseEntity.ok(consignmentService.getConsignmentsByFilters(
////                status, branchId, destinationId
////        ));
//    }
//
//    // Get accumulated volume for destination
//    @GetMapping("/volume/{destinationId}")
//    public ResponseEntity<Double> getAccumulatedVolume(
//            @PathVariable Long destinationId) {
//        return ResponseEntity.ok(consignmentService.getAccumulatedVolume(destinationId));
//    }
//
//    @GetMapping("/average-waiting-time")
//    public ResponseEntity<Double> getAverageWaitingTime(
//            @RequestParam(required = false) Long destinationId) {
//        return ResponseEntity.ok(consignmentService.getAverageWaitingTime(destinationId));
//    }







}
