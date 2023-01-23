let insertLoc=1;
let keyLock=false;
let eraseLock=false;
let accessLock=1;
const answer="tango".toUpperCase();
const insertKey=(key)=>{
  if(!keyLock){
    const toWrite = document.createElement('p');
    toWrite.innerText=key;
    toWrite.classList.add('unitText');
    document.querySelector(`#unit${insertLoc}`).appendChild(toWrite);
    if(insertLoc%5===0){
      keyLock=true;
    }
    insertLoc++;
  }
}
const eraseKey=()=>{
  if(insertLoc>accessLock){
      ///do erase div
      keyLock=false;
      insertLoc--;
      const tmp = document.querySelector(`#unit${insertLoc}`);
      tmp.removeChild(tmp.firstChild);
  }
}
const checkAnswer=()=>{
  let tmpAnswer="";
  const userAnswerNode = [];
  const tmpUserAnswerNode=[];
  let idx =0;
  for(let i = accessLock; i<insertLoc;i++){
    userAnswerNode.push(document.querySelector(`#unit${i}`));
  }
  for(let i = accessLock; i<insertLoc;i++){
    if(answer.charAt(idx)===userAnswerNode[idx].innerText){
      userAnswerNode[idx].style.backgroundColor='#6aaa64';
      userAnswerNode[idx].querySelector('.unitText').style.color='#FFFFFF';
    }
    else{
        tmpAnswer+=answer.charAt(idx);
        tmpUserAnswerNode.push(userAnswerNode[idx]);
    }
    idx++;
  }
  for(let i=0; i<tmpUserAnswerNode.length; i++){
    if(tmpAnswer.includes(tmpUserAnswerNode[i].innerText)){
        tmpUserAnswerNode[i].style.backgroundColor='#c9b458';
        tmpUserAnswerNode[i].querySelector('.unitText').style.color='#FFFFFF';
        tmpAnswer.replace(tmpAnswer.indexOf(tmpUserAnswerNode[i].innerText),"");
    }
    else{
        tmpUserAnswerNode[i].style.backgroundColor='#787c7e';
        tmpUserAnswerNode[i].querySelector('.unitText').style.color='#FFFFFF';
    }
  }
}
window.addEventListener("keydown",event=>{
  const reg=/[a-zA-Z]{1}$/;  
  if(event.key==='Backspace'){
    if(accessLock<insertLoc)eraseKey();
  }
  else if(event.key ==='Enter'){
    if(insertLoc>5 &&insertLoc%5===1){
      checkAnswer();
      accessLock=insertLoc;
      if(insertLoc===31){
      }
      else{
        keyLock=false;
      }
    }
  }
  else{
    if(event.key.match(reg)&&event.key.length===1){
      insertKey(event.key);
    }
  }
});