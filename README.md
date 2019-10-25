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
- belong_to :user_group

## messagesテーブル
|text|text|
|image|text|
|user_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
### Association
- belong_to :user
- belong_to :group

## groups テーブル
|name|text|null: false|
### Association
- has_many :users
- has_many :messages
- belong_to :user_group

## user_groupテーブル
|user|references|null:false, fereign_key:true|
|group|references|null:false, fereign_key:true|
### Association
- belong_to :user
- belong_to :group



