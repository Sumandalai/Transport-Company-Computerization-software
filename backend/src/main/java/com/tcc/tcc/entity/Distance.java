package com.tcc.tcc.entity;

import jakarta.persistence.*;

@Entity
public class Distance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "source_id")
    private BranchOffice source;

    @ManyToOne
    @JoinColumn(name = "destination_id")
    private BranchOffice destination;

    private double weight;
    // getters and setters
}
