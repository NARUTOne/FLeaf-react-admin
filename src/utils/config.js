/**
 * some config
 */
var apiBaseUrl = '/';

if(process.env.NODE_ENV == 'development') {
	apiBaseUrl = '/';
}

var NAV_LIST = [{
	name: '概览',
	icon: 'bar-chart',
	key: 'home',
	href: '/app/home'
}, {
	name: 'todo',
	icon: 'form',
	key: 'todo',
	href: '/app/todo'
}, {
	name: '血缘',
	icon: 'share-alt',
	key: 'blood',
	href: '/app/blood'
}];

module.exports = {
	apiBaseUrl,
	systemName: 'system name',
	PName: '/app',
	navList: NAV_LIST,
};