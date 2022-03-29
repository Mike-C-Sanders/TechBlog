//Home Page Routes
const router = require('express').Router();
const {Post, User, Comment} = require('../models/index');
//authorize users
const withAuth = require('../../utils/auth');
