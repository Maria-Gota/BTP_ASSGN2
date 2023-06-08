package com.example.beconn.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfiguration {

    @Autowired
    private JwtFilter filter;

    @Autowired
    private CustomAuthenticationEntryPoint authenticationEntryPoint;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.csrf().disable();

        http.cors()
                .and()
                .authorizeHttpRequests()
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/users/**").hasAuthority("TEACHER")
                .requestMatchers("/api/students/**").hasAuthority("TEACHER")

                .requestMatchers("/api/multipleChoiceExercise/post").hasAuthority("TEACHER")
                .requestMatchers("/api/multipleChoiceExercise/getByCreatedBy/**").hasAnyAuthority("TEACHER","STUDENT")
                .requestMatchers("/api/multipleChoiceExercise/getByCreatedByAndPurpose/**").hasAnyAuthority("TEACHER","STUDENT")
                .requestMatchers("/api/multipleChoiceExercise/deleteById/**").hasAuthority("TEACHER")
                .requestMatchers("/api/multipleChoiceExercise/getPracticeByCreatedByAndStudentIdGroupBySolved/**").authenticated()

                .requestMatchers("/api/signTableExercise/postLinear").hasAuthority("TEACHER")
                .requestMatchers("/api/signTableExercise/postQuadratic").hasAuthority("TEACHER")
                .requestMatchers("/api/signTableExercise/deleteById/**").hasAuthority("TEACHER")
                .requestMatchers("/api/signTableExercise/getById/**").hasAuthority("TEACHER")
                .requestMatchers("/api/signTableExercise/getByTypeLinearAndCreatedBy/**").authenticated()
                .requestMatchers("/api/signTableExercise/getByTypeQuadraticAndCreatedBy/**").authenticated()
                .requestMatchers("/api/signTableExercise/getByTypeLinearAndCreatedByAndPurpose/**").authenticated()
                .requestMatchers("/api/signTableExercise/getByTypeQuadraticAndCreatedByAndPurpose/**").authenticated()
                .requestMatchers("/api/signTableExercise/getLinearSignTablePracticeByCreatedByAndStudentIdGroupBySolved/**").authenticated()
                .requestMatchers("/api/signTableExercise/getQuadraticSignTablePracticeByCreatedByAndStudentIdGroupBySolved/**").authenticated()

                .requestMatchers("/api/probabilitiesExercise/getById/**").hasAuthority("TEACHER")
                .requestMatchers("/api/probabilitiesExercise/post").hasAuthority("TEACHER")
                .requestMatchers("/api/probabilitiesExercise/deleteById/**").hasAuthority("TEACHER")
                .requestMatchers("/api/probabilitiesExercise/deleteByCreatedBy/**").hasAuthority("TEACHER")
                .requestMatchers("/api/probabilitiesExercise/getByCreatedBy/**").authenticated()
                .requestMatchers("/api/probabilitiesExercise/getByCreatedByAndPurpose/**").authenticated()
                .requestMatchers("/api/probabilitiesExercise/getPracticeByCreatedByAndStudentIdGroupBySolved/**").authenticated()

                .requestMatchers("/api/statisticsExercise/getById/**").hasAuthority("TEACHER")
                .requestMatchers("/api/statisticsExercise/post").hasAuthority("TEACHER")
                .requestMatchers("/api/statisticsExercise/deleteById/**").hasAuthority("TEACHER")
                .requestMatchers("/api/statisticsExercise/deleteByCreatedBy/**").hasAuthority("TEACHER")
                .requestMatchers("/api/statisticsExercise/getByCreatedBy/**").authenticated()
                .requestMatchers("/api/statisticsExercise/getByCreatedByAndPurpose/**").authenticated()
                .requestMatchers("/api/statisticsExercise/getByCreatedByAndExerciseType/**").authenticated()
                .requestMatchers("/api/statisticsExercise/getPracticeByCreatedByAndStudentIdGroupBySolved/**").authenticated()

                .requestMatchers("/api/financialExercise/getById/**").hasAuthority("TEACHER")
                .requestMatchers("/api/financialExercise/post").hasAuthority("TEACHER")
                .requestMatchers("/api/financialExercise/deleteById/**").hasAuthority("TEACHER")
                .requestMatchers("/api/financialExercise/deleteByCreatedBy/**").hasAuthority("TEACHER")
                .requestMatchers("/api/financialExercise/getByCreatedBy/**").authenticated()
                .requestMatchers("/api/financialExercise/getByCreatedByAndPurpose/**").authenticated()
                .requestMatchers("/api/financialExercise/getByCreatedByAndExerciseType/**").authenticated()
                .requestMatchers("/api/financialExercise/getPracticeByCreatedByAndStudentIdGroupBySolved/**").authenticated()

                .requestMatchers("/api/quiz/post").hasAuthority("TEACHER")
                .requestMatchers("/api/quiz/updateVisibility/**").hasAuthority("TEACHER")
                .requestMatchers("/api/quiz/deleteById/**").hasAuthority("TEACHER")
                .requestMatchers("/api/quiz/deleteByCreatedBy/**").hasAuthority("TEACHER")
                .requestMatchers("/api/quiz/getByCreatedBy/**").authenticated()
                .requestMatchers("/api/quiz/getById/**").authenticated()
                .requestMatchers("/api/quiz/getByCreatedByAndQuizType/**").authenticated()
                .requestMatchers("/api/quiz/getByCreatedByAndQuizTypeAndVisibility/**").authenticated()
                .requestMatchers("/api/quiz/getAllExercisesByCreatedBy/**").authenticated()

                .requestMatchers("/api/studentQuiz/deleteById/**").hasAuthority("TEACHER")
                .requestMatchers("/api/studentQuiz/getByQuizIdAndSolved/**").hasAuthority("TEACHER")
                .requestMatchers("/api/studentQuiz/getByQuizIdAndNotSolved/**").hasAuthority("TEACHER")
                .requestMatchers("/api/studentQuiz/getByStudentIdAndSolved/**").hasAuthority("TEACHER")
                .requestMatchers("/api/studentQuiz/update").authenticated()
                .requestMatchers("/api/studentQuiz/decreaseTriesLeft/**").authenticated()
                .requestMatchers("/api/studentQuiz/updateTriesLeft/**").authenticated()
                .requestMatchers("/api/studentQuiz/getById/**").authenticated()
                .requestMatchers("/api/studentQuiz/getByQuizId/**").authenticated()
                .requestMatchers("/api/studentQuiz/getByStudentId/**").authenticated()
                .requestMatchers("/api/studentQuiz/getByStudentIdAndQuizId/**").authenticated()

                .requestMatchers("/api/studentQuizPerformance/getByStudentId/**").hasAuthority("TEACHER")

                .requestMatchers("/api/studentPracticeExercise/getById/**").authenticated()
                .requestMatchers("/api/studentPracticeExercise/getByStudentId/**").authenticated()
                .requestMatchers("/api/studentPracticeExercise/getByStudentIdAndExerciseId/**").authenticated()
                .requestMatchers("/api/studentPracticeExercise/post").authenticated()
                .requestMatchers("/api/studentPracticeExercise/update").authenticated()
                .requestMatchers("/api/studentPracticeExercise/getByStudentIdAndExerciseIdOrCreate/**").authenticated()

                .requestMatchers("/api/studentStats/getById/**").authenticated()
                .requestMatchers("/api/studentStats/getByStudentId/**").authenticated()
                .requestMatchers("/api/studentStats/getByTeacherId/**").authenticated()
                .requestMatchers("/api/studentStats/update").authenticated()
                .requestMatchers("/api/studentStats/increaseExerciseSolutionGrant/**").authenticated()
                .requestMatchers("/api/studentStats/decreaseExerciseSolutionGrant/**").authenticated()

                .requestMatchers("/api/studentStats/increaseQuizTryGrant/**").authenticated()
                .requestMatchers("/api/studentStats/decreaseQuizTryGrant/**").authenticated()

                .requestMatchers("/api/formula/getAll").authenticated()
                .requestMatchers("/api/formula/getById/**").authenticated()
                .requestMatchers("/api/formula/getByName/**").authenticated()
                .requestMatchers("/api/formula/getByType/**").authenticated()
                .requestMatchers("/api/formula/post").hasAuthority("TEACHER")
                .requestMatchers("/api/formula/deleteById/**").hasAuthority("TEACHER")
                .requestMatchers("/api/formula/deleteByName/**").hasAuthority("TEACHER")
                .requestMatchers("/api/formula/deleteByType/**").hasAuthority("TEACHER")

                .requestMatchers("/api/helper/getById/**").authenticated()
                .requestMatchers("/api/helper/getByCreatedByAndType/**").authenticated()
                .requestMatchers("/api/helper/post").hasAuthority("TEACHER")
                .requestMatchers("/api/helper/deleteById/**").hasAuthority("TEACHER")

                .requestMatchers("/api/notification/getByRecipientId/**").authenticated()
                .requestMatchers("/api/notification/update").authenticated()

                .and()

                .userDetailsService(userDetailsService)
                .exceptionHandling()
                .authenticationEntryPoint(authenticationEntryPoint)
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

}
