document.addEventListener('DOMContentLoaded',function(){
  // Mobile menu toggle
  const menuBtn=document.querySelector('#menu-btn');
  const mobileMenu=document.querySelector('#mobile-menu');
  if(menuBtn && mobileMenu){
    menuBtn.addEventListener('click',()=>{
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Active nav highlight
  const here=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  document.querySelectorAll('a[data-nav]').forEach(a=>{
    const target=(a.getAttribute('href')||'').split('/').pop().toLowerCase();
    if(target===here){
      a.classList.add('text-[#00FFA3]','font-medium');
    }
  });

  // Smooth scroll for same-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const id=a.getAttribute('href');
      if(id.length>1){
        const el=document.querySelector(id);
        if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth',block:'start'}); }
      }
    });
  });

  // Reveal on scroll
  const revealEls=[...document.querySelectorAll('[data-animate]')];
  if('IntersectionObserver' in window && revealEls.length){
    const io=new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('show');
          io.unobserve(entry.target);
        }
      });
    },{threshold:0.15});
    revealEls.forEach(el=>{ el.classList.add('reveal'); io.observe(el); });
  }else{
    // Fallback
    revealEls.forEach(el=>el.classList.add('show'));
  }

  // Subtle parallax for elements marked data-parallax within hero
  const parallaxRoot=document.querySelector('[data-parallax-root]');
  if(parallaxRoot){
    parallaxRoot.addEventListener('mousemove', (e)=>{
      const rect=parallaxRoot.getBoundingClientRect();
      const cx=e.clientX-rect.left-rect.width/2;
      const cy=e.clientY-rect.top-rect.height/2;
      parallaxRoot.querySelectorAll('[data-parallax]').forEach((el,idx)=>{
        const depth=(idx+1)*0.01;
        el.style.transform=`translate3d(${cx*depth}px, ${cy*depth}px, 0)`;
      });
    });
    parallaxRoot.addEventListener('mouseleave',()=>{
      parallaxRoot.querySelectorAll('[data-parallax]').forEach((el)=>{
        el.style.transform='translate3d(0,0,0)';
      });
    });
  }

  // Custom cursor + follower
  const cursor=document.getElementById('cursor');
  const follower=document.getElementById('cursor-follower');
  if(cursor && follower){
    let fx=0, fy=0;
    let cx=0, cy=0;
    const lerp=(a,b,n)=> (1-n)*a + n*b;
    const move=(e)=>{
      cx=e.clientX; cy=e.clientY;
      cursor.style.transform=`translate3d(${cx-10}px, ${cy-10}px,0)`;
    };
    window.addEventListener('mousemove',move);
    const tick=()=>{
      fx=lerp(fx, cx-4, 0.15);
      fy=lerp(fy, cy-4, 0.15);
      follower.style.transform=`translate3d(${fx}px, ${fy}px,0)`;
      requestAnimationFrame(tick);
    };
    tick();
    document.querySelectorAll('a, button, .btn-glow, .glass').forEach(el=>{
      el.addEventListener('mouseenter',()=>cursor.classList.add('hover'));
      el.addEventListener('mouseleave',()=>cursor.classList.remove('hover'));
    });
  }

  // Scroll progress bar
  const progress=document.getElementById('progress');
  const setProgress=()=>{
    if(!progress) return;
    const h=document.documentElement;
    const max=h.scrollHeight - h.clientHeight;
    const val=(max>0? (h.scrollTop/max)*100 : 0);
    progress.style.width=`${val}%`;
  };
  setProgress();
  window.addEventListener('scroll', setProgress, {passive:true});

  // Floating particles
  document.querySelectorAll('.particles').forEach(container=>{
    const count=20;
    const frag=document.createDocumentFragment();
    for(let i=0;i<count;i++){
      const p=document.createElement('span');
      p.className='particle';
      p.style.left=Math.random()*100+'%';
      p.style.animationDelay=(Math.random()*8).toFixed(2)+'s';
      p.style.animationDuration=(6+Math.random()*6).toFixed(2)+'s';
      p.style.background= Math.random()>0.5 ? 'rgba(0,255,163,0.6)' : 'rgba(153,69,255,0.6)';
      frag.appendChild(p);
    }
    container.appendChild(frag);
  });

  // Timed "Thanks for visiting" toast
  const thanks=document.getElementById('thanks');
  if(thanks){
    setTimeout(()=>thanks.classList.add('show'), 2500);
    setTimeout(()=>thanks.classList.add('hide'), 8000);
  }
});
