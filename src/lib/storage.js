export default {

    get: key => {
        if(window.location.hash != '') {
            return decodeURIComponent(window.location.hash).replace('#', '');
        }
        return '';
        // return localStorage.getItem(key);
    },
    
    set: (key, val) => {
        return history.pushState({ id: 'main' }, null, '#' + encodeURIComponent(val));
        // return localStorage.setItem(key, val);
    },

};
