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

import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;



// import org.springframework.web.cors.CorsConfiguration;

// @Configuration
// @EnableWebFlux
// class WebConfig:WebFluxConfigurer {

//     @Override
//     fun addCorsMappings(registry: CorsRegistry) {
//         registry.addMapping("/**");
//     }
// }


// @Bean
// fun corsFilter(): WebFilter {
//     return WebFilter { ctx, chain ->
//         val request = ctx.request
//         if (CorsUtils.isCorsRequest(request)) {
//             val response = ctx.response
//             val headers = response.headers
//             headers.add("Access-Control-Allow-Origin", ALLOWED_ORIGIN)
//             headers.add("Access-Control-Allow-Methods", ALLOWED_METHODS)
//             headers.add("Access-Control-Max-Age", MAX_AGE)
//             headers.add("Access-Control-Allow-Headers", ALLOWED_HEADERS)
//             if (request.method === HttpMethod.OPTIONS) {
//                 response.statusCode = HttpStatus.OK
//                 return@WebFilter Mono.empty<Void>()
//             }
//         }
//         chain.filter(ctx)
//     }
// }


// @Configuration
// public class CorsConfiguration {

    // @Bean
    // fun corsFilter():CorsWebFilter {
    //     return CorsWebFilter(
    //         exchange -> CorsConfiguration().applyPermitDefaultValues()
    //         );
    // }

//   @Bean
//     fun corsWebFilter(): CorsWebFilter {
//         val corsConfig = CorsConfiguration()
//         corsConfig.addAllowedOrigin("http://localhost:3000")
//         corsConfig.setAllowCredentials(true);
//         corsConfig.addAllowedHeader("*");
//         corsConfig.addAllowedMethod("*");
//         // corsConfig.addAllowedMethod("GET")
//         // corsConfig.addAllowedMethod("PUT")
//         // corsConfig.addAllowedMethod("POST")
//         // corsConfig.addAllowedMethod("OPTION")
//         // corsConfig.addAllowedMethod("DELETE")
//         // corsConfig.addAllowedHeader("x-requested-with")
//         // corsConfig.addAllowedHeader("authorization")
//         // corsConfig.addAllowedHeader("Content-Type")
//         // corsConfig.addAllowedHeader("credential")
//         // corsConfig.addAllowedHeader("X-XSRF-TOKEN")

//         val source = UrlBasedCorsConfigurationSource().apply {
//             registerCorsConfiguration("/**", corsConfig)
//         }
//         return CorsWebFilter(source)
//     }
// }   


// import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;

// import org.springframework.web.reactive.config.EnableWebFlux
// import org.springframework.web.reactive.config.WebFluxConfigurer
// import org.springframework.web.servlet.config.annotation.CorsRegistry;

// @Configuration
// @EnableWebFlux
// class CorsGlobalConfiguration: WebFluxConfigurer 
// {
//     @Override
//     fun addCorsMappings(registry: CorsRegistry)
//     {
//         registry.addMapping("/**")
//             .allowedOrigins("http://localhost:3000") // any host or put domain(s) here
//             .allowedMethods("GET, POST") // put the http verbs you want allow
//             .allowedHeaders("Access-Control-Allow-Origin,Access-Control-Allow-Credentials,Access-Control-Expose-Headers,Access-Control-Max-Age,Access-Control-Allow-Methods,Access-Control-Allow-Headers")
//     }
// }


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