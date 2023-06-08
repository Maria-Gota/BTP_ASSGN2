package com.example.beconn.entity.studentStats;

import jakarta.persistence.*;

import javax.print.attribute.standard.MediaSize;

@Entity
@Table(name = "student_stats",
        uniqueConstraints = {
                @UniqueConstraint(name = "uq_student_stats_student_id", columnNames = "student_id")
        }
)
public class StudentStats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "student_id")
    private Long studentId;

    @Column(name = "assessment_points")
    private Integer assessmentPoints;

    @Column(name = "effort_points")
    private Integer effortPoints;

    @Column(name = "exercise_solution_grant")
    private Integer exerciseSolutionGrant;

    @Column(name = "quiz_try_grant")
    private Integer quizTryGrant;

    public StudentStats() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Integer getAssessmentPoints() {
        return assessmentPoints;
    }

    public void setAssessmentPoints(Integer assessmentPoints) {
        this.assessmentPoints = assessmentPoints;
    }

    public Integer getEffortPoints() {
        return effortPoints;
    }

    public void setEffortPoints(Integer effortPoints) {
        this.effortPoints = effortPoints;
    }

    public Integer getExerciseSolutionGrant() {
        return exerciseSolutionGrant;
    }

    public void setExerciseSolutionGrant(Integer exerciseSolutionGrant) {
        this.exerciseSolutionGrant = exerciseSolutionGrant;
    }

    public Integer getQuizTryGrant() {
        return quizTryGrant;
    }

    public void setQuizTryGrant(Integer quizTryGrant) {
        this.quizTryGrant = quizTryGrant;
    }
}
