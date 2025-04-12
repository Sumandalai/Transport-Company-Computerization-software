package com.tcc.tcc.controller;

import com.tcc.tcc.dto.BranchDTO;
import com.tcc.tcc.dto.BranchDetailsDTO;
import com.tcc.tcc.dto.ConsignmentDto;
import com.tcc.tcc.dto.TruckAssignmentDto;
import com.tcc.tcc.entity.BranchOffice;
import com.tcc.tcc.entity.ConsignmentStatus;
import com.tcc.tcc.entity.TruckAssignment;
import com.tcc.tcc.entity.TruckAssignmentStatus;
import com.tcc.tcc.exception.OurException;
import com.tcc.tcc.repo.BranchOfficeRepository;
import com.tcc.tcc.repo.ConsignmentRepository;
import com.tcc.tcc.repo.TruckAssignmentRepository;
import com.tcc.tcc.repo.TruckRepository;
import com.tcc.tcc.service.impl.BranchService;
import com.tcc.tcc.service.interfac.IboService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/branches")
public class BranchController {

    @Autowired
    private BranchOfficeRepository branchOfficeRepository;
    @Autowired
    private ConsignmentRepository consignmentRepository;
    @Autowired
    private TruckAssignmentRepository truckAssignmentRepository;
    @Autowired
    private BranchService branchService;

    @GetMapping
    public List<BranchDTO> getAllBranches() {
        return branchService.getAllBranches();
    }

    @GetMapping("/{branchId}/details")
    public BranchDetailsDTO getBranchDetails(@PathVariable Long branchId) {
        return branchService.getBranchDetails(branchId);
    }
}
