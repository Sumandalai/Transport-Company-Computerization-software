package com.tcc.tcc.entity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "Consignment")
public class Consignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double volume;
    private LocalDateTime receivedDate;
    private LocalDateTime dispatchedDate;

    private String senderName;
    private String senderAddress;
    private String receiverName;
    private String receiverAddress;

    @Enumerated(EnumType.STRING)
    private ConsignmentStatus status=ConsignmentStatus.RECEIVED;

    @ManyToOne
    @JoinColumn(name = "branch_office_id")
    private BranchOffice branchOffice;

    @ManyToOne
    @JoinColumn(name = "destination_branch_id")
    private BranchOffice destinationBranch;

    @ManyToOne
    @JoinColumn(name = "truck_assignment_id")
    private TruckAssignment truckAssignment;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;
}

