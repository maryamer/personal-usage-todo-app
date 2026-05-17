export const load=(k,def)=>JSON.parse(localStorage.getItem(k)||JSON.stringify(def));
export const save=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
