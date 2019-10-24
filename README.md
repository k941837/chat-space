# chat-space DB設計
## usersテーブル
|column|Type|Option|
|------|----|------|
|email|string|null: false|
|password|string|null: false|
|username|string|null:false|
### Association
- has_many :posts
- has_many :groups

## postテーブル
|text|text|null: false|
|image|text|null: false|
|user_id|integer|null: false, foreign_key: true|
### Association
- belong_to :user

## group テーブル
|groupname|text|null: false|
|username|text|null: false|
### Association
- belong_to :user




