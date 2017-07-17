//DEV
//var API_URL = 'http://localhost:3001/api';
//BUILD
var API_URL = 'https://kovaja-shopping-list.herokuapp.com/api';
export const apiUrls = {
    init: API_URL + '/',
    getCategories: API_URL + '/categories/all',
    login: API_URL + '/user/get',
    allLists: API_URL + '/list/all',
    newList: API_URL + '/list/new',
    deleteList: API_URL + '/list/delete',
    updateList: API_URL + '/list/update',
    allItems: API_URL + '/item/all',
    newItem: API_URL + '/item/new',
    deleteItem: API_URL + '/item/delete',
    updateItem: API_URL + '/item/update'
};