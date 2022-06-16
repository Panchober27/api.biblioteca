-- En este archivo se contienen consultas para crear alumnos.
-- para esto se crean facultades y carreras.
INSERT INTO
    facultades (
        facultad_id,
        nombre_facultad,
        descripcion_facultad
    )
VALUES
    (NULL, 'Ingenieria', 'Facultad de ingienerias'),
    (NULL, 'Salud', 'Facultad salud'),
    (NULL, 'Humanidades', 'Facultad de humanidades'),
    (NULL, 'Educacion', 'Facultad de educacion');

INSERT INTO
    carreras (
        carrera_id,
        nombre_carrera,
        descripcion_carrera,
        facultad_id
    )
VALUES
    -- (NULL, 'Ing Informatica', 'Carrera de ingieneria informatica', '1'),
    (NULL, 'Ing Industrial', 'Carrera de ingieneria informatica', '1'),
    (NULL, 'Ing Comercial', 'Carrera de ingieneria informatica', '1');