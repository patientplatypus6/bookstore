package platypus.bookstore

import io.r2dbc.spi.ConnectionFactory
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.io.ClassPathResource
import org.springframework.data.r2dbc.connectionfactory.init.CompositeDatabasePopulator
import org.springframework.data.r2dbc.connectionfactory.init.ConnectionFactoryInitializer
import org.springframework.data.r2dbc.connectionfactory.init.ResourceDatabasePopulator
import org.springframework.data.r2dbc.repository.config.EnableR2dbcRepositories
import org.springframework.web.reactive.function.server.coRouter
// import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;


@Configuration
@EnableR2dbcRepositories
class AppConfiguration {

    //Do I really need this?
    // @Bean
    // public MultipartFilter multipartFilter(){
    //     val multipartFilter: MultipartFilter  = new MultipartFilter();
    //     multipartFilter.setMultipartResolverBeanName("multipartResolver");
    //     return multipartFilter;
    // }

    // @Override
    // fun addResourceHandlers(registry: ResourceHandlerRegistry) {
    //   registry.addResourceHandler("/upload/**").addResourceLocations("file:///" + System.getProperty("user.dir") + "/src/main/upload/");
    // }

    @Bean
    fun initializer(connectionFactory: ConnectionFactory): ConnectionFactoryInitializer {
        val initializer = ConnectionFactoryInitializer()
        initializer.setConnectionFactory(connectionFactory)
        val populator = CompositeDatabasePopulator()
        populator.addPopulators(ResourceDatabasePopulator(ClassPathResource("schema.sql")))
        // populator.addPopulators(ResourceDatabasePopulator(ClassPathResource("data.sql")))
        initializer.setDatabasePopulator(populator)
        return initializer
    }
}
