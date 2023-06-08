CREATE SCHEMA draft;
 
CREATE TABLE IF NOT EXISTS user (

	id BIGINT PRIMARY KEY AUTO_INCREMENT,
	role VARCHAR(20) NOT NULL,
	username VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(100) NOT NULL,	
	email_address VARCHAR(255) NOT NULL

)AUTO_INCREMENT=1000;

ALTER TABLE user ADD CONSTRAINT uq_username_password UNIQUE (username,password);
ALTER TABLE user ADD CONSTRAINT uq_email_address UNIQUE (email_address);


CREATE TABLE IF NOT EXISTS teacher (

	id BIGINT PRIMARY KEY AUTO_INCREMENT,
	user_id BIGINT NOT NULL

)AUTO_INCREMENT=5000;

ALTER TABLE teacher ADD CONSTRAINT UQ_user_id UNIQUE (user_id);
ALTER TABLE teacher ADD CONSTRAINT fk_teacher_user_id FOREIGN KEY (user_id) REFERENCES user(id);


CREATE TABLE IF NOT EXISTS student (

	id BIGINT PRIMARY KEY AUTO_INCREMENT,
	user_id BIGINT NOT NULL,
    teacher_id BIGINT NOT NULL

)AUTO_INCREMENT=3000; 

ALTER TABLE student ADD CONSTRAINT UQ_user_id UNIQUE (user_id);
ALTER TABLE student ADD CONSTRAINT fk_student_user_id FOREIGN KEY (user_id) REFERENCES user(id);
ALTER TABLE student ADD CONSTRAINT fk_student_teacher_id FOREIGN KEY (teacher_id) REFERENCES teacher(id);


CREATE TABLE IF NOT EXISTS multiple_choice_exercise (
	
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    question VARCHAR(500) NOT NULL,
    choices VARCHAR(500) NOT NULL,
    correct_choice VARCHAR(100) NOT NULL,
    purpose VARCHAR(100) NOT NULL,
    created_by BIGINT NOT NULL
)AUTO_INCREMENT=10000;

ALTER TABLE multiple_choice_exercise ADD CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES teacher(id);


CREATE TABLE IF NOT EXISTS sign_table_exercise (
	
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    function_type VARCHAR(20) NOT NULL,
    coefficients VARCHAR(500) NOT NULL,
    domain_bounds VARCHAR(100) NOT NULL,
    correct_signs VARCHAR(50) NOT NULL,
    solutions VARCHAR(100),
    purpose VARCHAR(100) NOT NULL,
    created_by BIGINT NOT NULL
    
)AUTO_INCREMENT=13000;

ALTER TABLE sign_table_exercise ADD CONSTRAINT fk_sign_table_created_by FOREIGN KEY (created_by) REFERENCES teacher(id);


CREATE TABLE IF NOT EXISTS probabilities_exercise(

	id BIGINT PRIMARY KEY AUTO_INCREMENT,
	question VARCHAR(500) NOT NULL,
	favorable_outcomes INT NOT NULL,
	possible_outcomes INT NOT NULL,
    purpose VARCHAR(100) NOT NULL,
	created_by BIGINT NOT NULL
)AUTO_INCREMENT=23000;

ALTER TABLE probabilities_exercise ADD CONSTRAINT fk_probabilities_created_by FOREIGN KEY (created_by) REFERENCES teacher(id);


CREATE TABLE IF NOT EXISTS statistics_exercise(

	id BIGINT PRIMARY KEY AUTO_INCREMENT,
	question VARCHAR(170) NOT NULL,
	data VARCHAR(200) NOT NULL,
	exercise_type VARCHAR(100) NOT NULL,
    purpose VARCHAR(100) NOT NULL,
	created_by BIGINT NOT NULL
)AUTO_INCREMENT=25000;

ALTER TABLE statistics_exercise ADD CONSTRAINT fk_statistics_created_by FOREIGN KEY (created_by) REFERENCES teacher(id);


CREATE TABLE IF NOT EXISTS financial_exercise(

	id BIGINT PRIMARY KEY AUTO_INCREMENT,
	question VARCHAR(170) NOT NULL,
	capital INT NOT NULL,
	interest_rate INT NOT NULL,
	time_period INT NOT NULL,
	interest INT NOT NULL,
	interest_type VARCHAR(20) NOT NULL,
	exercise_type VARCHAR(100) NOT NULL,
    purpose VARCHAR(100) NOT NULL,
	created_by BIGINT NOT NULL

)AUTO_INCREMENT=27000;

ALTER TABLE financial_exercise ADD CONSTRAINT fk_financial_created_by FOREIGN KEY (created_by) REFERENCES teacher(id);


CREATE TABLE IF NOT EXISTS quiz (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    created_by BIGINT NOT NULL,
    quiz_type VARCHAR(100) NOT NULL,
    quiz_name VARCHAR(60) NOT NULL,
    difficulty VARCHAR(50) NOT NULL,
    visibility BOOL NOT NULL
    
)AUTO_INCREMENT=30000;

ALTER TABLE quiz ADD CONSTRAINT fk_quiz_created_by FOREIGN KEY (created_by) REFERENCES teacher(id) ON DELETE CASCADE;
ALTER TABLE quiz ADD CONSTRAINT uq_quiz_name UNIQUE (quiz_name);


CREATE TABLE IF NOT EXISTS quiz_exercise (
	
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
	quiz_id BIGINT NOT NULL,
    exercise_id BIGINT NOT NULL
)AUTO_INCREMENT = 50000;

ALTER TABLE quiz_exercises ADD CONSTRAINT fk_quiz_exercises_quiz_id FOREIGN KEY (quiz_id) REFERENCES quiz(id) ON DELETE CASCADE;


CREATE TABLE IF NOT EXISTS student_practice_exercise (

	student_id BIGINT NOT NULL,
    exercise_id BIGINT NOT NULL,
    exercise_type VARCHAR(100) NOT NULL,
    solved BOOL NOT NULL,
    correct BOOL NOT NULL,
    last_access TIMESTAMP,
    PRIMARY KEY (exercise_id , student_id)
);

ALTER TABLE student_practice ADD CONSTRAINT fk_student_practice_student_id FOREIGN KEY (student_id) REFERENCES student(id) ON DELETE CASCADE;


CREATE TABLE IF NOT EXISTS student_quiz (
	
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
	quiz_id BIGINT NOT NULL,
    student_id BIGINT NOT NULL,
    score INT NOT NULL,
    tries_left INT NOT NULL,
    times_accessed INT NOT NULL,
    last_accessed DATETIME,
    solved BOOL NOT NULL
)AUTO_INCREMENT = 33000;

ALTER TABLE student_quiz ADD CONSTRAINT uq_student_quiz_student_id_quiz_id UNIQUE(quiz_id,student_id);
ALTER TABLE student_quiz ADD CONSTRAINT fk_student_quiz_quiz_id FOREIGN KEY (quiz_id) REFERENCES quiz(id) ON DELETE CASCADE;
ALTER TABLE student_quiz ADD CONSTRAINT fk_student_quiz_student_id FOREIGN KEY (student_id) REFERENCES student(id) ON DELETE CASCADE;

 
CREATE TABLE IF NOT EXISTS student_quiz_exercise(
	
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    student_quiz_id BIGINT NOT NULL,
    student_id BIGINT NOT NULL,
    exercise_id BIGINT NOT NULL,
    correct BOOL NOT NULL
)AUTO_INCREMENT = 36000;

ALTER TABLE student_quiz_exercise ADD CONSTRAINT uq_student_quiz_id_exercise_id UNIQUE(student_quiz_id, exercise_id);
ALTER TABLE student_quiz_exercise ADD CONSTRAINT fk_student_quiz_id FOREIGN KEY (student_quiz_id) REFERENCES student_quiz(id) ON DELETE CASCADE;


CREATE TABLE IF NOT EXISTS student_practice_exercise (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    student_id BIGINT NOT NULL,
    exercise_id BIGINT NOT NULL,
    times_solved INT NOT NULL,
    times_solved_correctly INT NOT NULL,
    points INT NOT NULL,
    expiration_date DATE
) AUTO_INCREMENT = 40000;

ALTER TABLE student_practice ADD CONSTRAINT fk_student_practice_student_id FOREIGN KEY(student_id) REFERENCES student(id) ON DELETE CASCADE;
ALTER TABLE student_practice ADD CONSTRAINT uq_student_practice_student_id_exercise_id UNIQUE(student_id,exercise_id);


CREATE TABLE IF NOT EXISTS student_stats (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    student_id BIGINT NOT NULL,
    assessment_points INT NOT NULL,
    effort_points INT NOT NULL,
    exercise_solution_grant INT NOT NULL,
    quiz_try_grant INT NOT NULL
)AUTO_INCREMENT = 45000;

ALTER TABLE student_stats ADD CONSTRAINT fk_student_stats_student_id FOREIGN KEY(student_id) REFERENCES student(id) ON DELETE CASCADE;
ALTER TABLE student_stats ADD CONSTRAINT uq_student_stats_student_id UNIQUE(student_id);


DELIMITER $$
CREATE TRIGGER student_after_insert_create_student_stats 
AFTER INSERT ON student FOR EACH ROW
BEGIN
	INSERT INTO student_stats(student_id,assessment_points,effort_points,exercise_solution_grant,quiz_try_grant)
    VALUE (NEW.id,0,0,3,0);
END$$
DELIMITER ;


DELIMITER $$
CREATE TRIGGER student_quiz_after_update_student_stats_assessment_points
AFTER UPDATE ON student_quiz FOR EACH ROW
BEGIN
	UPDATE student_stats SET assessment_points = ( SELECT SUM(score) FROM student_quiz WHERE student_id = NEW.student_id) WHERE student_id = NEW.student_id;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER student_quiz_after_delete_student_stats_assessment_points
AFTER UPDATE ON student_quiz FOR EACH ROW
BEGIN
	UPDATE student_stats SET assessment_points = ( SELECT SUM(score) FROM student_quiz WHERE student_id = NEW.student_id) WHERE student_id = NEW.student_id;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER student_quiz_after_create_student_stats_assessment_points
AFTER UPDATE ON student_quiz FOR EACH ROW
BEGIN
	UPDATE student_stats SET assessment_points = ( SELECT SUM(score) FROM student_quiz WHERE student_id = NEW.student_id) WHERE student_id = NEW.student_id;
END$$
DELIMITER ;


DELIMITER $$
CREATE TRIGGER student_practice_after_update_student_stats_effort_points
AFTER UPDATE ON student_practice FOR EACH ROW
BEGIN
	UPDATE student_stats SET effort_points = effort_points + NEW.points WHERE student_id = NEW.student_id;
END$$
DELIMITER ;


CREATE TABLE IF NOT EXISTS formula (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    type VARCHAR(100) NOT NULL,
    content VARCHAR(500) NOT NULL
)AUTO_INCREMENT=50000;

ALTER TABLE formula ADD CONSTRAINT uq_formula_name UNIQUE(name);

CREATE TABLE IF NOT EXISTS helper (

	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_by BIGINT NOT NULL,
    content VARCHAR(500) NOT NULL,
    example_id BIGINT,
    formula_id BIGINT,
    example_explanation VARCHAR(500)
) AUTO_INCREMENT = 55000;

ALTER TABLE helper ADD CONSTRAINT fk_helper_created_by FOREIGN KEY (created_by) REFERENCES teacher(id) ON DELETE CASCADE;
ALTER TABLE helper ADD CONSTRAINT fk_helper_formula_id FOREIGN KEY (formula_id) REFERENCES formula(id) ON DELETE SET NULL;


CREATE TABLE IF NOT EXISTS notification(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    recipient_id BIGINT NOT NULL,
    sender_id BIGINT,
    type VARCHAR(100),
    dispatch_date DATETIME,
    viewed BOOL,
    date_of_access DATE,
    extra_info VARCHAR(200)
)AUTO_INCREMENT = 60000;

ALTER TABLE notification ADD CONSTRAINT fk_notification_recipient_user_id FOREIGN KEY(recipient_id) REFERENCES user(id) ON DELETE CASCADE;
ALTER TABLE notification ADD CONSTRAINT fk_notification_sender_user_id FOREIGN KEY(sender_id) REFERENCES user(id) ON DELETE SET NULL;

DELIMITER $$
CREATE TRIGGER after_insert_quiz_delete_old_notification
AFTER INSERT ON quiz FOR EACH ROW
BEGIN
	DELETE FROM notification WHERE DATEDIFF(CURDATE(),dispatch_date) >= 10;
END$$
DELIMITER ;


DELIMITER $$
CREATE TRIGGER after_insert_helper_delete_old_notification
AFTER INSERT ON quiz FOR EACH ROW
BEGIN
	DELETE FROM notification WHERE DATEDIFF(CURDATE(),dispatch_date) >= 10;
END$$
DELIMITER ;




