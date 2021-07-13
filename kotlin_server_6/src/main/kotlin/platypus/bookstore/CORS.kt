import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.web.cors.reactive.CorsUtils;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import reactor.core.publisher.Mono;


//see here https://stackoverflow.com/questions/46978794/enable-cors-in-spring-5-webflux/47494858#47494858


@Configuration
public class CorsConfiguration {

  val ALLOWED_HEADERS = "x-requested-with, authorization, Content-Type, Authorization, credential, X-XSRF-TOKEN";
  val ALLOWED_METHODS = "GET, PUT, POST, DELETE, OPTIONS";
  val ALLOWED_ORIGIN = "http://localhost:3000";
  val MAX_AGE = "3600";

  @Bean
  fun corsFilter(): WebFilter {
      return WebFilter { ctx, chain ->
          val request = ctx.request
          if (CorsUtils.isCorsRequest(request)) {
              val response = ctx.response
              val headers = response.headers
              headers.add("Access-Control-Allow-Origin", ALLOWED_ORIGIN)
              headers.add("Access-Control-Allow-Methods", ALLOWED_METHODS)
              headers.add("Access-Control-Max-Age", MAX_AGE)
              headers.add("Access-Control-Allow-Headers", ALLOWED_HEADERS)
              if (request.method === HttpMethod.OPTIONS) {
                  response.statusCode = HttpStatus.OK
                  return@WebFilter Mono.empty<Void>()
              }
          }
          chain.filter(ctx)
      }
  }

}