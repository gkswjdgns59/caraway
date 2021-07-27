class Auth{
    static user = undefined;
    static key = '';
    static login(user, key){
        localStorage.setItem('id', user);
        this.user = user;
        this.key = key;
    }
    static logout(){
        localStorage.removeItem('id');
    }
}

export default Auth;