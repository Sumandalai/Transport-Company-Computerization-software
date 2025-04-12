package com.tcc.tcc.service.impl;

import com.tcc.tcc.dto.ConsignmentDto;
import com.tcc.tcc.dto.TruckAssignmentDto;
import com.tcc.tcc.dto.TruckDto;
import com.tcc.tcc.entity.*;
import com.tcc.tcc.repo.ConsignmentRepository;
import com.tcc.tcc.repo.TruckAssignmentRepository;
import com.tcc.tcc.repo.TruckRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.tcc.tcc.exception.OurException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TruckDispatchService {
    @Autowired
    private  TruckRepository truckRepository;
    @Autowired
    private ConsignmentRepository consignmentRepository;
    @Autowired
    private TruckAssignmentRepository truckAssignmentRepository;



    public TruckAssignmentDto dispatchTruck(Long truckId) {
        // 1. Validate truck exists and check status
        Truck truck = truckRepository.findById(truckId)
                .orElseThrow(() -> new OurException("Truck not found"));

        // 2. Check for existing scheduled assignment
        TruckAssignment assignment = truckAssignmentRepository
                .findByTruckAndStatus(truck, TruckAssignmentStatus.SCHEDULED)
                .orElseThrow(() -> new OurException("No scheduled assignment found for this truck"));



        Double totalVolume = consignmentRepository.sumVolumeByAssignment(assignment);
        double actualVolume = totalVolume != null ? totalVolume : 0.0;

        if (actualVolume < 500) {
            throw new OurException("Insufficient volume for dispatch: " + actualVolume + "/500");
        }

        // 4. Get associated consignments
        List<Consignment> consignments = assignment.getConsignments();

        // 5. Update statuses
        updateStatuses(truck, consignments, assignment);

//        return assignment;
        TruckAssignmentDto tdto = convertToDto(assignment);
        return tdto;
    }

    private void updateStatuses(Truck truck, List<Consignment> consignments,
                                TruckAssignment assignment) {

        // Update assignment status
        assignment.setStatus(TruckAssignmentStatus.IN_TRANSIT);
        assignment.setDepartureTime(LocalDateTime.now());
        truckAssignmentRepository.save(assignment);

        // Update consignment statuses
        consignments.forEach(c -> {
            c.setStatus(ConsignmentStatus.IN_TRANSIT);
            c.setTruckAssignment(assignment);
        });
        consignmentRepository.saveAll(consignments);
    }

    private TruckAssignmentDto convertToDto(TruckAssignment assignment) {
        TruckAssignmentDto dto = new TruckAssignmentDto();
        dto.setId(assignment.getId());
        dto.setTruck(convertTruckToDto(assignment.getTruck()));
        dto.setSourceBranchID(assignment.getSourceBranch() != null ? assignment.getSourceBranch().getId() : null);
        dto.setDestinationBranchID(assignment.getDestinationBranch() != null ? assignment.getDestinationBranch().getId() : null);
        dto.setDepartureTime(assignment.getDepartureTime());
        dto.setArrivalTime(assignment.getArrivalTime());
        dto.setStatus(assignment.getStatus());

        if (assignment.getConsignments() != null) {
            List<ConsignmentDto> consignmentDtos = assignment.getConsignments()
                    .stream()
                    .map(this::convertConsignmentToDto)
                    .toList();
            dto.setConsignments(consignmentDtos);
        }
        return dto;
    }

    // Conversion method: Consignment -> ConsignmentDto
    private ConsignmentDto convertConsignmentToDto(Consignment consignment) {
        ConsignmentDto cdto = new ConsignmentDto();
        cdto.setId(consignment.getId());
        cdto.setVolume(consignment.getVolume());
        cdto.setReceivedDate(consignment.getReceivedDate());
        cdto.setDispatchedDate(consignment.getDispatchedDate());
        cdto.setSenderName(consignment.getSenderName());
        cdto.setSenderAddress(consignment.getSenderAddress());
        cdto.setReceiverName(consignment.getReceiverName());
        cdto.setReceiverAddress(consignment.getReceiverAddress());
        cdto.setStatus(consignment.getStatus());
        cdto.setSourceBranchID(consignment.getBranchOffice() != null ? consignment.getBranchOffice().getId() : null);
        cdto.setDestinationBranchID(consignment.getDestinationBranch() != null ? consignment.getDestinationBranch().getId() : null);
        return cdto;
    }

    // Conversion method: Truck -> TruckDto (assuming minimal fields)
    private TruckDto convertTruckToDto(Truck truck) {
        TruckDto trdto = new TruckDto();
        trdto.setId(truck.getId());
        trdto.setLicensePlate(truck.getLicensePlate());
        trdto.setCurrentBranchID(truck.getCurrentBranch() != null ? truck.getCurrentBranch().getId() : null);
        trdto.setStatus(truck.getStatus());

        return trdto;
    }
}
