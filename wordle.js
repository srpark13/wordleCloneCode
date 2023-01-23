let insertLoc=1;
let keyLock=false;
let eraseLock=false;
let accessLock=1;
let gameLock = false;
const answer="tango".toUpperCase();
document.querySelector('.answer button').addEventListener("click",()=>window.alert(`The answer is ${answer}`));
const colorButton=(value,ishit)=>{
  const toColor = document.querySelectorAll("button");
  toColor.forEach(element => {
    if(element.innerText===value){
      if(ishit===1){
        if(!element.classList.contains('buttonHit')){
          element.className='buttonHit';
        }
      }
      else if(ishit===2){ 
        if(!element.classList.contains('buttonHit')){
          element.className='buttonContains';
        }
      }
      else{
        if(!element.classList.contains('buttonHit') && !element.classList.contains('buttonContains')){
          element.className='buttonMiss';
        }
      }
    }
  });
}
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
    keyLock=false;
    insertLoc--;
    const tmp = document.querySelector(`#unit${insertLoc}`);
    tmp.removeChild(tmp.firstChild);
  }
}
const isCleared=(value)=>{
  if(answer===value){
    return true;
  }
  else{
    return false;
  }
}
const checkAnswer=()=>{
  let tmpAnswer="";
  let userAnswer="";
  const userAnswerNode = [];
  const tmpUserAnswerNode=[];
  let idx =0;
  for(let i = accessLock; i<insertLoc;i++){
    userAnswerNode.push(document.querySelector(`#unit${i}`));
    userAnswer+=document.querySelector(`#unit${i}`).innerText;
  }
  
  for(let i = accessLock; i<insertLoc;i++){
    if(answer.charAt(idx)===userAnswerNode[idx].innerText){
      userAnswerNode[idx].style.backgroundColor='#6aaa64';
      userAnswerNode[idx].style.borderColor='#6aaa64';
      userAnswerNode[idx].querySelector('.unitText').style.color='#FFFFFF';
      colorButton(answer.charAt(idx),1);
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
      tmpUserAnswerNode[i].style.borderColor='#c9b458';
      tmpUserAnswerNode[i].querySelector('.unitText').style.color='#FFFFFF';
      colorButton(tmpUserAnswerNode[i].innerText,2)
      tmpAnswer.replace(tmpAnswer.indexOf(tmpUserAnswerNode[i].innerText),"");
    }
    else{
      tmpUserAnswerNode[i].style.backgroundColor='#787c7e';
      tmpUserAnswerNode[i].style.borderColor='#787c7e';
      colorButton(tmpUserAnswerNode[i].innerText,3);
      tmpUserAnswerNode[i].querySelector('.unitText').style.color='#FFFFFF';
    }
  }
  const isCorrect = isCleared(userAnswer);
  return isCorrect;
}
const keyEventFunc=(key)=>{
  const reg=/[a-zA-Z]{1}$/;  
  if(!gameLock){
    if(key.toUpperCase()==='BACKSPACE'){
      if(accessLock<insertLoc)eraseKey();
    }
    else if(key.toUpperCase() ==='ENTER'){
      if(insertLoc>5 &&insertLoc%5===1){
        const isCorrect = checkAnswer();
        console.log(isCorrect);
        accessLock=insertLoc;
        if(isCorrect){
          keyLock=true;  
          gameLock=true;
          const endPoint = document.createElement('div');
          endPoint.appendChild(document.createElement('p'));
          endPoint.classList.add('endPoint');
          endPoint.innerText='You\'ve got it!!!';
          document.querySelector('.keyboardContainer').before(endPoint);
        }
        else{
          insertLoc===31? (keyLock=true,gameLock=true,document.querySelector('.answer').classList.remove('hidden')) : keyLock=false;
        }
      }
    }
    else{
      if(key.match(reg)&&key.length===1){
        insertKey(key);
      }
    }
  }  
}
window.addEventListener("keydown",event=>keyEventFunc(event.key));

const buttons=document.querySelectorAll('button');
buttons.forEach(element=>element.addEventListener('click',(e)=>{
  if(e.target.innerText==='DEL'){
    keyEventFunc('Backspace');
  }
  else{
    keyEventFunc(e.target.innerText)  ;
  }
}));