package com.tcc.tcc.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "Truck")
public class Truck {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String licensePlate;

    @ManyToOne
    @JoinColumn(name = "current_branch_id")
    private BranchOffice currentBranch;

    @Enumerated(EnumType.STRING)
    private TruckStatus status;

    @OneToMany(mappedBy = "truck")
    private List<TruckAssignment> assignments;
}

