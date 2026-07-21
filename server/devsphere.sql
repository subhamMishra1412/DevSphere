--
-- PostgreSQL database dump
--

\restrict oSZhF20m4TyO30y7qhL3y37QPi9OtfAXoCWDuN8RZmgIF8GYkGypkOH6poOzhDG

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text NOT NULL,
    status character varying(50) NOT NULL,
    owner character varying(100) NOT NULL,
    progress integer NOT NULL,
    technologies text[],
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    user_id integer NOT NULL,
    due_date date,
    CONSTRAINT progress_check CHECK (((progress >= 0) AND (progress <= 100))),
    CONSTRAINT status_check CHECK (((status)::text = ANY ((ARRAY['Planning'::character varying, 'Active'::character varying, 'Completed'::character varying])::text[])))
);


ALTER TABLE public.projects OWNER TO postgres;

--
-- Name: projects_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.projects_id_seq OWNER TO postgres;

--
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.projects_id_seq OWNED BY public.projects.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: projects id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.projects (id, title, description, status, owner, progress, technologies, created_at, updated_at, user_id, due_date) FROM stdin;
3	DevSphere Updated	Backend API Updated	Completed	Subham	100	{Node.js,Express,PostgreSQL}	2026-07-11 17:30:15.468332	2026-07-11 17:30:15.468332	2	\N
4	John's Project	Created by John	Active	John	25	{Node.js,Express}	2026-07-11 17:44:30.102914	2026-07-11 17:44:30.102914	3	\N
9	Test Project	Created for dashboard testing	Active	Test User	30	{React,Node.js,PostgreSQL}	2026-07-15 17:58:42.095427	2026-07-18 14:23:53.375894	7	2026-07-08
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, created_at) FROM stdin;
1	Subham	subham@example.com	$2b$10$XblfqUuw8/vqs07sG6OQjuG398cUdNKN/FLTDHxXgwhPypYfb5JQO	2026-07-10 19:33:53.036584
2	Subham	subham2@example.com	$2b$10$RQ0y00wSXg7JRUUqrTH4f.6U0HklVPhwa2SVEIlLntRXPbfwpEllu	2026-07-10 21:48:45.811835
3	John	john@example.com	$2b$10$/ZX8JIa6zsvor3CpaxpnNOZC3yk3qJmEUkrL9qmtJJXPlmO9flAQO	2026-07-11 17:40:58.465168
4	Test User	test@example.com	dummyhash	2026-07-11 20:45:43.750889
6	Alice	alice@example.com	$2b$10$v6KiCeiDEeRbj9gZCD8Wt.XXawxHo2fwxTcdcSzKSB/Eh1PZ1DdRq	2026-07-11 21:23:00.006979
7	Test User subham	testsubham@example.com	$2b$10$bwsK/fCuBSMRoeC6Qr2GRuKOJg1Ui219jl7H.2hOE2JcXzkwk/qh6	2026-07-15 17:53:17.550179
8	Sam Will	sam1412@gmail.com	$2b$10$NqyyaltXxeJsNQxdDS1atO8zNfuDx2IzznahUsKunSS2bUA3iM8he	2026-07-18 13:28:52.641742
\.


--
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.projects_id_seq', 9, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 8, true);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: projects projects_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict oSZhF20m4TyO30y7qhL3y37QPi9OtfAXoCWDuN8RZmgIF8GYkGypkOH6poOzhDG

