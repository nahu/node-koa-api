-- Role: adelantos
-- DROP ROLE adelantos;

CREATE ROLE "code-challenge" WITH
  LOGIN ENCRYPTED PASSWORD 'code-challenge'
  NOSUPERUSER
  INHERIT
  CREATEDB
  CREATEROLE
  NOREPLICATION;