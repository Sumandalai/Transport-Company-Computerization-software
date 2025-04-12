package com.tcc.tcc.entity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "TruckAssignment")
public class TruckAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "truck_id")
    private Truck truck;

    @ManyToOne
    @JoinColumn(name = "source_branch_id")
    private BranchOffice sourceBranch;

    @ManyToOne
    @JoinColumn(name = "destination_branch_id")
    private BranchOffice destinationBranch;

    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;

    @OneToMany(mappedBy = "truckAssignment")
    private List<Consignment> consignments;

    @Enumerated(EnumType.STRING)
    private TruckAssignmentStatus status;
}
