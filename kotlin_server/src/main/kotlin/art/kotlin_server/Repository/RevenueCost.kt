package art.kotlin_server.repository

import art.kotlin_server.model.RevenueCost
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface RevenueCostRepository : JpaRepository<RevenueCost, Long>