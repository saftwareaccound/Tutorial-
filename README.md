<html lang="en">
<head>
<meta charset="UTF-8">
<title>Web View</title>
<style>
    body{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        height:100vh;
        margin:0;
        font-family:Arial, sans-serif;
        gap:1.5rem;
    }
    #buttons{
        display:flex;
        gap:1rem;
        transition:all 0.3s ease;
    }
    button{
        padding:1rem 2rem;
        font-size:1.2rem;
        border:none;
        border-radius:8px;
        cursor:pointer;
        transition:all 0.3s ease;
    }
    #yes{ background:#4caf50; color:#fff; }
    #no { background:#f44336; color:#fff; }

   .fullscreen{
        position:fixed;
        top:0;
        left:0;
        width:100vw !important;
        height:100vh !important;
        border-radius:0 !important;
        font-size:4rem !important;
        z-index:999;
    }
    #thanks{
        display:none;
        font-size:2rem;
        color:#4caf50;
    }
</style>
</head>
<body>
    <h1 id="question">You Love Me🥹?</h1>

 <div id="buttons">
        <button id="yes">Yes</button>
        <button id="no">No</button>
    </div>

 <div id="thanks">Yaaa You Love Me 🥰😘</div>

<script>
const yesBtn   = document.getElementById('yes');
const noBtn    = document.getElementById('no');
const question = document.getElementById('question');
const growFactor = 1.3;   // ကြီးမည့်အချိုး

noBtn.addEventListener('click', () => {
   // Yes button ကို မကြာခဏ ကြီးလောင်စေခြင်း
    const rect = yesBtn.getBoundingClientRect();
    let newW = rect.width  * growFactor;
    let newH = rect.height * growFactor;

   //  viewport 80 % ထက်ကြီးသွားရင် full-screen class ထည့်
    if (newW >= window.innerWidth * 0.8 || newH >= window.innerHeight * 0.8){
        yesBtn.classList.add('fullscreen');
        yesBtn.textContent = 'YES';
    } else {
        yesBtn.style.width     = newW + 'px';
        yesBtn.style.height    = newH + 'px';
        yesBtn.style.fontSize  = (parseFloat(getComputedStyle(yesBtn).fontSize) * growFactor) + 'px';
    }
});

yesBtn.addEventListener('click', () => {
  // Yes ကို‌နှိပ်လျှင် စာများပျောက်ပြီး Thank you ပြ
    document.getElementById('buttons').style.display = 'none';
    question.style.display = 'none';
    document.getElementById('thanks').style.display = 'block';
});
</script>
</body>
</html>
