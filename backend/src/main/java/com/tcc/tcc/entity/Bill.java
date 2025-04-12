package com.tcc.tcc.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "Bill")

public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double transportCharge;
    private LocalDateTime generatedDate;

    @OneToOne(mappedBy = "bill", cascade = CascadeType.ALL)
    private Client client;
}
