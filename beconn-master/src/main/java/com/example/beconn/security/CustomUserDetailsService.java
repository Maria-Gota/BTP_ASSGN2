package com.example.beconn.security;

import com.example.beconn.dao.user.UserDao;
import com.example.beconn.entity.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {


    @Autowired
    private UserDao userDao;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userDao.getByUsername(username);

        if(user == null){

            throw new UsernameNotFoundException("COULDN'T FIND USER WITH USERNAME " + username);

        } else {
            GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole());
            return new org.springframework.security.core.userdetails.User(user.getUsername(),user.getPassword(), Collections.singletonList(authority));
        }


    }
}
