window.onload = function() {

    //存取localStorage中的数据
    var store = {
        save(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },
        fetch(key) {
            return JSON.parse(localStorage.getItem(key)) || [];
        }
    }

    var list = store.fetch("new-class");

    /*var list = [{
            title: "师范水i奥",
            isChecked: false
        },
        {
            title: "歼击机积极",
            isChecked: true
        }
    ];*/

    var vm = new Vue({
        el: '.main',
        data: {
            list: list,
            todo: "",
            edtorTodos: "", //记录正在编辑的数据
            beforeTitle: "", //记录现在编辑的数据的title
            visibility:"all"
        },
        watch: {
            /*list: function() { //监控list这个数据，当list里面的数据发生改变的时候执行
                store.save("new-class", this.list);
            }*/
            list: {
                handler: function() {
                    store.save("new-class", this.list);
                },
                deep: true
            }
        },
        computed: { //计算属性
            nocheckedlength: function() {
                return this.list.filter(function(item) {
                    return !item.isChecked
                }).length
            },
            filteredList:function(){
                var filter = {
                    all:function(list){
                        return list;
                    },
                    finished:function(list){
                        return list.filter(function(item){
                            return item.isChecked;
                        })
                    },
                    unfinished:function(list){
                        return list.filter(function(item){
                            return !item.isChecked;
                        })
                    }

                }
                return filter[this.visibility] ? filter[this.visibility](list) : list;
            }
        },
        methods: {
            addTodo(ev) { //这个写法是es6简写的写法，不用function();功能：添加任务
                //像list中添加数据
                this.list.push({
                    title: this.todo,
                    isChecked: false
                });
                this.todo = '';
            },
            deleteTodo(todo) { //删除任务
                var index = this.list.indexOf(todo);
                this.list.splice(index, 1);
            },
            edtorTodo(todo) { //编辑任务
                this.edtorTodos = todo;
                this.beforeTitle = todo.title;
            },
            edtorTodoed(todo) { //编辑任务成功
                this.edtorTodos = '';
            },
            cancelTodo(todo) { //取消任务编辑
                todo.title = this.beforeTitle;
                this.beforeTitle = '';
                this.edtorTodos = '';
            }
        },
        directives: {
            "foucs": {
                update(el, binding) {
                    if (binding.value) {
                        el.focus();
                    }
                }
            }
        }
    });

function watchhashChange(){
    var hash = window.location.hash.slice(1);
    vm.visibility = hash;
};
watchhashChange();

window.addEventListener("hashchange",watchhashChange);

};