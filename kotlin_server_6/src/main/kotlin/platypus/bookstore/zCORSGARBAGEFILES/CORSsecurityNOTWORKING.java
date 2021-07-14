// package platypus.bookstore;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

// @Configuration
// @Profile("dev")
// public class DevConfig {

//     @Bean
//     public WebMvcConfigurer corsConfigurer() {
// 			return new WebMvcConfigurerAdapter() {
// 					@Override
// 					public void addCorsMappings(CorsRegistry registry) {
// 							System.out.println("inside add cors mappings");
// 							registry.addMapping("/**").allowedOrigins("http://localhost:3000");
// 					}
					
// 					@Override
// 					protected void configure(HttpSecurity http) throws Exception {
// 						System.out.println("inside configure");
// 						//  http.csrf().disable();
// 						http.cors();
// 					}
// 			};
//     }

// }



// @Component
// @Order(Ordered.HIGHEST_PRECEDENCE)
// public class CorsFilter implements Filter {
//     public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
//             throws IOException, ServletException {
//         HttpServletResponse response = (HttpServletResponse) res;
//         HttpServletRequest request = (HttpServletRequest) req;
//         response.setHeader("Access-Control-Allow-Origin", "*");
//         response.setHeader("Access-Control-Allow-Credentials", "true");
//         response.setHeader("Access-Control-Allow-Methods",
//                 "ACL, CANCELUPLOAD, CHECKIN, CHECKOUT, COPY, DELETE, GET, HEAD, LOCK, MKCALENDAR, MKCOL, MOVE, OPTIONS, POST, PROPFIND, PROPPATCH, PUT, REPORT, SEARCH, UNCHECKOUT, UNLOCK, UPDATE, VERSION-CONTROL");
//         response.setHeader("Access-Control-Max-Age", "3600");
//         response.setHeader("Access-Control-Allow-Headers",
//                 "Origin, X-Requested-With, Content-Type, Accept, Key, Authorization");

//         if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
//             response.setStatus(HttpServletResponse.SC_OK);
//         } else {
//             chain.doFilter(req, res);
//         }
//     }

//     public void init(FilterConfig filterConfig) {
//         // not needed
//     }

//     public void destroy() {
//         //not needed
//     }

// }


// @EnableWebSecurity
// public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

// 	@Configuration
// 	public class WebConfig extends WebMvcConfigurerAdapter {
	
// 			@Override
// 			public void addCorsMappings(CorsRegistry registry) {
// 					registry.addMapping("/**")
// 									.allowedMethods("HEAD", "GET", "PUT", "POST", "DELETE", "PATCH");
// 			}
// 	}

// }

// @Configuration
// public class SecurityConfig extends WebSecurityConfigurerAdapter {
//     @Override
//     protected void configure(HttpSecurity http) throws Exception {
// //        http.csrf().disable();
//         http.cors();
//     }

//     @Bean
//     public CorsConfigurationSource corsConfigurationSource() {
//         final CorsConfiguration configuration = new CorsConfiguration();
//         configuration.setAllowedOrigins(ImmutableList.of("*"));
//         configuration.setAllowedMethods(ImmutableList.of("HEAD",
//                 "GET", "POST", "PUT", "DELETE", "PATCH"));
//         configuration.setAllowCredentials(true);
//         configuration.setAllowedHeaders(ImmutableList.of("Authorization", "Cache-Control", "Content-Type"));
//         final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//         source.registerCorsConfiguration("/**", configuration);
//         return source;
//     }
// }