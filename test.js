let a = {
    b: 'b',
    c: {
        c: 'c'
    }
};

function test(p) {
    let d = p.clone();
    d.c = null;
    
}

console.log(a);
test(a);
console.log(a);