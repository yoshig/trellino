# == Schema Information
#
# Table name: todo_items
#
#  id         :integer          not null, primary key
#  card_id    :integer          not null
#  done       :boolean          default(FALSE)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  title      :string(255)      not null
#

class TodoItem < ActiveRecord::Base
  
  validates :title, :card, presence: true
  
  belongs_to :card, inverse_of: :todo_items
end
