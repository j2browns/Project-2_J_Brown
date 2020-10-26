create Table golf_details (
	course_id INT ,
	course VARCHAR(100),
	city VARCHAR(50),
	state VARCHAR(20),
	street VARCHAR(50),
	zip_code VARCHAR(20),
	lng VARCHAR(20),
	lat VARCHAR(20),
	hole VARCHAR(4),
	public_private VARCHAR(20),
	golf_season VARCHAR(30),
	beg_mnth VARCHAR(4),
	end_mnth VARCHAR(4),
	championship_par VARCHAR(4),
	championship_yards VARCHAR(6),
	championship_slope VARCHAR(6),
	championship_usga VARCHAR(6),
	middle_par VARCHAR(6),
	middle_yards VARCHAR(6),
	middle_slope VARCHAR(6),
	middle_usga VARCHAR(6),
	forward_par VARCHAR(6),
	forward_yards VARCHAR(6),
	forward_slope VARCHAR(6),
	forward_usga VARCHAR(6),
	primary key (course_id)

);

select *
from golf_details;