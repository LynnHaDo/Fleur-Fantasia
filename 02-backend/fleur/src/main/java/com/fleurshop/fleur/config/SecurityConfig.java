package com.fleurshop.fleur.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

import lombok.RequiredArgsConstructor;

/**
 * Config for security
 */
@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {
   @Bean
   protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
       // endpoints needed to be protected
       String[] pathArray = new String[]{"/orders/**","order-items/**"};
       
       //protect endpoint /api/orders or /api/order-items
       this.protectRequestsToEndPoint(http, pathArray);
 
       // + CORS filters
       http.cors(Customizer.withDefaults());
 
       // + content negotiation strategy
       http.setSharedObject(ContentNegotiationStrategy.class, new HeaderContentNegotiationStrategy());
 
       // + non-empty response body for 401 (more friendly)
       // Okta.configureResourceServer401ResponseBody(http);
 
       // we are not using Cookies for session tracking >> disable CSRF
       http.csrf(AbstractHttpConfigurer::disable);
 
       return http.build();
   }

   private void protectRequestsToEndPoint(HttpSecurity http, String[] pathArray) throws Exception {
       
    http.authorizeHttpRequests(requests -> 
        requests.requestMatchers(pathArray).authenticated()
        .anyRequest().permitAll()
    ).oauth2ResourceServer(oauth2ResourceServer -> oauth2ResourceServer.jwt(jwt -> jwt.jwtAuthenticationConverter(makePermissionsConverter())));
   }
   
   private JwtAuthenticationConverter makePermissionsConverter() {
       final var jwtAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
       jwtAuthoritiesConverter.setAuthoritiesClaimName("permissions");
       jwtAuthoritiesConverter.setAuthorityPrefix("");

       final var jwtAuthConverter = new JwtAuthenticationConverter();
       jwtAuthConverter.setJwtGrantedAuthoritiesConverter(jwtAuthoritiesConverter);

       return jwtAuthConverter;
   }
}
