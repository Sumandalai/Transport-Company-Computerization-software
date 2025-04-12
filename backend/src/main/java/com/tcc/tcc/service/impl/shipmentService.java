package com.tcc.tcc.service.impl;

import com.tcc.tcc.dto.Response;
import com.tcc.tcc.dto.ShipmentRequest;
import com.tcc.tcc.dto.ShipmentResponse;
import com.tcc.tcc.entity.*;
import com.tcc.tcc.repo.*;
import com.tcc.tcc.service.interfac.IshipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class shipmentService implements IshipmentService {

    @Autowired
    private ConsignmentRepository consignmentRepository;
    @Autowired
    private BranchOfficeRepository branchOfficeRepository;
    @Autowired
    private billService billservice;
    @Autowired
    private clientRepository clientRepository;
    @Autowired
    private rateService rateService;
    @Autowired
    private BillRepository billRepository;
    @Autowired
    private TruckRepository truckRepository;
    @Autowired
    private TruckAssignmentRepository truckAssignmentRepository;

    @Override
    public ShipmentResponse createShipment(ShipmentRequest request) {
        // 1. Handle Client
        Client client = clientRepository.findByEmail(request.getSenderEmail())
                .orElseGet(() -> createClient(request));

        // 2. Create Consignments
        List<Consignment> consignments = createConsignments(request, client);

        // 3. Create and save Bill
        Bill bill = createBill(client, consignments);

        consignmentRepository.saveAll(consignments);

        // 5. Check and assign trucks for eligible destinations
        checkAndAssignTrucks(consignments);

        return createResponse(client, bill, consignments);
    }

    private BranchOffice getCurrentBranchOffice() {
        return (BranchOffice) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    private void checkAndAssignTrucks(List<Consignment> consignments) {

        BranchOffice currentBranch = getCurrentBranchOffice();

        // Group consignments by destination branch
        Map<BranchOffice, List<Consignment>> consignmentsByDestination = consignments.stream()
                .collect(Collectors.groupingBy(Consignment::getDestinationBranch));

        consignmentsByDestination.forEach((destination, destConsignments) -> {
            // Get common source branch (assuming all consignments for a destination have same source)
//            BranchOffice source = destConsignments.get(0).getBranchOffice();

            BranchOffice source = currentBranch;
            // Calculate accumulated volume
            Double totalVolume = consignmentRepository.sumVolumeBySourceAndDestination(
                    source.getId(),
                    destination.getId(),
                    ConsignmentStatus.RECEIVED
            );
            System.out.println("Total Volume: " + totalVolume);

            boolean alreadyAssigned = truckAssignmentRepository.existsBySourceBranchAndDestinationBranchAndStatusIn(
                    source,
                    destination,
                    List.of(TruckAssignmentStatus.SCHEDULED, TruckAssignmentStatus.IN_TRANSIT)
            );
            System.out.println("Already Assigned: " + alreadyAssigned);

            if (!alreadyAssigned && totalVolume >= 500) {
                assignTruck(source, destination);
            }

        });
    }

    private void assignTruck(BranchOffice source, BranchOffice destination) {
        // Find available truck at source branch
        Optional<Truck> availableTruck = truckRepository
                .findByCurrentBranchAndStatus(source, TruckStatus.AVAILABLE)
                .stream()
                .findFirst();
        System.out.println("Available Truck: " + availableTruck.isPresent());
        if (availableTruck.isPresent()) {
            Truck truck = availableTruck.get();
            List<Consignment> consignmentsToAssign = consignmentRepository
                    .findByBranchOfficeAndDestinationBranchAndStatus(
                            source,
                            destination,
                            ConsignmentStatus.RECEIVED
                    );

            // Create truck assignment
            TruckAssignment assignment = new TruckAssignment();
            assignment.setTruck(truck);
            assignment.setSourceBranch(source);
            assignment.setDestinationBranch(destination);
            assignment.setDepartureTime(LocalDateTime.now());
            assignment.setStatus(TruckAssignmentStatus.SCHEDULED);

//            // Update consignments and truck status
            consignmentsToAssign.forEach(c -> {
                c.setStatus(ConsignmentStatus.ASSIGNED);
                c.setTruckAssignment(assignment);
            });
//
            assignment.setConsignments(consignmentsToAssign);
            truckAssignmentRepository.save(assignment);

            // Update truck status
            truck.setStatus(TruckStatus.IN_TRANSIT);
            truckRepository.save(truck);
//
//            truck.setStatus(TruckStatus.IN_TRANSIT);
//            truckRepository.save(truck);
        }
    }

    private Client createClient(ShipmentRequest request) {
        Client client = new Client();
        client.setEmail(request.getSenderEmail());
        client.setName(request.getSenderName());
        client.setAddress(request.getSenderAddress());
        return clientRepository.save(client);
    }

    private List<Consignment> createConsignments(ShipmentRequest request, Client client) {
        BranchOffice sourceBranch = getCurrentBranchOffice();


        List<ShipmentRequest.ConsignmentDetail>details=request.getConsignmentDetails();

        return details.stream().map(detail -> {
            Consignment consignment = new Consignment();

            consignment.setVolume(detail.volume());
            consignment.setClient(client);
            // Set source branch (logged-in branch)
            consignment.setBranchOffice(sourceBranch);


            consignment.setSenderName(request.getSenderName());
            consignment.setSenderAddress(request.getSenderAddress());

            consignment.setReceiverName(request.getReceiverName());
            consignment.setReceiverAddress(request.getReceiverAddress());

            BranchOffice destination = branchOfficeRepository.findById(detail.destinationBranchId())
                    .orElseThrow(() -> new RuntimeException(
                            "Destination branch not found: " + detail.destinationBranchId()));

            consignment.setDestinationBranch(destination);
            return consignment;
        }).collect(Collectors.toList());
    }

    private Bill createBill(Client client, List<Consignment> consignments) {
        Bill bill = new Bill();
        bill.setClient(client);
        bill.setGeneratedDate(LocalDateTime.now());

//        double totalCharge = consignments.stream()
//                .mapToDouble(consignment -> rateService.calculateCharge(
//                        consignment.getVolume(),
//                        consignment.getDestinationBranch()
//                ))
//                .sum();
        double totalCharge =10.0;

        bill.setTransportCharge(totalCharge);
        return billRepository.save(bill);
    }

    private ShipmentResponse createResponse(Client client, Bill bill, List<Consignment> consignments) {
        ShipmentResponse response = new ShipmentResponse();
        response.setClientId(client.getId());
        response.setBillId(bill.getId());
        response.setTotalCharge(bill.getTransportCharge());
        response.setGeneratedDate(bill.getGeneratedDate());
        response.setConsignments(
                consignments.stream().map(c -> new ShipmentResponse.ConsignmentResponse(
                        c.getId(),
                        c.getVolume(),
                        c.getDestinationBranch().getCity()
                )).collect(Collectors.toList())
        );
        return response;
    }
//
    public Response getConsignmentById(Long id) {
        return null;
    }
//
    public Response updateStatus(Long id, ConsignmentStatus newStatus) {
        return null;
    }
//
    public Response getConsignmentsByFilters(ConsignmentStatus status, Long branchId, Long destinationId) {
        return null;
    }
//
    public Double getAccumulatedVolume(Long destinationId) {
        return null;
    }
//
    public Double getAverageWaitingTime(Long destinationId) {
        return null;
    }
}
