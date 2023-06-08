package com.example.beconn.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {



    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.accessTokenExpiration}")
    private int accessTokenExpiration;

    @Value("${jwt.refreshTokenExpiration}")
    private int refreshTokenExpiration;


    public String generateAccessToken(String username) throws IllegalArgumentException, JWTCreationException {

        String token = JWT.create()
                .withClaim("username", username)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + accessTokenExpiration))
                .sign(Algorithm.HMAC256(secret));

        return token;
    }

    public String generateRefreshToken(String username) throws IllegalArgumentException, JWTCreationException {

        String refreshToken = JWT.create()
                .withClaim("username",username)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + refreshTokenExpiration))
                .sign(Algorithm.HMAC256(secret));

        return refreshToken;
    }


    public String validateTokenRetrieveSubject(String token) throws JWTVerificationException {

        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secret)).build();

        DecodedJWT jwt = verifier.verify(token);

        String username = jwt.getClaim("username").asString();

        return username;
    }

}