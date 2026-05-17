export const POMODORO=25*60;
export const format=(t)=>{
 const m=Math.floor(t/60);
 const s=t%60;
 return `${m}:${s.toString().padStart(2,'0')}`;
}
