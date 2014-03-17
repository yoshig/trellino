json.array! @board.lists.sort{ |x,y| x.rank <=> y.rank} do |list|
  json.id list.id
  json.title list.title
  json.rank list.rank
  json.board_id list.board_id
  json.created_at list.created_at
  json.updated_at list.updated_at

  json.cards list.cards
end