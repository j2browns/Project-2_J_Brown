-- Drop table if exists
DROP TABLE IF EXISTS golf_details;

-- Create new table
CREATE TABLE golf_details (
    course_id VARCHAR unique PRIMARY KEY,
	course VARCHAR,
	city VARCHAR,
	state VARCHAR,
    street VARCHAR,
    zip_code VARCHAR,
    lng float,
    lat float,
    hole VARCHAR,
    public_private VARCHAR,
	golf_season VARCHAR,
    beg_mnth VARCHAR,
    end_mnth VARCHAR,
    championship_par VARCHAR,
    championship_yards VARCHAR,
    championship_slope VARCHAR,
    championship_usga VARCHAR,
    middle_par VARCHAR,
    middle_yards VARCHAR,
    middle_slope VARCHAR,
    middle_usga VARCHAR,
    forward_par VARCHAR,
    forward_yards VARCHAR,
    forward_slope VARCHAR,
    forward_usga VARCHAR,
    phone VARCHAR,
    architect VARCHAR,
    year_built VARCHAR,
    guest_policy VARCHAR,
    credit_card VARCHAR,
    range VARCHAR,
	rental_club VARCHAR,
    pro_in_House VARCHAR,
    metal_spikes_okay VARCHAR,
    weekday VARCHAR,
    weekend VARCHAR,
    tee_time_welcomed VARCHAR,
    rental_cart_available VARCHAR
);

-- View table columns and datatypes
SELECT * FROM golf_details;
