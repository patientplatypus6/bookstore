package art.kotlin_server.repository

import art.kotlin_server.model.UserOrder
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserOrderRepository : JpaRepository<UserOrder, Long>