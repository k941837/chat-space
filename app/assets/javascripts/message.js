$(function(){
  function buildPost(message){
    var image = (message.image.url !== null)? `<img class="message-text__image" src=${message.image.url}>` : "";

    var html =  `<div class="message" data-message-id=${message.id}>
                  <div class="chat_main_contents_message">
                    <div class="chat_main_contents_message_content">
                      <div class="chat_main_contents_message_username">
                        <div class="chat_main_contents_message_A_username">
                          ${message.user_name}
                        <div>
                        <div class="chat_main_contents_message_A_time">
                          ${message.created_at}
                        </div>
                      <div>    
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
      $("#new_message")[0].reset();
    })
    .fail(function(data){
      alert('エラー')
      $('chat_main_form_send-btn').prop('disabled', false);
    })
  })

  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){//今いるページのリンクが/groups/グループID/messagesのパスとマッチすれば以下を実行。
      var last_message_id = $('.message:last').data("message-id"); //dataメソッドで.messageにある:last最後のカスタムデータ属性を取得しlast_message_idに代入。
      // var group_id = $(".group").data("group-id");
      console.log(last_message_id)
      $.ajax({ //ajax通信で以下のことを行う
        url: "api/messages", //サーバを指定。今回はapi/message_controllerに処理を飛ばす
        type: 'get', //メソッドを指定
        dataType: 'json', //データはjson形式
        data: {last_id: last_message_id} //飛ばすデータは先ほど取得したlast_message_id。またparamsとして渡すためlast_idとする。
      })
      .done(function (messages) { 
        console.log(messages)
        //通信成功したら、controllerから受け取ったデータ（messages)を引数にとって以下のことを行う
        var insertHTML = '';//追加するHTMLの入れ物を作る
        messages.forEach(function (message) {//配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
          insertHTML = buildPost(message); //メッセージが入ったHTMLを取得
          $('.chat_main_contents').append(insertHTML);//メッセージを追加
        })
        $('.chat_main_contents_message').animate({scrollTop: $('chat_main_contents')[0].scrollHeight}, 'fast');//最新のメッセージが一番下に表示されようにスクロールする。
      })
      .fail(function () {
        alert('自動更新に失敗しました');//ダメだったらアラートを出す
      });
    }
  };
  setInterval(reloadMessages, 5000);//5000ミリ秒ごとにreloadMessagesという関数を実行し自動更新を行う。
  });




