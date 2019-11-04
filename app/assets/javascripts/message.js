$(function(){
  function buildPost(message){
    var image = (message.image.url !== null)? `<img class="message-text__image" src=${message.image.url}>` : "";

    var html =  `<div class="chat_main_contents_message">
                  <div class="chat_main_contents_message_username">
                    <div class="chat_main_contents_message_A_username">
                    ${message.name}
                    </div>
                    <div class="chat_main_contents_message_A_time">
                    ${message.date}
                    </div>
                  </div>
                  <div class="chat_main_contents_message_message-box">
                    <p class="lower-message__content">
                    ${message.content}
                    </p>
                  </div>
                  ${image}
                </div>`
    return html;
  }


  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({    //非同期通信のオプションを定義
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildPost(data);  //変数htmlに代入。
      $('.chat_main_contents').append(html)  //メッセージ内容の追加。
      $('.chat_main_contents').animate({scrollTop: $('.chat_main_contents')[0].scrollHeight});
      $('.chat_main_form_send-btn').prop('disabled', false);  //ボタンを連続で使用できるようにする。
      $(".chat_main_form_message.text")[0].reset();
    })
    .fail(function(data){
      alert('エラー')
      $('chat_main_form_send-btn').prop('disabled', false);
    })
  })
})




