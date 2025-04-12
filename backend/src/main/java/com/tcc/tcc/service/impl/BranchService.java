package com.tcc.tcc.service.impl;

import com.tcc.tcc.dto.BranchDTO;
import com.tcc.tcc.dto.BranchDetailsDTO;
import com.tcc.tcc.dto.ConsignmentDto;
import com.tcc.tcc.dto.TruckAssignmentDto;
import com.tcc.tcc.entity.*;
import com.tcc.tcc.exception.OurException;
import com.tcc.tcc.repo.BranchOfficeRepository;
import com.tcc.tcc.repo.ConsignmentRepository;
import com.tcc.tcc.repo.TruckAssignmentRepository;
import com.tcc.tcc.service.interfac.IBranchService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

// BranchServiceImpl.java
@Service
@Transactional
public class BranchService implements IBranchService {
    @Autowired
    private BranchOfficeRepository branchOfficeRepository;
    @Autowired
    private ConsignmentRepository consignmentRepository;
    @Autowired
    private TruckAssignmentRepository truckAssignmentRepository;


    @Override
    public List<BranchDTO> getAllBranches() {
        return branchOfficeRepository.findAll().stream()
                .map(this::convertToBranchDTO)
                .collect(Collectors.toList());
    }

    public BranchDetailsDTO getBranchDetails(Long branchId) {
        BranchOffice branch = branchOfficeRepository.findById(branchId)
                .orElseThrow(() -> new OurException("Branch not found"));

        BranchOffice sourceBranch =getCurrentBranchOffice();
        Double volume = consignmentRepository.sumVolumeByBranchesAndStatuses(
                sourceBranch.getId(),
                branch.getId(),
                List.of(ConsignmentStatus.RECEIVED, ConsignmentStatus.ASSIGNED)
        );

        double vol = (volume != null) ? volume : 0.0;

        List<ConsignmentDto> consignments = getConsignmentDtos(branch);
        TruckAssignmentDto assignmentDto = getTruckAssignmentDto(branch);

        BranchDetailsDTO branchDetailsDTO = new BranchDetailsDTO();
        branchDetailsDTO.setBranch(convertToBranchDTO(branch, vol));
        branchDetailsDTO.setConsignments(consignments);
        branchDetailsDTO.setActiveAssignment(assignmentDto);

        return branchDetailsDTO;
    }

    private BranchOffice getCurrentBranchOffice() {
        return (BranchOffice) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    private BranchDTO convertToBranchDTO(BranchOffice branch) {
        BranchOffice sourceBranch =getCurrentBranchOffice();
        Double volume = consignmentRepository.sumVolumeByBranchesAndStatuses(
                sourceBranch.getId(),
                branch.getId(),
                List.of(ConsignmentStatus.RECEIVED, ConsignmentStatus.ASSIGNED)
        );
        double vol = (volume != null) ? volume : 0.0;

        return convertToBranchDTO(branch, vol);
    }


    private BranchDTO convertToBranchDTO(BranchOffice branch, double volume) {
        BranchDTO dto = new BranchDTO();
        dto.setId(branch.getId());
        dto.setCity(branch.getCity());
        dto.setAccumulatedVolume(volume);
        dto.setDispatchReady(volume >= 500);
        return dto;
    }

    private List<ConsignmentDto> getConsignmentDtos(BranchOffice destinationBranch) {
        BranchOffice sourceBranch = getCurrentBranchOffice();
        return consignmentRepository.findBySourceAndDestinationAndStatuses(
                        sourceBranch.getId(),
                        destinationBranch.getId(),
                        List.of(ConsignmentStatus.RECEIVED, ConsignmentStatus.ASSIGNED)
                )
                .stream()
                .map(this::convertToConsignmentDto)
                .collect(Collectors.toList());
    }


    private ConsignmentDto convertToConsignmentDto(Consignment consignment) {
        ConsignmentDto dto = new ConsignmentDto();
        dto.setId(consignment.getId());
        dto.setVolume(consignment.getVolume());
        dto.setSenderName(consignment.getSenderName());
        dto.setReceiverName(consignment.getReceiverName());
        dto.setReceivedDate(consignment.getReceivedDate());
        // Add destination branch info
        dto.setDestinationBranchID(consignment.getDestinationBranch().getId());

        return dto;
    }

    private TruckAssignmentDto getTruckAssignmentDto(BranchOffice branch) {
        return truckAssignmentRepository
                .findBySourceBranchAndStatusIn(
                        branch,
                        List.of(TruckAssignmentStatus.SCHEDULED, TruckAssignmentStatus.IN_TRANSIT)
                )
                .map(this::convertToAssignmentDTO)
                .orElse(null);
    }

    private TruckAssignmentDto convertToAssignmentDTO(TruckAssignment assignment) {
        TruckAssignmentDto dto = new TruckAssignmentDto();
        dto.setId(assignment.getId());
        dto.setLicensePlate(assignment.getTruck().getLicensePlate());
        dto.setDepartureTime(assignment.getDepartureTime());
        dto.setConsignments(getAssignmentConsignmentDtos(assignment));
        return dto;
    }

    private List<ConsignmentDto> getAssignmentConsignmentDtos(TruckAssignment assignment) {
        return assignment.getConsignments().stream()
                .map(this::convertToConsignmentDto)
                .collect(Collectors.toList());
    }
}
