json.array! @boards do |board|
  json.title board.title
  json.id board.id
  json.lists board.lists
end