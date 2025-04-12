package com.tcc.tcc.service.interfac;

import com.tcc.tcc.dto.BranchDTO;
import com.tcc.tcc.dto.BranchDetailsDTO;

import java.util.List;

public interface IBranchService {
    List<BranchDTO> getAllBranches();
    BranchDetailsDTO getBranchDetails(Long branchId);
}
