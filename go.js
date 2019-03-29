let x = "i+i*i";
let stack;
let tt;
let handles = [")E(","E*E","E+E","i","E^E"];
let pre = [
    /*  + */  ['>', '>','<','<','<','<','<','>','>'],

    /*  - */  ['>', '>','<','<','<','<','<','>','>'],

    /*  * */  ['>', '>','>','>','<','<','<','>','>'],

    /*  / */  ['>', '>','>','>','<','<','<','>','>'],

    /*  ^ */  ['>', '>','>','>','<','<','<','>','>'],

    /*  i */  ['>', '>','>','>','>','e','e','>','>'],

    /*  ( */  ['<', '<','<','<','<','<','<','>','e'],

    /*  ) */  ['>', '>','>','>','>','e','e','>','>'],

    /*  $ */  ['<', '<','<','<','<','<','<','<','>']
];

function getindex(c){
    switch(c)
    {
    case '+':return 0;
    case '-':return 1;
    case '*':return 2;
    case '/':return 3;
    case '^':return 4;
    case 'i':return 5;
    case '(':return 6;
    case ')':return 7;
    case '$':return 8;
    }
  }

function shift(){
    stack+=x[0];
    x = x.substring(1);
    console.log(stack, x);
    let ttt = "<th></th><td>"+stack+"</td><td>"+x+"</><td>Shift</>";
    tt.append($(ttt));
}

function reduce(){
    for(let i = 0;i<handles.length;i++){
        if(handles[i].length<stack.length){
        console.log(handles[i],stack.substring(stack.length-handles[i].length));
            
            if(stack.substring(stack.length-handles[i].length)==handles[i]){
                stack = stack.substring(0,stack.length-handles[i].length)+'E';
                
                tt = $('<tr></tr>');
                let ttt = "<th></th><td>"+stack+"</td><td>"+x+"</><td>reduce E -> "+handles[i]+"</>";
                tt.append($(ttt));
                $("tbody").append(tt);
                return 1;
            }
        }
    }
    return 0;
}

function main(s){
    stack = "$";
    x = s;
    x += '$';
    let temp;
    let k;
    while(x.length!=1)
    {
        tt = $('<tr></tr>');
        shift();
        $("tbody").append(tt);
        temp = pre[getindex(stack[stack.length-1])][getindex(x[0])];
        if(temp=='>'){
            //console.log('hello');
            k = reduce();
            console.log(k);
            while(k){
                k = reduce();
            }
        }
        
    }

    if(stack == "$E"){
        alert("String is accepted");
        console.log('accept');
    }else{
        alert("String is rejected");
        console.log('reject');
    }
}

function remove(){
    let t = $('tbody');
    t.remove();
}

let bu = $('.btn');
let inp = $('#input');
bu[0].onclick = ()=>{
    if(inp.val().length==0){
        alert('empty');
    }
    else{
        remove();
        let y = "<tbody></tbody>";
        $('thead').after($(y));
        main(inp.val());
    }
}