$(function(){
  // theme (saved in localStorage)
  var t=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');
  function setT(v){document.documentElement.setAttribute('data-theme',v);localStorage.setItem('theme',v);$('#theme').text(v==='dark'?'Light':'Dark');}
  setT(t);$('#theme').on('click',function(){setT($('html').attr('data-theme')==='dark'?'light':'dark');});
  // menu + active link
  $('#menu').on('click',function(){$(this).attr('aria-expanded',$('#nl').toggleClass('open').hasClass('open'));});
  var p=location.pathname.split('/').pop()||'index.html';
  $('nav a').each(function(){if($(this).attr('href')===p)$(this).addClass('on').attr('aria-current','page');});
  // progress bar + back to top
  $(window).on('scroll',function(){var s=$(this).scrollTop(),h=$(document).height()-$(this).height();
    $('#bar').width((h?s/h*100:0)+'%');$('#top').toggle(s>400);});
  $('#top').on('click',function(){window.scrollTo({top:0,behavior:'smooth'});});
  // typing effect
  var roles=['B.E. CSE Student','AI and Software Enthusiast','Writer on Trust and Respect'],ri=0,ci=0,del=false,$ty=$('#typing');
  (function tick(){if(!$ty.length)return;var w=roles[ri];ci+=del?-1:1;$ty.text(w.slice(0,ci));
    var d=del?40:90;if(!del&&ci===w.length){del=true;d=1400;}else if(del&&ci===0){del=false;ri=(ri+1)%roles.length;d=300;}setTimeout(tick,d);})();
  // reveal, counters, skill bars on scroll
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var $e=$(e.target);$e.addClass('in');
    $e.find('.skill i').each(function(){$(this).css('width',$(this).data('level')+'%');});
    $e.find('[data-count]').each(function(){var $n=$(this),to=+$n.data('count');$({v:0}).animate({v:to},{duration:1200,step:function(v){$n.text(Math.round(v));}});});
    io.unobserve(e.target);});},{threshold:.2});
  $('.rv').each(function(){io.observe(this);});
  // project filter + modal
  $('.filters .ib').on('click',function(){var f=$(this).data('f');$('.filters .ib').removeClass('on');$(this).addClass('on');
    $('.pcard').each(function(){$(this).toggleClass('hide',f!=='all'&&$(this).data('cat')!==f);});});
  $('.pcard').on('click keydown',function(e){if(e.type==='keydown'&&e.key!=='Enter')return;
    $('#m-title').text($(this).find('h3').text());$('#m-body').html($(this).find('.detail').html());$('#modal').addClass('open');$('#m-close').focus();});
  $('#m-close').on('click',function(){$('#modal').removeClass('open');});
  $('#modal').on('click',function(e){if(e.target===this)$(this).removeClass('open');});
  $(document).on('keydown',function(e){if(e.key==='Escape')$('#modal').removeClass('open');});
  // trust-respect slider
  $('#tr').on('input',function(){var v=+this.value,k=v<35?0:v>65?2:1;var txt=[
   ['Trust-led','Confidence that someone is reliable and means well. Strong trust without respect can slip into blind dependence.'],
   ['Balanced','Trust and respect support each other: reliability is valued, and people keep their dignity and boundaries.'],
   ['Respect-led','Regard for a person\u2019s worth and autonomy. Strong respect without trust can stay polite but distant.']][k];
   $('#tr-t').text(txt[0]);$('#tr-d').text(txt[1]);}).trigger('input');
  // contact form
  var ENDPOINT=''; // TODO: paste your Formspree URL, e.g. https://formspree.io/f/xxxxxx
  $('#cf').on('submit',function(e){e.preventDefault();var ok=true,f=this;$('.err').text('');
    var n=$.trim($('#name').val()),m=$.trim($('#email').val()),g=$.trim($('#msg').val());
    if(n.length<2){$('#e-name').text('Enter your name.');ok=false;}
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(m)){$('#e-email').text('Enter a valid email address.');ok=false;}
    if(g.length<10){$('#e-msg').text('Write at least 10 characters.');ok=false;}
    if(!ok)return;
    function done(){$('#ok').text('Thanks, '+n+'. Your message was sent.').slideDown();f.reset();}
    if(ENDPOINT){$.ajax({url:ENDPOINT,method:'POST',data:{name:n,email:m,message:g},dataType:'json'}).always(done);}else{done();}});
});
