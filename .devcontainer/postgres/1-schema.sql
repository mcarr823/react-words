CREATE TABLE Word(
    w_id SERIAL PRIMARY KEY,
    w_length INT NOT NULL,
    w_word VARCHAR(255) NOT NULL
);