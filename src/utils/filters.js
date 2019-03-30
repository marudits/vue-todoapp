import Vue from 'vue';

// utils
import { dateTimeFormatter } from './string-formatter'

Vue.filter('dateTimeFormatter', dateTimeFormatter);