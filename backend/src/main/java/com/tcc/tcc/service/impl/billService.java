package com.tcc.tcc.service.impl;

import com.tcc.tcc.entity.Bill;
import com.tcc.tcc.entity.Consignment;
import com.tcc.tcc.repo.BillRepository;
import com.tcc.tcc.repo.BranchOfficeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class billService {

//    private BillRepository billRepository;
//    private BranchOfficeRepository branchOfficeRepository;
//
//    private void validateConsignment(Consignment consignment) {
//        if(consignment == null) {
//            throw new IllegalArgumentException("Consignment cannot be null");
//        }
//        if(consignment.getDestinationBranch() == null) {
//            throw new IllegalStateException("Consignment must have a destination branch");
//        }
//    }
//
//    public Bill generateBill(Consignment consignment) {
//        validateConsignment(consignment);
//
//
////        double rate = getRateForDestination(consignment.getDestinationBranch());
////        double transportCharge = calculateTransportCharge(consignment.getVolume(), rate);
//
//        double transportCharge =10;
//
//        Bill bill = new Bill();
//        bill.setTransportCharge(transportCharge);
//        bill.setGeneratedDate(LocalDateTime.now());
////        bill.setConsignment(consignment);
//
//        return billRepository.save(bill);
//    }
}
