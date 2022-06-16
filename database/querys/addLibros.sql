
-- Archivo con consultas para crear libros y sus ejemplares.

INSERT INTO
    libros (
        libro_id,
        isbn,
        isbn_tipo,
        nombre,
        editorial,
        edicion,
        fecha_publicacion
    )
VALUES
    (
        NULL,
        '9789878000107',
        'tapa dura',
        'Harry Potter y la Piedra Filosofal',
        'Salamandra',
        '101101',
        '1990-01-02'
    );



-- Ahora insertar ejemplares del libro.
-- crear la relacion entre los ejemplares y el libro.


