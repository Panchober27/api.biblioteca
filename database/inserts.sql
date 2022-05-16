-- tipo_libro
INSERT INTO
    tipo_libro (
        tipo_libro_id,
        nombre_tipo,
        descripcion_tipo
    )
VALUES
    (
        NULL,
        'complementarios',
        'Libros de lecturas complementarias y/o recreacionales.'
    ),
    (NULL, 'matematicas', 'Libros de matematicas...');

-- libros
INSERT INTO
    libros (
        libro_id,
        isbn,
        isbn_tipo,
        nombre,
        autor,
        editorial,
        edicion,
        fecha_publicacion,
        tipo_libro,
        stock
    )
VALUES
    (
        NULL,
        '1313213',
        'tapa dura',
        'Harry Potter y la piedra filosofal',
        'JK Rawling',
        'De bolsillo',
        '1a latam',
        '21/11/1990',
        '1',
        '10'
    );




-- facultades.




