package com.fleurshop.fleur.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.RegexRequestMatcher;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

/**
 * Config for security
 */
@Configuration
public class SecurityConfig {
   @Bean
   protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
       // endpoints needed to be protected
       String[] pathArray = new String[]{"/api/orders/**","/api/order-items/**"};
       
       //protect endpoint /api/orders or /api/order-items
       this.protectRequestsToEndPoint(http, pathArray);
 
       // + CORS filters
       http.cors(Customizer.withDefaults());
 
       // + content negotiation strategy
       http.setSharedObject(ContentNegotiationStrategy.class, new HeaderContentNegotiationStrategy());
 
       // + non-empty response body for 401 (more friendly)
       Okta.configureResourceServer401ResponseBody(http);
 
       // we are not using Cookies for session tracking >> disable CSRF
       http.csrf(AbstractHttpConfigurer::disable);
 
       return http.build();
   }

   private void protectRequestsToEndPoint(HttpSecurity http, String[] pathArray) throws Exception {
    http.authorizeHttpRequests(requests ->
                       requests.requestMatchers(pathArray)
                               .authenticated()
                               .anyRequest().permitAll())
               .oauth2ResourceServer(oauth2ResourceServer -> oauth2ResourceServer.jwt(Customizer.withDefaults()));
   }
}
