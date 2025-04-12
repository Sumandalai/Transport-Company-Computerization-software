package com.tcc.tcc.repo;


import com.tcc.tcc.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface clientRepository extends JpaRepository<Client, Long> {
    Optional<Client> findByEmail(String email);
}
