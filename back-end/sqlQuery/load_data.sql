INSERT INTO public."users"(
	name, password, role)
	VALUES
	('MicroChelik', '1234', 'ROLE_PLAYER'),
	('Chelik', '12345', 'ROLE_PLAYER'),
	('MacroChelik', '54321', 'ROLE_PLAYER'),
	('UltraChelik', '19980', 'ROLE_PLAYER'),
	('GigaChelik', '77777', 'ROLE_PLAYER'),
	('MicroPoc', '1234', 'ROLE_PLAYER'),
	('Poc', '12345', 'ROLE_PLAYER'),
	('MacroPoc', '54321', 'ROLE_PLAYER'),
	('UltraPoc', '19980', 'ROLE_PLAYER'),
	('GigaPoc', '77777', 'ROLE_PLAYER'),
	('Venigni', '$2b$08$dwTRzEETvirSSfRtb956quNMGIkXRC41MczzuxhH960yzCcBrLvPW', 'ROLE_ORGINIZER'),
	('admin', '$2b$08$FIYemLu7Bf3Q/fBmqNZOeucd3PSv5BQEjvK.lgh9X0psd5.Twojiy', 'ROLE_ADMIN'),
	('adminUser', '$2b$08$FIYemLu7Bf3Q/fBmqNZOeucd3PSv5BQEjvK.lgh9X0psd5.Twojiy', 'ROLE_ADMIN'),
	('adminTournament', '$2b$08$FIYemLu7Bf3Q/fBmqNZOeucd3PSv5BQEjvK.lgh9X0psd5.Twojiy', 'ROLE_ADMIN'),
	('adminTeam', '$2b$08$FIYemLu7Bf3Q/fBmqNZOeucd3PSv5BQEjvK.lgh9X0psd5.Twojiy', 'ROLE_ADMIN');
	
INSERT INTO public."teams"(
	name)
	VALUES
	('Chels'),
	('Pocs');

INSERT INTO public."team_members"(
	team_id, user_id)
	VALUES
	(1, 1),
	(1, 2),
	(1, 3),
	(1, 4),
	(1, 5),
	(2, 6),
	(2, 7),
	(2, 8),
	(2, 9),
	(2, 10);
	
INSERT INTO public."tournaments"(
	title, start_date, end_date, organizer_id)
	VALUES
	('Doka2 t.1', '12.10.2024', '14.10.2024', 11 ),
	('CounterBonk2 t.1', '24.10.2024', '26.10.2024', 11 ),
	('BABG t.1', '15.11.2024', '17.11.2024', 11 );

INSERT INTO public."team_queries"(
	team_id, tournament_id, sending_date, description, status)
	VALUES
	(1, 1, '10.10.2024', 'Doka2', true),
	(2, 1, '10.10.2024', 'Doka2', true),
	(2, 2, '20.10.2024', 'StariyCraft2', false),
	(2, 2, '22.10.2024', 'CounterBonk2', true),
	(1, 2, '22.10.2024', 'CounterBonk2', true),
	(1, 3, '13.11.2024', 'BABG', true),
	(2, 3, '13.11.2024', 'BABG', true);

INSERT INTO public."engaged_teams"(
	tournament_id, team_id, team_grid_status)
	VALUES
	(1, 1, 2),
	(1, 2, 0),
	(2, 1, 0),
	(2, 2, 2),
	(3, 1, 2),
	(3, 2, 1);
	
INSERT INTO public."matches"(
	tournament_id, is_team1_winner, grid_level, start_date, end_date, team1_id, team2_id)
	VALUES
	(1, true, 2, '12.10.2024', '13.10.2024', 1, 2),
	(1, true, 0, '13.10.2024', '14.10.2024', 1, 2),
	(2, false, 2, '24.10.2024', '25.10.2024', 1, 2),
	(2, false, 0, '25.10.2024', '26.10.2024', 1, 2),
	(3, true, 2, '15.10.2024', '16.10.2024', 1, 2);
	
INSERT INTO public."tournament_results"(
	tournament_id, team_id, place)
	VALUES
	(1, 1, 1),
	(1, 2, 2),
	(2, 1, 2),
	(2, 2, 1);
	