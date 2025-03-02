-- Create clients table if it doesn't exist
CREATE TABLE IF NOT EXISTS clients (
    client_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    health_info TEXT
);
-- Insert sample clients (in a real application, passwords should be hashed)
-- Only run these if the clients don't already exist
INSERT IGNORE INTO clients (username, password, health_info)
VALUES (
        'admin',
        'admin123',
        'Administrator account with no health information'
    ),
    (
        'doctor',
        'doctor123',
        'Doctor account with access to patient records'
    ),
    (
        'patient1',
        'patient123',
        'Patient with history of hypertension and diabetes'
    ),
    (
        'test',
        'test123',
        'Test account for development purposes'
    );
-- Create a view to see clients without passwords (for security)
CREATE OR REPLACE VIEW client_info AS
SELECT client_id,
    username,
    health_info
FROM clients;