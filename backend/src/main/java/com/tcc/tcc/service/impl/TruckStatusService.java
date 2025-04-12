package com.tcc.tcc.service.impl;

import com.tcc.tcc.dto.TruckStatusDTO;
import com.tcc.tcc.entity.Consignment;
import com.tcc.tcc.entity.Truck;
import com.tcc.tcc.entity.TruckAssignment;
import com.tcc.tcc.entity.TruckAssignmentStatus;
import com.tcc.tcc.repo.BranchOfficeRepository;
import com.tcc.tcc.repo.ConsignmentRepository;
import com.tcc.tcc.repo.TruckAssignmentRepository;
import com.tcc.tcc.repo.TruckRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TruckStatusService {
    @Autowired
    private TruckRepository truckRepository;
    @Autowired
    private ConsignmentRepository consignmentRepository;
    @Autowired
    private TruckAssignmentRepository truckAssignmentRepository;
//    private BranchOfficeRepository branchOfficeRepository;

    public List<TruckStatusDTO> getAllTruckStatuses() {
        return truckRepository.findAll().stream()
                .map(this::mapToTruckStatusDTO)
                .collect(Collectors.toList());
    }

    private TruckStatusDTO mapToTruckStatusDTO(Truck truck) {
        // Get current assignment if exists
        Optional<TruckAssignment> activeAssignment = truckAssignmentRepository
                .findByTruckIdAndStatusIn(
                        truck.getId(),
                        List.of(TruckAssignmentStatus.SCHEDULED, TruckAssignmentStatus.IN_TRANSIT)
                );

        return activeAssignment.map(assignment ->
                createDTOWithAssignment(truck, assignment)
        ).orElseGet(() -> createAvailableTruckDTO(truck));
    }

    private TruckStatusDTO createDTOWithAssignment(Truck truck, TruckAssignment assignment) {
        TruckStatusDTO dto = new TruckStatusDTO();
        dto.setTruckId(truck.getId());
        dto.setLicensePlate(truck.getLicensePlate());
        dto.setCurrentBranch(truck.getCurrentBranch().getCity());
        dto.setDestinationCity(assignment.getDestinationBranch().getCity());
        dto.setAccumulatedVolume(
                assignment.getConsignments().stream()
                        .mapToDouble(Consignment::getVolume)
                        .sum()
        );
        dto.setDispatchStatus("IN_TRANSIT - Dispatch ID: " + assignment.getId());
        return dto;
    }


    private TruckStatusDTO createAvailableTruckDTO(Truck truck) {
        TruckStatusDTO dto = new TruckStatusDTO();
        dto.setTruckId(truck.getId());
        dto.setLicensePlate(truck.getLicensePlate());
        dto.setCurrentBranch(truck.getCurrentBranch().getCity());

        Optional<Object[]> destinationVolume = consignmentRepository
                .findDestinationsWithMinVolume(500.0)
                .stream()
                .findFirst();

        if (destinationVolume.isPresent()) {
            String city = (String) destinationVolume.get()[0];
            Double volume = (Double) destinationVolume.get()[1];

            dto.setDestinationCity(city);
            dto.setAccumulatedVolume(volume);
            dto.setDispatchStatus("SCHEDULED");
            return dto;
        }

        dto.setDestinationCity("N/A");
        dto.setAccumulatedVolume(0.0);
        dto.setDispatchStatus("AVAILABLE");
        return dto;
    }

}
