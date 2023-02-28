$(function(){
    const strL = './img/gallery/';
    const strR = '.jpeg';
    const imgs = [
      {
        descripcion: 'Нет лучше сервиса по турам во всей нашей стране, только у нас все клиенты остаются всегда довольными после проведенных для них экскурсий. Только сдесь вы как следует можете отдохнуть от надоедливой обыденности, так что хватит думать и заказывайте уже путевку!',
        titulo: '№1',
        url: strL+'01'+strR,
      },
      {
        descripcion: 'Нет лучше сервиса по турам во всей нашей стране, только у нас все клиенты остаются всегда довольными после проведенных для них экскурсий. Только сдесь вы как следует можете отдохнуть от надоедливой обыденности, так что хватит думать и заказывайте уже путевку!',
        titulo: '№2',
        url: strL+'02'+strR,
      },
      {
        descripcion: 'Нет лучше сервиса по турам во всей нашей стране, только у нас все клиенты остаются всегда довольными после проведенных для них экскурсий. Только сдесь вы как следует можете отдохнуть от надоедливой обыденности, так что хватит думать и заказывайте уже путевку!',
        titulo: '№3',
        url: strL+'03'+strR,
      },
      {
        descripcion: 'Нет лучше сервиса по турам во всей нашей стране, только у нас все клиенты остаются всегда довольными после проведенных для них экскурсий. Только сдесь вы как следует можете отдохнуть от надоедливой обыденности, так что хватит думать и заказывайте уже путевку!',
        titulo: '№4',
        url: strL+'04'+strR,
      },
      {
        descripcion: 'Нет лучше сервиса по турам во всей нашей стране, только у нас все клиенты остаются всегда довольными после проведенных для них экскурсий. Только сдесь вы как следует можете отдохнуть от надоедливой обыденности, так что хватит думать и заказывайте уже путевку!',
        titulo: '№5',
        url: strL+'05'+strR,
      },
      {
        descripcion: 'Нет лучше сервиса по турам во всей нашей стране, только у нас все клиенты остаются всегда довольными после проведенных для них экскурсий. Только сдесь вы как следует можете отдохнуть от надоедливой обыденности, так что хватит думать и заказывайте уже путевку!',
        titulo: '№6',
        url: strL+'06'+strR,
      },
      {
        descripcion: 'Нет лучше сервиса по турам во всей нашей стране, только у нас все клиенты остаются всегда довольными после проведенных для них экскурсий. Только сдесь вы как следует можете отдохнуть от надоедливой обыденности, так что хватит думать и заказывайте уже путевку!',
        titulo: '№7',
        url: strL+'07'+strR,
      },
      {
        descripcion: 'Нет лучше сервиса по турам во всей нашей стране, только у нас все клиенты остаются всегда довольными после проведенных для них экскурсий. Только сдесь вы как следует можете отдохнуть от надоедливой обыденности, так что хватит думать и заказывайте уже путевку!',
        titulo: '№8',
        url: strL+'08'+strR,
      },
      
    ]
  
    $.each(imgs, function(i, img){
      $('.galeria .contenedorImgs').append(`
        <div class="imagen" style="background-image:url('${img.url}')">
          <p class="nombre">${img.titulo}</p>
        </div>`
      );
    }) 
    setTimeout(() => {
      $('.galeria').addClass('vis');
    }, 1000)
    $('.galeria').on('click', '.contenedorImgs .imagen', function(){
      var imagen = imgs[$(this).index()].url;
      var titulo = imgs[$(this).index()].titulo;
      var descripcion = imgs[$(this).index()].descripcion;
      $('.galeria').addClass('scale');
      $(this).addClass('activa');
      if(!$('.fullPreview').length){
        $('body').append(`
          <div class="fullPreview">
            <div class="cerrarModal"></div>
            <div class="wrapper">
              <div class="blur" style="background-image:url(${imagen})"></div>
              <p class="titulo">${titulo}</p>
              <img src="${imagen}">
              <p class="desc">${descripcion}</p>
            </div>
            <div class="controles">
              <div class="control av"></div>
              <div class="control ret"></div>
            </div>
          </div>`
        )
        $('.fullPreview').fadeIn().css('display','flex');
      }
    })
    $('body').on('click', '.fullPreview .cerrarModal', function(){
      $('.contenedorImgs .imagen.activa').removeClass('activa');
      $('.galeria').removeClass('scale');
      $(this).parent().fadeOut(function(){
        $(this).remove();
      })
    })
    $('body').on('click', '.fullPreview .control', function(){
      var activa = $('.contenedorImgs .imagen.activa');
      var index;
      if($(this).hasClass('av')){
        index = activa.next().index();
        if(index < 0) index = 0;
      }else{
        index = activa.prev().index();
        if(index < 0) index = imgs.length - 1;
      }
      $('.fullPreview').addClass('anim');
      setTimeout(()=>{
        $('.contenedorImgs .imagen.activa').removeClass('activa');
        $('.contenedorImgs .imagen').eq(index).addClass('activa');
        $('.fullPreview').find('.blur').css('background-image', 'url('+imgs[index].url+')');
        $('.fullPreview').find('img').attr('src', imgs[index].url);
        $('.fullPreview').find('.titulo').text(imgs[index].titulo);
        $('.fullPreview').find('.desc').text(imgs[index].descripcion);
        $('.fullPreview').removeClass('anim');
      }, 500)
    })
  })