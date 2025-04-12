package com.tcc.tcc.utils;

import com.tcc.tcc.dto.BranchOfficeDto;
import com.tcc.tcc.entity.BranchOffice;

public class Utils {

    public static BranchOfficeDto mapBranchOfficeentitytoBranchOfficeDto(BranchOffice branchOffice) {
        BranchOfficeDto branchOfficeDto = new BranchOfficeDto();
        branchOfficeDto.setId(branchOffice.getId());
        branchOfficeDto.setEmail(branchOffice.getEmail());
        branchOfficeDto.setCity(branchOffice.getCity());
        branchOfficeDto.setRole(branchOffice.getRole());
        branchOfficeDto.setPhoneNumber(branchOffice.getPhoneNumber());
        return branchOfficeDto;
    }

//    public static
//
//    public static BranchOfficeDto mapBranchOfficeEntitytoBranchOfficeDtoplusall(BranchOffice branchOffice) {
//        BranchOfficeDto branchOfficeDto = new BranchOfficeDto();
//        branchOfficeDto.setId(branchOffice.getId());
//        branchOfficeDto.setEmail(branchOffice.getEmail());
//        branchOfficeDto.setCity(branchOffice.getCity());
//        branchOfficeDto.setRole(branchOffice.getRole());
//        branchOfficeDto.setPhoneNumber(branchOffice.getPhoneNumber());
//
//        if(!branchOffice.getTrucks().isEmpty()){
////            branchOfficeDto.setTrucks(branchOffice.getTrucks().stream().map(Utils::));
//        }
//    }

}
