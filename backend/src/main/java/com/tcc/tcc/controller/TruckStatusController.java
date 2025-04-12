package com.tcc.tcc.controller;

import com.tcc.tcc.dto.TruckAssignmentDto;
import com.tcc.tcc.dto.TruckStatusDTO;
import com.tcc.tcc.entity.Consignment;
import com.tcc.tcc.entity.TruckAssignment;
import com.tcc.tcc.service.impl.TruckDispatchService;
import com.tcc.tcc.service.impl.TruckStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trucks")
public class TruckStatusController {
    @Autowired
    private  TruckStatusService truckStatusService;
    @Autowired
    private TruckDispatchService truckdispatchService;


    public TruckStatusController(TruckStatusService truckStatusService) {
        this.truckStatusService = truckStatusService;
    }

    @GetMapping("/status")
    public ResponseEntity<List<TruckStatusDTO>> getAllTruckStatuses() {
        return ResponseEntity.ok(truckStatusService.getAllTruckStatuses());
    }

    @PostMapping("/dispatch/{TruckID}")
    public ResponseEntity<TruckAssignmentDto> dispatchTruck(@PathVariable Long TruckID) {
        return ResponseEntity.ok(truckdispatchService.dispatchTruck(TruckID));
    }

//    @GetMapping("/{truckId}/consignments")
//    public ResponseEntity<List<Consignment>> getConsignmentDetails(
//            @PathVariable Long truckId,
//            @RequestParam String destination) {
//        return ResponseEntity.ok(
//                truckStatusService.getConsignmentDetails(truckId, destination)
//        );
//    }


}
