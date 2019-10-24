# chat-space DB設計
## usersテーブル
|column|Type|Option|
|------|----|------|
|email|string|null: false|
|password|string|null: false|
|name|string|null:false|
### Association
- has_many :messages
- has_many :groups

## messagesテーブル
|text|text|
|image|text|
|user_id|integer|null: false, foreign_key: true|
### Association
- belong_to :user
- belong_to :groups

## groups テーブル
|name|text|null: false|
### Association
- has_many :users

## users_groupsテーブル
|users|references|null:false, fereign_key:true|
|groups|references|null:false, fereign_key:true|
### Association
- belong_to :users
- belong_to :groups



